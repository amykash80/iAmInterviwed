
namespace IAI.Models.Models.Interviewer.Responses
{
    public class InterviewerDashboardModel
    {
        public Guid InterviewId { get; set; }
        public DateTimeOffset InterviewDate { get; set; }
        public string? TimeSlotName { get; set; }
        public string? CandidateName { get; set; }
        public string? InterviewTypeName { get; set; }
        public string? PrimarySkillName { get; set; }
        public string? IsConfirmedByInterviewer { get; set; }
        public string? StatusName { get; set; }
        public string? IsRated { get; set; }
        public string? IsRatingAcceptedByUser { get; set; }
        public string? Rating { get; set; }
        public string? MeetingURL { get; set; }
    }
}
