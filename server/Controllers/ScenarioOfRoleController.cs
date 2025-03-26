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
    public class ScenarioOfRoleController : ControllerBase
    {
        private readonly WGDBContext _context;

        public ScenarioOfRoleController(WGDBContext context)
        {
            _context = context;
        }

        // GET: api/ScenarioOfRole
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScenarioOfRole>>> GetScenarioOfRole()
        {
            return await _context.ScenarioOfRole.ToListAsync();
        }

        // GET: api/ScenarioOfRole/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ScenarioOfRole>> GetScenarioOfRole(int id)
        {
            var scenarioOfRole = await _context.ScenarioOfRole.FindAsync(id);

            if (scenarioOfRole == null)
            {
                return NotFound();
            }

            return scenarioOfRole;
        }

        // PUT: api/ScenarioOfRole/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScenarioOfRole(int id, ScenarioOfRole scenarioOfRole)
        {
            if (id != scenarioOfRole.Id)
            {
                return BadRequest();
            }

            _context.Entry(scenarioOfRole).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScenarioOfRoleExists(id))
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

        // POST: api/ScenarioOfRole
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ScenarioOfRole>> PostScenarioOfRole(ScenarioOfRole scenarioOfRole)
        {
            _context.ScenarioOfRole.Add(scenarioOfRole);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScenarioOfRole", new { id = scenarioOfRole.Id }, scenarioOfRole);
        }

        // DELETE: api/ScenarioOfRole/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScenarioOfRole(int id)
        {
            var scenarioOfRole = await _context.ScenarioOfRole.FindAsync(id);
            if (scenarioOfRole == null)
            {
                return NotFound();
            }

            _context.ScenarioOfRole.Remove(scenarioOfRole);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScenarioOfRoleExists(int id)
        {
            return _context.ScenarioOfRole.Any(e => e.Id == id);
        }
    }
}
