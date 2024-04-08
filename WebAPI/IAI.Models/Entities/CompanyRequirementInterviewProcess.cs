using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CompanyRequirementInterviewProcess")]
    public class CompanyRequirementInterviewProcess : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RequirementInterviewProcessId { get; set; }
        [ForeignKey("RequirementId")]
        public virtual CompanyRequirement? Requirement { get; set; }
        public Guid RequirementId { get; set; }
        [ForeignKey("InterviewRoundId")]
        public virtual InterviewRound? InterviewRound { get; set; }
        public int InterviewRoundId { get; set; }
    }
}