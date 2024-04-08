
using System.ComponentModel.DataAnnotations;

namespace IAI.Models.Models.Candidate.Requests
{
    public class CandidateProfileRequest
    {
        [Required]
        public Guid CandidateId { get; set; }
        [Required]
        public int CityId { get; set; }
        [Required]
        public int ExperienceId { get; set; }
        [Required]
        public int DesignationId { get; set; }
        [Required]
        public decimal CurrentPay { get; set; }
        public int NoticePeriodId { get; set; }
        [Required]
        public long MobileNumber { get; set; }
        [Required]
        public string? EmailId { get; set; }
        [Required]
        public bool RestrictEmployerToViewProfile { get; set; }
    }
}
