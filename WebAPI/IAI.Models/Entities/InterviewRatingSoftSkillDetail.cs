using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewRatingSoftSkillDetail")]
    public class InterviewRatingSoftSkillDetail : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid InterviewRatingSoftSkillDetailId { get; set; }
        [ForeignKey("RatingId")]
        public virtual InterviewRating? InterviewRating { get; set; }
        public Guid RatingId { get; set; }        
        [ForeignKey("SoftSkillId")]
        public virtual SoftSkill? SoftSkill { get; set; }
        public int SoftSkillId { get; set; }        
        public int Rating { get; set; }
        public string Comments { get; set; }
    }
}
