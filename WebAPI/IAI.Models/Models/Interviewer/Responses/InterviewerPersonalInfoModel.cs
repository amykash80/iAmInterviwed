
namespace IAI.Models.Models.Interviewer.Responses
{
    public class InterviewerPersonalInfoModel
    {
        public Guid InterviewerId { get; set; }
        public int CountryId { get; set; }
        public int CityId { get; set; }
        public int ExperienceId { get; set; }
        public long MobileNumber { get; set; }
        public string? Address { get; set; }
        public string? ResumeTitle { get; set; }
    }
}
