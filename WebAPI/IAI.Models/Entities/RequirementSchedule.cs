using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("RequirementSchedule")]
    public class RequirementSchedule : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RequirementScheduleId { get; set; }
        [ForeignKey("ProfileId")]
        public virtual RequirementProfile? RequirementProfile { get; set; }
        public Guid ProfileId { get; set; }
        [ForeignKey("InterviewId")]
        public virtual Interview? Interview { get; set; }
        public Guid InterviewId { get; set; }
        [ForeignKey("RequirementInterviewProcessId")]
        public virtual CompanyRequirementInterviewProcess? CompanyRequirementInterviewProcess { get; set; }
        public Guid RequirementInterviewProcessId { get; set; }
    }
}
