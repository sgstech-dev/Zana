using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.models
{

    public class ScenarioOfRole
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Scenario_id { get; set; }
        [Required]
        [ForeignKey("Scenario_id")]
        public required Scenario Scenario { get; set; }
        [Required]
        public required string Role { get; set; }
    }
}