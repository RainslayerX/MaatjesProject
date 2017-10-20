using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MaatjesProjectMVC.Models.MemberViewModels;
using MaatjesProject.Data;

namespace MaatjesProjectMVC.Controllers
{
    [Produces("application/json")]
    [Route("api/PersonInterests")]
    public class PersonInterestsController : Controller
    {
        private readonly ProjectContext _context;

        public PersonInterestsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/PersonInterests
        [HttpGet]
        public IEnumerable<PersonInterest> GetPersonInterests()
        {
            return _context.PersonInterests;
        }

        // GET: api/PersonInterests/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPersonInterest([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var personInterests = await _context.PersonInterests.Where(m => m.PersonId == id)
                .Include(m => m.Interest)
                .ToListAsync();

            if (personInterests == null)
            {
                return NotFound();
            }

            return Ok(personInterests);
        }

        // PUT: api/PersonInterests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonInterest([FromRoute] int id, [FromBody] PersonInterest personInterest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != personInterest.PersonId)
            {
                return BadRequest();
            }

            _context.Entry(personInterest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonInterestExists(id))
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

        // POST: api/PersonInterests
        [HttpPost]
        public async Task<IActionResult> PostPersonInterest([FromBody] PersonInterest personInterest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PersonInterests.Add(personInterest);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PersonInterestExists(personInterest.PersonId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPersonInterest", new { id = personInterest.PersonId }, personInterest);
        }

        // DELETE: api/PersonInterests/5/5
        [HttpDelete("{personId}/{interestId}")]
        public async Task<IActionResult> DeletePersonInterest([FromRoute] int personId, [FromRoute] int interestId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var personInterest = await _context.PersonInterests.SingleOrDefaultAsync(m => m.PersonId == personId && m.InterestId == interestId);
            if (personInterest == null)
            {
                return NotFound();
            }

            _context.PersonInterests.Remove(personInterest);
            await _context.SaveChangesAsync();

            return Ok(personInterest);
        }

        private bool PersonInterestExists(int id)
        {
            return _context.PersonInterests.Any(e => e.PersonId == id);
        }
    }
}