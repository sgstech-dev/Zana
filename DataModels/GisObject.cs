using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.models
{
    public class GisObject
    {
        [Key]
        public int Id { get; set; }
        public Guid IdentityNo { get; set; }
        public required String Name { get; set; }
        [Required]
        public int Scenario_id { get; set; }
        [ForeignKey("Scenario_id")]
        public Scenario? Scenario { get; set; }
        public int? Parent_id { get; set; }
        [ForeignKey("parent_id")]
        public GisObject? Parent { get; set; }
        public int ObjectType_id { get; set; }
        [ForeignKey("ObjectType_id")]
        public ObjectType? ObjectType { get; set; }
    }
}