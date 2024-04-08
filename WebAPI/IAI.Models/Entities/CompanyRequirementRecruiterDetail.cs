using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CompanyRequirementRecruiterDetail")]
    public class CompanyRequirementRecruiterDetail : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RequirementRecruiterId { get; set; }
        [ForeignKey("RequirementId")]
        public virtual CompanyRequirement? CompanyRequirement { get; set; }
        public Guid RequirementId { get; set; }        
        [ForeignKey("RecruiterId")]
        public virtual CompanyProfile? Recruiter { get; set; }
        public Guid RecruiterId { get; set; }        
        public bool IsIAIRecruiter { get; set; }
    }
}
