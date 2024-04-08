using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CandidateProfile")]
    public class CandidateProfile : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CandidateId { get; set; }
        [ForeignKey("UserId")]
        public UserMaster? UserMaster { get; set; }
        public Guid UserId { get; set; }        
        public string? Name { get; set; }
        public string? EmailId { get; set; }
        public long MobileNumber { get; set; }
        [ForeignKey("PrimarySkillId")]
        public PrimarySkill? PrimarySkill { get; set; }
        public int PrimarySkillId { get; set; }        
        public string? AdditionalSkills { get; set; }
        [ForeignKey("DesignationId")]
        public CandidateDesignation? CandidateDesignation { get; set; }
        public int? DesignationId { get; set; }
        [ForeignKey("CityId")]
        public City? City { get; set; }
        public int CityId { get; set; }        
        public decimal? CurrentPay { get; set; }
        public decimal? ExpectedPay { get; set; }
        [ForeignKey("ExperienceId")]
        public Experience? Experience { get; set; }
        public int ExperienceId { get; set; }        
        public bool GapInEducation { get; set; }
        public bool GapInExperience { get; set; }
        [ForeignKey("NoticePeriodId")]
        public NoticePeriod? NoticePeriod { get; set; }
        public int NoticePeriodId { get; set; }        
        public bool ReadyToChange { get; set; }
        public string? Address { get; set; }
        public bool PromoCode { get; set; }
        public bool RestrictEmployerToViewProfile { get; set; }
    }
}