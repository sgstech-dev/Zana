using System;
using System.ComponentModel.DataAnnotations;

namespace Server.models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public required String Name { get; set; }
        public required string Key { get; set; }
    }
}
