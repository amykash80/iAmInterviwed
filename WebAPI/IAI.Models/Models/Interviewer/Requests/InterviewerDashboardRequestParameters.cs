using IAI.Models.Models.Responses;

namespace IAI.Models.Models.Interviewer.Requests
{
    public class InterviewerDashboardRequestParameters : SearchAndPagingParameters
    {
        public Guid InterviewerId { get; set; }
        public string StartDate { get; set; } 
        public string EndDate { get; set; }
        public string? CandidateName { get; set; }
        public int? InterviewTypeId { get; set; }
        public int? StatusId { get; set; }
        public InterviewerDashboardRequestParameters()
        {
        }
    }
}
