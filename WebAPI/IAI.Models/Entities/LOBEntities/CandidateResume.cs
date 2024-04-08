using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CandidateResume")]
    public class CandidateResume : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CandidateResumeId { get; set; }
        public Guid CandidateId { get; set; }
        public string? FileName { get; set; }
        public byte[]? FileContent { get; set; }
    }
}
