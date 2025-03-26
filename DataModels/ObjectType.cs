using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.models
{
    public class ObjectType
    {
        [Key]
        public int Id { get; set; }
        public required String Name { get; set; }
        public required int Category_id { get; set; }
        [ForeignKey("Category_id")]        
        public virtual Category? Category { get; set; }
        public string PicBase64 { get; set; } = default!;
        [NotMapped]
        public virtual byte[]? Pic { get; set; } = null;
        public virtual string IconBase64 { get; set; } = default!;
        [NotMapped]
        public virtual byte[]? Icon { get; set; } = null;
        public virtual string ModelBase64 { get; set; } = default!;
        [NotMapped]
        public virtual byte[]? Model { get; set; } = null;
        [NotMapped]
        public String UploadedUnique { get; set; } = string.Empty;
        public String Extension { get; set; } = string.Empty;
    }
}