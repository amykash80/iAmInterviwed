using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewRatingTechnicalSkillDetail")]
    public class InterviewRatingTechnicalSkillDetail : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid InterviewRatingTechnicalSkillDetailId { get; set; }
        [ForeignKey("RatingId")]
        public virtual InterviewRating? InterviewRating { get; set; }
        public Guid RatingId { get; set; }        
        [ForeignKey("InterviewSkillId")]
        public virtual InterviewSkill? InterviewSkill { get; set; }
        public Guid InterviewSkillId { get; set; }        
        public int Rating { get; set; }
        public string Comments { get; set; }
    }
}
