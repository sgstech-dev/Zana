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
    public class ObjectTypeController : ControllerBase
    {
        private readonly WGDBContext _context;

        public ObjectTypeController(WGDBContext context)
        {
            _context = context;
        }

        // GET: api/ObjectType
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ObjectType>>> GetObjectTypes()
        {
            return await _context.ObjectTypes.Include("Category").ToListAsync();
        }

        // GET: api/ObjectType/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ObjectType>> GetObjectType(int id)
        {
            var objectType = await _context.ObjectTypes.FindAsync(id);

            if (objectType == null)
            {
                return NotFound();
            }

            return objectType;
        }

        [HttpGet]
        [Route("GetBinaryData")]
        public  string GetBinaryData(int id,string binaryType)
        {
            var objectType = _context.ObjectTypes.Find(id);
            switch(binaryType){
                case "icon":
                    return objectType!.IconBase64;
                case "pic" :
                    return objectType!.PicBase64;
                default:
                    return "";
            }
        }

        // PUT: api/ObjectType/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutObjectType(int id, ObjectType objectType)
        {
            if (id != objectType.Id)
            {
                return BadRequest();
            }

            _context.Entry(objectType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ObjectTypeExists(id))
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

        // POST: api/ObjectType
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ObjectType>> PostObjectType(ObjectType objectType)
        {
            _context.ObjectTypes.Add(objectType);
            _context.Entry(objectType.Category!).State = EntityState.Unchanged;
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetObjectType", new { id = objectType.Id }, objectType);
        }

        // DELETE: api/ObjectType/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteObjectType(int id)
        {
            var objectType = await _context.ObjectTypes.FindAsync(id);
            if (objectType == null)
            {
                return NotFound();
            }

            _context.ObjectTypes.Remove(objectType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ObjectTypeExists(int id)
        {
            return _context.ObjectTypes.Any(e => e.Id == id);
        }
    }
}
