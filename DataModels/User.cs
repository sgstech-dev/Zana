using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Name { get; set; }
        public string Email { get; set; } = string.Empty;
        public required string Password { get; set; }
        public required string[] Roles { get; set; }
        public required string[] permissions { get; set; }
        public required string avatar { get; set; }
    }
}
