using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewerPhoto")]
    public class InterviewerPhoto : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid InterviewerPhotoId { get; set; }
        public Guid InterviewerId { get; set; }
        public string? FileName { get; set; }
        public byte[]? FileContent { get; set; }
    }
}
