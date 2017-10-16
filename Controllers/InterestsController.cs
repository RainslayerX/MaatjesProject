using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MaatjesProjectMVC.Models.MemberViewModels;
using Microsoft.EntityFrameworkCore;
using MaatjesProjectV2.Data;

namespace MaatjesProjectMVC.Controllers
{
    public class InterestsController : Controller
    {
        private readonly ProjectContext _context;

        public InterestsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: Interests
        public ActionResult Index()
        {
            return View(_context.Interests.ToList());
        }

        [HttpGet("/api/interests")]
        public IActionResult GetInterests()
        {
            return Ok(_context.Interests);
        }

        [HttpPost("/api/interests")]
        public IActionResult AddInterest([FromBody] Interest interest)
        {
            if (!ModelState.IsValid)
                return NotFound();

            _context.Interests.Add(interest);
            _context.SaveChanges();

            return Ok(interest);
        }

        [HttpDelete("/api/interests/{id}")]
        public async Task<IActionResult> DeleteInterest([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var interest = await _context.Interests.SingleOrDefaultAsync(m => m.InterestId == id);
            if (interest == null)
                return NotFound();
            
            _context.Interests.Remove(interest);
            await _context.SaveChangesAsync();

            return Ok(true);
        }
    }
}