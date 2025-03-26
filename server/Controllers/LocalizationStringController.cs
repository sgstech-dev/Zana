using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.models;

namespace Server.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocalizationStringController : ControllerBase
    {
        private readonly WGDBContext _context;

        public LocalizationStringController(WGDBContext context)
        {
            _context = context;
        }

        // GET: api/LocalizationString
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocalizationString>>> GetLocalizationStrings()
        {
            return await _context.LocalizationStrings.ToListAsync();
        }

        // GET: api/LocalizationString/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LocalizationString>> GetLocalizationString(int id)
        {
            var localizationString = await _context.LocalizationStrings.FindAsync(id);

            if (localizationString == null)
            {
                return NotFound();
            }

            return localizationString;
        }

        // PUT: api/LocalizationString/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocalizationString(int id, LocalizationString localizationString)
        {
            if (id != localizationString.StrId)
            {
                return BadRequest();
            }

            _context.Entry(localizationString).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocalizationStringExists(id))
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

        // POST: api/LocalizationString
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LocalizationString>> PostLocalizationString(LocalizationString localizationString)
        {
            _context.LocalizationStrings.Add(localizationString);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLocalizationString", new { id = localizationString.StrId }, localizationString);
        }

        // DELETE: api/LocalizationString/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocalizationString(int id)
        {
            var localizationString = await _context.LocalizationStrings.FindAsync(id);
            if (localizationString == null)
            {
                return NotFound();
            }

            _context.LocalizationStrings.Remove(localizationString);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LocalizationStringExists(int id)
        {
            return _context.LocalizationStrings.Any(e => e.StrId == id);
        }
    }
}
