using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.models
{
    public class GisObjectMetaData
    {
        [Key]
        public int Id { get; set; }
        public int Field_id { get; set; }
        [ForeignKey("Field_id")]
        public virtual Field? Field { get; set; }
        public int Object_id { get; set; }
        [ForeignKey("Object_id")]
        public virtual GisObject? GisObject { get; set; }
        public required string Value { get; set; }
    }
}
