using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CandidateStatusTracker")]
    public class CandidateStatusTracker : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CandidateStatusTrackerId { get; set; }
        [ForeignKey("CandidateId")]
        public virtual CandidateProfile? Candidate { get; set; }
        public Guid CandidateId { get; set; }        
        [ForeignKey("StatusId")]
        public virtual Status? Status { get; set; }
        public int StatusId { get; set; }        
        public string? Comments { get; set; }
        public DateTimeOffset FollowUpDate { get; set; }
    }
}
