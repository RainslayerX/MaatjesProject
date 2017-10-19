using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MaatjesProjectMVC.Models.MemberViewModels;
using MaatjesProjectV2.Data;

namespace MaatjesProjectV2.Controllers
{
    [Produces("application/json")]
    [Route("api/ElderlyPeople")]
    public class ElderlyPeopleController : Controller
    {
        private readonly ProjectContext _context;

        public ElderlyPeopleController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/ElderlyPeople
        [HttpGet]
        public IEnumerable<Elderly> GetElderlyPeople()
        {
            return _context.ElderlyPeople;
        }

        // GET: api/ElderlyPeople/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetElderly([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var elderlyPerson = await _context.ElderlyPeople.SingleOrDefaultAsync(m => m.PersonId == id);

            if (elderlyPerson == null)
            {
                return NotFound();
            }

            return Ok(elderlyPerson);
        }

        // PUT: api/ElderlyPeople/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutElderly([FromRoute] int id, [FromBody] Elderly elderlyPerson)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != elderlyPerson.PersonId)
            {
                return BadRequest();
            }

            _context.Entry(elderlyPerson).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ElderlyExists(id))
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

        // POST: api/ElderlyPeople
        [HttpPost]
        public async Task<IActionResult> PostElderly([FromBody] Elderly elderlyPerson)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ElderlyPeople.Add(elderlyPerson);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetElderly", new { id = elderlyPerson.PersonId }, elderlyPerson);
        }

        // DELETE: api/ElderlyPeople/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteElderly([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var elderlyPerson = await _context.ElderlyPeople.SingleOrDefaultAsync(m => m.PersonId == id);
            if (elderlyPerson == null)
            {
                return NotFound();
            }

            _context.ElderlyPeople.Remove(elderlyPerson);
            await _context.SaveChangesAsync();

            return Ok(elderlyPerson);
        }

        private bool ElderlyExists(int id)
        {
            return _context.ElderlyPeople.Any(e => e.PersonId == id);
        }

        [HttpGet("available")]
        public IEnumerable<Elderly> GetAvailableElderlyPeople()
        {
            return _context.ElderlyPeople.Where(x => x.Matches.Count == 0).ToList();
        }
    }
}