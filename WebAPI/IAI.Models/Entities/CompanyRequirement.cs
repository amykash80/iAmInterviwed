using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CompanyRequirement")]
    public class CompanyRequirement : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RequirementId { get; set; }
        [ForeignKey("CompanyId")]
        public virtual CompanyProfile? Company { get; set; }
        public Guid CompanyId { get; set; }        
        [ForeignKey("JobTypeId")]
        public virtual JobType? JobType { get; set; }
        public int JobTypeId { get; set; }        
        public string? JobCode { get; set; }
        public string? JobDescription { get; set; }
        public string? KeyResponsibilities { get; set; }
        [ForeignKey("DomainId")]
        public virtual Domain? Domain { get; set; }
        public int DomainId { get; set; }        
        public string? AdditionalSkills { get; set; }
        [ForeignKey("PrimarySkillId")]
        public virtual PrimarySkill? PrimarySkill { get; set; }
        public int PrimarySkillId { get; set; }        
        [ForeignKey("MinExperienceId")]
        public virtual Experience? MinExperience { get; set; }
        public int MinExperienceId { get; set; }        
        [ForeignKey("MaxExperienceId")]
        public virtual Experience? MaxExperience { get; set; }
        public int MaxExperienceId { get; set; }        
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        [ForeignKey("CityId")]
        public virtual City? City { get; set; }
        public int CityId { get; set; }        
        [ForeignKey("DesignationId")]
        public virtual Designation? Designation { get; set; }
        public Guid DesignationId { get; set; }        
        public string? HighestPay { get; set; }
        [ForeignKey("InterviewTypeId")]
        public virtual InterviewType? InterviewType { get; set; }
        public int InterviewTypeId { get; set; }        
        public string? AssessmentName { get; set; }
        public bool ScheduleZoomInterview { get; set; }
        public bool AddInterviewProcess { get; set; }
        [ForeignKey("StatusId")]
        public virtual Status? Status { get; set; }
        public int StatusId { get; set; }        
        public bool SendMailToRecruiter { get; set; }
        public bool CaptureScreenShot { get; set; }
        public decimal MinRatingForSelection { get; set; }
    }
}
