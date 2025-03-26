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
    public class GisObjectMetaDataController : ControllerBase
    {
        private readonly WGDBContext _context;

        public GisObjectMetaDataController(WGDBContext context)
        {
            _context = context;
        }

        // GET: api/GisObjectMetaData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GisObjectMetaData>>> GetGisObjectMetaDatas()
        {
            return await _context.GisObjectMetaDatas.ToListAsync();
        }

        // GET: api/GisObjectMetaData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GisObjectMetaData>> GetGisObjectMetaData(long id)
        {
            var gisObjectMetaData = await _context.GisObjectMetaDatas.FindAsync(id);

            if (gisObjectMetaData == null)
            {
                return NotFound();
            }

            return gisObjectMetaData;
        }

        [Route("GetGisObjectMetaDatasByObjectId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GisObjectMetaData>>> GetGisObjectMetaDatasByObjectId(long objectId)
        {
            return await _context.GisObjectMetaDatas.Where(got=>got.Object_id == objectId).Include("Field").ToListAsync();
        }

        // PUT: api/GisObjectMetaData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGisObjectMetaData(long id, GisObjectMetaData gisObjectMetaData)
        {
            if (id != gisObjectMetaData.Id)
            {
                return BadRequest();
            }

            _context.Entry(gisObjectMetaData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GisObjectMetaDataExists(id))
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

        // POST: api/GisObjectMetaData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GisObjectMetaData>> PostGisObjectMetaData(GisObjectMetaData gisObjectMetaData)
        {
            if (gisObjectMetaData.Object_id > 0)
            {
                var itemsToRemove = _context.GisObjectMetaDatas
                    .Where(gom => gom.Object_id == gisObjectMetaData.Object_id && gom.Field_id == gisObjectMetaData.Field_id)
                    .ToList();

                if (itemsToRemove.Any())
                {
                    _context.GisObjectMetaDatas.RemoveRange(itemsToRemove);
                }
            }

            _context.GisObjectMetaDatas.Add(gisObjectMetaData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGisObjectMetaData", new { id = gisObjectMetaData.Id }, gisObjectMetaData);
        }

        // DELETE: api/GisObjectMetaData/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGisObjectMetaData(long id)
        {
            var gisObjectMetaData = await _context.GisObjectMetaDatas.FindAsync(id);
            if (gisObjectMetaData == null)
            {
                return NotFound();
            }

            _context.GisObjectMetaDatas.Remove(gisObjectMetaData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GisObjectMetaDataExists(long id)
        {
            return _context.GisObjectMetaDatas.Any(e => e.Id == id);
        }
    }
}
