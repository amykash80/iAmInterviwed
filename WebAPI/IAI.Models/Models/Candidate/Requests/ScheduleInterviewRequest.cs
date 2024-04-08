
using System.ComponentModel.DataAnnotations;

namespace IAI.Models.Models.Candidate.Requests
{
    public class ScheduleInterviewRequest
    {
        [Required]
        public Guid CandidateId { get; set; }
        [Required]
        public DateTimeOffset InterviewDate { get; set; }
        [Required]
        public int TimeSlotId { get; set; }
        [Required]
        public int InterviewTypeId { get; set; }
        [Required]
        public int PrimarySkillId { get; set; }
        [Required]
        public List<int>? SecondarySkills { get; set; }
        [Required]
        public bool TermsAndConditions { get; set; }
        public Guid? RequirementId { get; set; }
    }
}
