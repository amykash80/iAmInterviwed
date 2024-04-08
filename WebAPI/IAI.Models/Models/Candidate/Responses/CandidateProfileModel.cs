
namespace IAI.Models.Models.Candidate.Responses
{
    public class CandidateProfileModel
    {
        public Guid CandidateId { get; set; }
        public int CountryId { get; set; }
        public int CityId { get; set; }
        public int ExperienceId { get; set; }
        public int? DesignationId { get; set; }
        public decimal? CurrentPay { get; set; }
        public int NoticePeriodId { get; set; }
        public long MobileNumber { get; set; }
        public string? EmailId { get; set; }
        public string? ResumeTitle { get; set; }
        public bool RestrictEmployerToViewProfile { get; set; }
    }
}
