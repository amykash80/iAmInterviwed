using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewSkill")]
    public class InterviewSkill : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid InterviewSkillId { get; set; }
        [ForeignKey("InterviewId")]
        public virtual Interview? Interview { get; set; }
        public Guid InterviewId { get; set; }        
        [ForeignKey("SecondarySkillId")]
        public virtual SecondarySkill? SecondarySkill { get; set; }
        public int SecondarySkillId { get; set; }        
        public int SecondarySkillNumber { get; set; }
        public bool IsCommentsRequired { get; set; }
    }
}
