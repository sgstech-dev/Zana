using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapAddressController : ControllerBase
    {
        private readonly WGDBContext _context;

        public MapAddressController(WGDBContext context)
        {
            _context = context;
        }

        // GET: api/MapAddress
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MapAddress>>> GetMapAddress()
        {
            return await _context.MapAddress.ToListAsync();
        }

        // GET: api/MapAddress/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MapAddress>> GetMapAddress(int id)
        {
            var mapAddress = await _context.MapAddress.FindAsync(id);

            if (mapAddress == null)
            {
                return NotFound();
            }

            return mapAddress;
        }

        // PUT: api/MapAddress/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMapAddress(int id, MapAddress mapAddress)
        {
            if (id != mapAddress.Id)
            {
                return BadRequest();
            }

            _context.Entry(mapAddress).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MapAddressExists(id))
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

        // POST: api/MapAddress
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MapAddress>> PostMapAddress(MapAddress mapAddress)
        {
            _context.MapAddress.Add(mapAddress);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMapAddress", new { id = mapAddress.Id }, mapAddress);
        }

        // DELETE: api/MapAddress/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMapAddress(int id)
        {
            var mapAddress = await _context.MapAddress.FindAsync(id);
            if (mapAddress == null)
            {
                return NotFound();
            }

            _context.MapAddress.Remove(mapAddress);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MapAddressExists(int id)
        {
            return _context.MapAddress.Any(e => e.Id == id);
        }
    }
}
