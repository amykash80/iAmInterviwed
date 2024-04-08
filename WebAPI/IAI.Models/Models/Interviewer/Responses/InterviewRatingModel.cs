
namespace IAI.Models.Models.Interviewer.Responses
{
    public class InterviewRatingModel : ConfirmScheduleDetailsModel
    {
        public Guid RatingId { get; set; }
        public double TotalRating { get; set; }
        public string? InterviewerComments { get; set; }
        public string? InterviewRecordingTitle { get; set; }
        public DateTimeOffset RatedDate { get; set; }
        public bool IsRatingAcceptedByUser { get; set; }
        public List<TechnicalSkillRatingModel>? TechnicalSkillRating { get; set; }
        public List<SoftSkillRatingModel>? SoftSkillRating { get; set; }
    }

    public class TechnicalSkillRatingModel
    {
        public Guid InterviewSkillId { get; set; }
        public int SecondarySkillId { get; set; }
        public string? SecondarySkillName { get; set; }
        public int SecondarySkillNumber { get; set; }
        public bool IsCommentsRequired { get; set; }
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
