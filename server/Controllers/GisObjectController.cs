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
    public class GisObjectController : ControllerBase
    {
        private readonly WGDBContext _context;

        public GisObjectController(WGDBContext context)
        {
            _context = context;
        }

        // GET: api/GisObject
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GisObject>>> GetGisObjects()
        {
            return await _context.GisObjects.ToListAsync();
        }

        // GET: api/GisObject/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GisObject>> GetGisObject(long id)
        {
            var gisObject = await _context.GisObjects.FindAsync(id);

            if (gisObject == null)
            {
                return NotFound();
            }

            return gisObject;
        }

        // GET: api/GisObject/5
        [HttpGet]
        [Route("GetGisObjectByScenario_id")]
        public async Task<ActionResult<IEnumerable<GisObject>>> GetGisObjectByScenario_id(long scenario_id, bool withObjecttype = true)
        {
            if (withObjecttype)
                return await _context.GisObjects.Where(gobj => gobj.Scenario_id == scenario_id)
                .Include("ObjectType")
                .Include("Scenario")
                .Include("ObjectType.Category")
                .ToListAsync();
            else
                return await _context.GisObjects.Where(gobj => gobj.Scenario_id == scenario_id)
                .Include("Scenario")
                .ToListAsync();
        }

        // PUT: api/GisObject/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<GisObject>> PutGisObject(long id, GisObject gisObject)
        {
            if (id != gisObject.Id)
            {
                return BadRequest();
            }

            _context.Entry(gisObject).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GisObjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            var tmpGisObject = _context.GisObjects
            .Include("ObjectType")
            .Include("Scenario")
            .Include("ObjectType.Category")
            .Where(go => go.Id == id).FirstOrDefault();
            return CreatedAtAction("GetGisObject", new { id = gisObject.Id }, tmpGisObject);
        }

        // POST: api/GisObject
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GisObject>> PostGisObject(GisObject gisObject)
        {
            _context.GisObjects.Add(gisObject);
            await _context.SaveChangesAsync();

            var tmpGisObject = _context.GisObjects
                .Include("ObjectType")
                .Include("Scenario")
                .Include("ObjectType.Category")
                .Where(go => go.Id == gisObject.Id).FirstOrDefault();
            return CreatedAtAction("GetGisObject", new { id = gisObject.Id }, tmpGisObject);
        }

        // DELETE: api/GisObject/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGisObject(long id)
        {
            var gisObject = await _context.GisObjects.FindAsync((int)id);
            if (gisObject == null)
            {
                return NotFound();
            }

            _context.GisObjects.Remove(gisObject);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GisObjectExists(long id)
        {
            return _context.GisObjects.Any(e => e.Id == id);
        }
    }
}
