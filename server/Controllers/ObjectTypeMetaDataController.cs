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
    public class ObjectTypeMetaDataController : ControllerBase
    {
        private readonly WGDBContext _context;

        public ObjectTypeMetaDataController(WGDBContext context)
        {
            _context = context;
        }

        // GET: api/ObjectTypeMetaData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ObjectTypeMetaData>>> GetObjectTypeMetaDatas()
        {
            return await _context.ObjectTypeMetaDatas.ToListAsync();
        }

        // GET: api/ObjectTypeMetaData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ObjectTypeMetaData>> GetObjectTypeMetaData(long id)
        {
            var objectTypeMetaData = await _context.ObjectTypeMetaDatas.FindAsync(id);

            if (objectTypeMetaData == null)
            {
                return NotFound();
            }

            return objectTypeMetaData;
        }

        // PUT: api/ObjectTypeMetaData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutObjectTypeMetaData(long id, ObjectTypeMetaData objectTypeMetaData)
        {
            if (id != objectTypeMetaData.Id)
            {
                return BadRequest();
            }

            _context.Entry(objectTypeMetaData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ObjectTypeMetaDataExists(id))
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

        // POST: api/ObjectTypeMetaData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ObjectTypeMetaData>> PostObjectTypeMetaData(ObjectTypeMetaData objectTypeMetaData)
        {
            _context.ObjectTypeMetaDatas.Add(objectTypeMetaData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetObjectTypeMetaData", new { id = objectTypeMetaData.Id }, objectTypeMetaData);
        }

        // DELETE: api/ObjectTypeMetaData/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteObjectTypeMetaData(long id)
        {
            var objectTypeMetaData = await _context.ObjectTypeMetaDatas.FindAsync(id);
            if (objectTypeMetaData == null)
            {
                return NotFound();
            }

            _context.ObjectTypeMetaDatas.Remove(objectTypeMetaData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ObjectTypeMetaDataExists(long id)
        {
            return _context.ObjectTypeMetaDatas.Any(e => e.Id == id);
        }
    }
}
