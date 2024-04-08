using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("Interview")]
    public class Interview : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid InterviewId { get; set; }
        public string? InterviewUniqueId { get; set; }
        public DateTimeOffset InterviewDate { get; set; }
        [ForeignKey("TimeSlotId")]
        public virtual TimeSlot? TimeSlot { get; set; }
        public int TimeSlotId { get; set; }        
        [ForeignKey("InterviewTypeId")]
        public virtual InterviewType? InterviewType { get; set; }
        public int InterviewTypeId { get; set; }        
        [ForeignKey("CandidateId")]
        public virtual CandidateProfile? Candidate { get; set; }
        public Guid CandidateId { get; set; }        
        [ForeignKey("InterviewerId")]
        public virtual InterviewerProfile? Interviewer { get; set; }
        public Guid InterviewerId { get; set; }
        [ForeignKey("PrimarySkillId")]
        public virtual PrimarySkill? PrimarySkill { get; set; }
        public int PrimarySkillId { get; set; }
        public bool IsValid { get; set; }
        public bool IsConfirmedByInterviewer { get; set; }
        public bool IsPaymentConfirmed { get; set; }
        [ForeignKey("StatusId")]
        public virtual Status? Status { get; set; }
        public int StatusId { get; set; }        
        public bool IsBlocked { get; set; }
        public bool IsRated { get; set; }
        public virtual InterviewRating? Rating { get; set; }
        public virtual ZoomSchedules? ZoomSchedules { get; set; }
    }
}
