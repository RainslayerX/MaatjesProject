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
    [Route("api/ElderlyPersons")]
    public class ElderlyPersonsController : Controller
    {
        private readonly ProjectContext _context;

        public ElderlyPersonsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/ElderlyPersons
        [HttpGet]
        public IEnumerable<ElderlyPerson> GetElderlyPersons()
        {
            return _context.ElderlyPersons;
        }

        // GET: api/ElderlyPersons/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetElderlyPerson([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var elderlyPerson = await _context.ElderlyPersons.SingleOrDefaultAsync(m => m.PersonId == id);

            if (elderlyPerson == null)
            {
                return NotFound();
            }

            return Ok(elderlyPerson);
        }

        // PUT: api/ElderlyPersons/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutElderlyPerson([FromRoute] int id, [FromBody] ElderlyPerson elderlyPerson)
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
                if (!ElderlyPersonExists(id))
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

        // POST: api/ElderlyPersons
        [HttpPost]
        public async Task<IActionResult> PostElderlyPerson([FromBody] ElderlyPerson elderlyPerson)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ElderlyPersons.Add(elderlyPerson);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetElderlyPerson", new { id = elderlyPerson.PersonId }, elderlyPerson);
        }

        // DELETE: api/ElderlyPersons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteElderlyPerson([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var elderlyPerson = await _context.ElderlyPersons.SingleOrDefaultAsync(m => m.PersonId == id);
            if (elderlyPerson == null)
            {
                return NotFound();
            }

            _context.ElderlyPersons.Remove(elderlyPerson);
            await _context.SaveChangesAsync();

            return Ok(elderlyPerson);
        }

        private bool ElderlyPersonExists(int id)
        {
            return _context.ElderlyPersons.Any(e => e.PersonId == id);
        }
    }
}