using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewerSkill")]
    public class InterviewerSkill : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid InterviewerSkillId { get; set; }
        [ForeignKey("InterviewerId")]
        public virtual InterviewerProfile? Interviewer { get; set; }
        public Guid InterviewerId { get; set; }
        [ForeignKey("InterviewerProfileId")]
        public virtual InterviewerProfileDetail? InterviewerProfileDetail { get; set; }
        public Guid InterviewerProfileId { get; set; }
        [ForeignKey("SecondarySkillId")]
        public virtual SecondarySkill? SecondarySkill { get; set; }
        public int SecondarySkillId { get; set; }        
        public int SecondarySkillNumber { get; set; }
    }
}
