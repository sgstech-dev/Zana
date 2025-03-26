using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.models
{
    public class ObjectTypeMetaData
    {
        [Key]
        public int Id{ get; set; }
        public int Field_Id{ get; set; }
        [ForeignKey("Field_Id")]
        public required Field Field{ get; set; }
        public int ObjectType_Id{ get; set; }
        [ForeignKey("ObjectType_Id")]
        public required ObjectType TypeOfObject{ get; set; }
        public required string Value{ get; set; }
    }
}
