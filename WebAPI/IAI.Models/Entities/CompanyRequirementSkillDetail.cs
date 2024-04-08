using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CompanyRequirementSkillDetail")]
    public class CompanyRequirementSkillDetail : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RequirementSkillId { get; set; }
        [ForeignKey("RequirementId")]
        public virtual CompanyRequirement? Requirement { get; set; }
        public Guid RequirementId { get; set; }
        [ForeignKey("SecondarySkillId")]
        public virtual SecondarySkill? SecondarySkill { get; set; }
        public int SecondarySkillId { get; set; }
        public int SecondarySkillNumber { get; set; }
        [ForeignKey("RequirementInterviewProcessId")]
        public virtual CompanyRequirementInterviewProcess? CompanyRequirementInterviewProcess { get; set; }        
        public Guid RequirementInterviewProcessId { get; set; }
        public bool IsCommentsRequired { get; set; }
    }
}
