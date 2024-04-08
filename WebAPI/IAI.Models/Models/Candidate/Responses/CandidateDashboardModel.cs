namespace IAI.Models.Models.Candidate.Responses
{
    public class CandidateDashboardModel
    {
        public CandidateDashboardProfile? CandidateDashboardProfile { get; set; }
        public CandidateDashboardInterview? CandidateDashboardActiveInterview { get; set; }
        public CandidateDashboardInterview? CandidateDashboardCompletedInterview { get; set; }
        public CandidateDashboardRating? CandidateDashboardRating { get; set; }
    }

    public class CandidateDashboardProfile
    {
        public Guid CandidateId { get; set; }
        public string? CandidateName { get; set; }
        public string? DesignationName { get; set; }
        public string? PrimarySkillName { get; set; }
        public string? CityName { get; set; }
        public string? ExperienceName { get; set; }
        public string? ResumeTitle { get; set; }
    }

    public class CandidateDashboardInterview
    {
        public Guid CandidateId { get; set; }
        public string? InterviewUniqueId { get; set; }
        public Guid InterviewId { get; set; }
        public DateTimeOffset InterviewDate { get; set; }
        public string? TimeSlotName { get; set; }
        public string? PrimarySkillName { get; set; }
        public List<string>? SecondarySkillName { get; set; }
        public string? InterviewerName { get; set; }
    }

    public class CandidateDashboardRating
    {
        public Guid InterviewId { get; set; }
        public string? InterviewUniqueId { get; set; }
        public Guid RatingId { get; set; }
        public string? TotalRating { get; set; }
        public string? InterviewerComments { get; set; }
        public List<CandidateDashboardRatingDetails>? CandidateDashboardRatingDetails { get; set; }
        public List<SoftSkillRatingModel>? SoftSkillRatingDetails { get; set; }
    }

    public class CandidateDashboardRatingDetails
    {
        public Guid RatingId { get; set; }
        public string? SecondarySkillName { get; set; }
        public int Rating { get; set; }
        public string? Comments { get; set; }
    }

    public class SoftSkillRatingModel
    {
        public int SoftSkillId { get; set; }
        public string? SoftSkillName { get; set; }
        public int Rating { get; set; }
        public string? Comments { get; set; }
    }
}
