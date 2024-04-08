using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewerResume")]
    public class InterviewerResume : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid InterviewerResumeId { get; set; }
        public Guid InterviewerId { get; set; }
        public string? FileName { get; set; }
        public byte[]? FileContent { get; set; }
    }
}
