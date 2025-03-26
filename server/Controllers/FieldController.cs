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
    public class FieldController : ControllerBase
    {
        private readonly WGDBContext _context;

        public FieldController(WGDBContext context)
        {
            _context = context;
        }

        // GET: api/Field
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Field>>> GetFields()
        {
            return await _context.Fields.Include("Category").ToListAsync();
        }

        // GET: api/Field/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Field>> GetField(long id)
        {
            var @field = await _context.Fields.FindAsync(id);

            if (@field == null)
            {
                return NotFound();
            }

            return @field;
        }

        // GET: api/Field/getbycategoryId
        [HttpGet]
        [Route("getbycategoryId")]
        public async Task<ActionResult<IEnumerable<Field>>> GetbyCategoryId(int categoryId,OwnerTypes ownerTypes)
        {
            return await _context.Fields.Include("Category").Where(f=>f.Category!.Id == categoryId && f.OwnerType == ownerTypes).ToListAsync();
        }

        // PUT: api/Field/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutField(long id, Field @field)
        {
            if (id != @field.Id)
            {
                return BadRequest();
            }

            _context.Entry(@field).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FieldExists(id))
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

        // POST: api/Field
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Field>> PostField(Field @field)
        {
            _context.Fields.Add(@field);
            _context.Entry(@field.Category!).State = EntityState.Unchanged;
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetField", new { id = @field.Id }, @field);
        }

        // DELETE: api/Field/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteField(long id)
        {
            var @field = await _context.Fields.FindAsync(id);
            if (@field == null)
            {
                return NotFound();
            }

            _context.Fields.Remove(@field);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FieldExists(long id)
        {
            return _context.Fields.Any(e => e.Id == id);
        }
    }
}
