using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.models
{
    public enum OwnerTypes{ObjectType=0,Object=1}
    public enum FieldTypes{Integer=0,String=1,Boolean=2,Double=3,DateTime=4,ItemList=5,ItemListMultiSelect=6,Color=7}
    public class Field
    {
        [Key]
        public int Id{ get; set; }
        public required String Name { get; set; }
        public required String Caption { get; set; }
        [Column(TypeName = "integer")]
        public required FieldTypes FieldType { get; set; }
        [DefaultValue("false")]
        public bool ShowInHUD { get; set; } = false;
        public required int Category_id { get; set; }
        [ForeignKey("Category_id")]        
        public virtual Category? Category { get; set; }
        public required OwnerTypes OwnerType { get; set; }
        public String? ListOfValue { get; set; }
        [DefaultValue("false")]
        public bool SystemCol { get; set; } = false;
        public String? Unit { get; set; }
        public required string Group { get; set; }
    }
}
