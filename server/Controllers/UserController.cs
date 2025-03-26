using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.models;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using Microsoft.Extensions.Hosting;

namespace Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private static readonly List<string> _validRefreshTokens = [];
        private readonly WGDBContext _context;
        private readonly IHostEnvironment _hostEnvironment;

        public UserController(WGDBContext context,IHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Validate user credentials (replace with your own validation logic)
            //var acceptUser = _context.Users.Where(u=> u.Username.ToUpper() == request.Username.ToUpper() && u.Password == request.Password).FirstOrDefault();
            if (request.Username == "test" && request.Password == "password")
            //if (acceptUser != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("kjdfhsdjkf489jkfhsd894854jfd8^jhn#45jhgjG8kjhjkhhjgkgdgtytdyt&^%jhghfjhf"); // Same key as above
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, request.Username)
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var refreshToken = GenerateRefreshToken();

                // Store the refresh token (in-memory for demo; use a persistent store in production)
                _validRefreshTokens.Add(refreshToken);
                var tokenString = tokenHandler.WriteToken(token);

                // Create response object with additional properties
                var response = new
                {
                    access_token = tokenString,
                    token_type = "Bearer",
                    expires_in = 3600 // Expires in seconds (1 hour)
                };

                return Ok(response);
            }
            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("refresh")]
        public IActionResult Refresh([FromBody] RefreshRequest request)
        {
            if (request.RefreshToken == null || !_validRefreshTokens.Contains(request.RefreshToken))
            {
                return Unauthorized();
            }

            // Validate the refresh token and create a new JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("YourSecretKeyHere");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, "test") // Replace with actual user info
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var newToken = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(newToken);
            // Create response object with additional properties
            var response = new
            {
                access_token = tokenString,
                token_type = "Bearer",
                expires_in = 3600 // Expires in seconds (1 hour)
            };

            return Ok(response);
        }

        [HttpPost("logout")]
        public IActionResult Logout([FromBody] LogoutRequest request)
        {
            if (request.RefreshToken != null && _validRefreshTokens.Contains(request.RefreshToken))
            {
                // Invalidate the refresh token
                _validRefreshTokens.Remove(request.RefreshToken);
            }
            return NoContent(); // 204 No Content
        }

        private string GenerateRefreshToken()
        {
            // Generate a unique refresh token (you may want to make this more secure)
            return Guid.NewGuid().ToString();
        }

        [HttpGet("me")]
        public IActionResult Me()
        {
            return Ok(new User { Id = 1, Name = "Ali", Email = "a@a.a", permissions = [""], Roles = [""], Username = "test", Password = "" ,avatar = "images/avatar.jpg"});
        }
        
        [HttpGet("menu")]
        public IActionResult menu()
        {
            var result = "";//new List<dynamic>();
            var dataDirectory = Path.Combine(_hostEnvironment.ContentRootPath, "data");
            var filePath = Path.Combine(dataDirectory, "menu.json");
            using (StreamReader r = new StreamReader(filePath))
            {
                string json = r.ReadToEnd();
                result = json;// JsonConvert.DeserializeObject<List<dynamic>>(json);
            }

            
            return Ok(result);
        }
    }
    public class LoginRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required bool RememberMe { get; set; }
    }
    public class RefreshRequest
    {
        public required string RefreshToken { get; set; }
    }

    public class LogoutRequest
    {
        public required string RefreshToken { get; set; }
    }
}