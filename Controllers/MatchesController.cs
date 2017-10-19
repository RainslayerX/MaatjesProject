using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MaatjesProjectV2.Data;
using MaatjesProjectV2.Models.MemberViewModels;
using MaatjesProjectMVC.Models.MemberViewModels;

namespace MaatjesProjectV2.Controllers
{
    [Produces("application/json")]
    [Route("api/Matches")]
    public class MatchesController : Controller
    {
        private readonly ProjectContext _context;

        public MatchesController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/Matches
        [HttpGet]
        public IEnumerable<Match> GetMatches()
        {
            return _context.Matches.Include(x => x.Elderly).Include(x => x.Volunteer);
        }

        [HttpGet("sorted/{type}/{page}")]
        public IEnumerable<Match> GetMatchesSorted([FromRoute] string type, [FromRoute] int page)
        {
            if (type == "newest")
                return _context.Matches.OrderByDescending(x => x.DateCreated).Skip(page * 10).Take(10);
            return _context.Matches;
        }

        // GET: api/Matches/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMatch([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var match = await _context.Matches.SingleOrDefaultAsync(m => m.MatchId == id);

            if (match == null)
            {
                return NotFound();
            }

            return Ok(match);
        }

        // PUT: api/Matches/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMatch([FromRoute] int id, [FromBody] Match match)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != match.MatchId)
            {
                return BadRequest();
            }

            _context.Entry(match).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Matches
        [HttpPost]
        public async Task<IActionResult> PostMatch([FromBody] Match match)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Matches.Add(match);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMatch", new { id = match.MatchId }, match);
        }

        // DELETE: api/Matches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatch([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var match = await _context.Matches.SingleOrDefaultAsync(m => m.MatchId == id);
            if (match == null)
            {
                return NotFound();
            }

            _context.Matches.Remove(match);
            await _context.SaveChangesAsync();

            return Ok(match);
        }

        private bool MatchExists(int id)
        {
            return _context.Matches.Any(e => e.MatchId == id);
        }

        [HttpGet("/api/matcher/{id}")]
        public async Task<IActionResult> GetMatches(int id)
        {
            bool personIsElder = true;
            Person person = await _context.ElderlyPeople.Where(m => m.PersonId == id).Include(m => m.PersonInterests).FirstOrDefaultAsync();
            if (person == null)
            {
                personIsElder = false;
                person = await _context.Volunteers.Where(m => m.PersonId == id).Include(m => m.PersonInterests).FirstOrDefaultAsync();
            }

            if (person == null)
                return NotFound();

            if (personIsElder)
                return Ok(await MatchPerson<Volunteer, Elderly>((Elderly)person, _context.Volunteers));
            else
                return Ok(await MatchPerson<Elderly, Volunteer>((Volunteer)person, _context.ElderlyPeople));
        }

        public async Task<List<MatchState<T>>> MatchPerson<T, P>(P person, DbSet<T> personList) where T : Person where P : Person
        {
            var matches = new List<MatchState<T>>();
            var list = await personList.Include(m => m.PersonInterests).ToListAsync();
            foreach (T v in list)
            {
                var m = new MatchState<T>();
                m.person = v;

                foreach (PersonInterest p in person.PersonInterests)
                {
                    foreach (PersonInterest i in v.PersonInterests)
                    {
                        if (p.InterestId == i.InterestId)
                            m.percent++;
                    }
                }
                m.percent *= 100;
                m.percent /= System.Math.Max(1, person.PersonInterests.Count);

                matches.Add(m);
            }
            return matches;
        }
    }

    public class MatchState<T>
    {
        public T person;
        public int percent = 0;
        public bool wheelChairCompatible;
        public bool dementingCompatible;
    }
}