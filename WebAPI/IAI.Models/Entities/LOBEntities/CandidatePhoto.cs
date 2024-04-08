using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CandidatePhoto")]
    public class CandidatePhoto : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CandidatePhotoId { get; set; }
        public Guid CandidateId { get; set; }
        public string? FileName { get; set; }
        public byte[]? FileContent { get; set; }
    }
}
