using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Server.models;
using Server.ScenarioManager;

namespace Server.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SceneController : ControllerBase
    {
        private readonly WGDBContext _context;

        public SceneController(WGDBContext context)
        {
            _context = context;
            //_hubContext.
        }

        // GET: api/Scene
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Scene>>> GetScene()
        {
            return await _context.Scene.ToListAsync();
        }

                // GET: api/Scenario
        [HttpGet]
        [Route("GetSceneByGisObject")]
        public async Task<ActionResult<IEnumerable<Scene>>> GetSceneByGisObject(int gis_object_id)
        {
            return await _context.Scene.Where(s=>s.GisObjectId == gis_object_id)
            .Include("GisObject")
            .ToListAsync();
        }

        // GET: api/Scene/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Scene>> GetScene(int id)
        {
            var scene = await _context.Scene.FindAsync(id);

            if (scene == null)
            {
                return NotFound();
            }

            return scene;
        }

        // GET: api/Scene/5
        [HttpGet]
        [Route("GetLastScene")]
        public ActionResult<IEnumerable<Scene>> GetLastScene()
        {
            //var scene = 
            if (ScenarioService.lastTargetScene == null)
            {
                return NotFound();
            }
            List<Scene> scenes = [];
            foreach (var item in ScenarioService.lastTargetScene)
            {
                scenes.Add(item.Value);
            }
            return scenes;
        }

        // PUT: api/Scene/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScene(int id, Scene scene)
        {
            if (id != scene.Id)
            {
                return BadRequest();
            }

            _context.Entry(scene).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SceneExists(id))
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

        // POST: api/Scene
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Scene[]>> PostScene(Scene[] scenes)
        {
            _context.Scene.RemoveRange(_context.Scene.Where(s=>s.GisObjectId == scenes[0].GisObjectId).ToList());
            foreach (var scene in scenes)
            {
                _context.Scene.Add(scene);    
            }
            
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScene", scenes);
        }

        // DELETE: api/Scene/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScene(int id)
        {
            var scene = await _context.Scene.FindAsync(id);
            if (scene == null)
            {
                return NotFound();
            }

            _context.Scene.Remove(scene);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SceneExists(int id)
        {
            return _context.Scene.Any(e => e.Id == id);
        }
    }
}
