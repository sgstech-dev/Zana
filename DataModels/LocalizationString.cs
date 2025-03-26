using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Server.models
{
    [Table("tblLocalizationStrings",Schema ="SGS_Init")]
    public class LocalizationString
    {
        [Key]
        public int StrId { get; set; }
        [Required]
        [MaxLength(500)]
        public required string StrKey { get; set; }
        [Required]
        public required string StrValue { get; set; }
        [Required]
        [MaxLength(5)]
        public required string Lang { get; set; }
    }
}