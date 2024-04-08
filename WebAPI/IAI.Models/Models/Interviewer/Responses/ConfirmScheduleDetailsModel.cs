
namespace IAI.Models.Models.Interviewer.Responses
{
    public class ConfirmScheduleDetailsModel
    {
        public Guid InterviewId { get; set; }
        public string? InterviewUniqueId { get; set; }
        public string? InterviewDate { get; set; }
        public int TimeSlotId { get; set; }
        public string? TimeSlotName { get; set; }
        public Guid InterviewerId { get; set; }
        public Guid CandidateId { get; set; }
        public string? CandidateName { get; set; }
        public string? PrimarySkillName { get; set; }
        public List<SecondarySkillNameModel>? SecondarySkills { get; set; }
        public long MobileNumber { get; set; }
        public string? ExperienceName { get; set; }
        public string? KeyResponsibilities { get; set; }
    }

    public class SecondarySkillNameModel
    {
        public string SecondarySkillName { get; set; }
        public int SecondarySkillNumber { get; set; }
    }
}
