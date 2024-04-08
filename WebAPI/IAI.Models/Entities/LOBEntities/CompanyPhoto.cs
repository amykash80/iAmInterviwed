using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CompanyPhoto")]
    public class CompanyPhoto : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CompanyPhotoId { get; set; }
        public Guid CompanyId { get; set; }
        public string? FileName { get; set; }
        public byte[]? FileContent { get; set; }
    }
}
