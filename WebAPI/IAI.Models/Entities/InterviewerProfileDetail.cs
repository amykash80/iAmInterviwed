using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewerProfileDetail")]
    public class InterviewerProfileDetail : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid InterviewerProfileId { get; set; }
        [ForeignKey("InterviewerId")]
        public virtual InterviewerProfile? InterviewerProfile { get; set; }
        public Guid InterviewerId { get; set; }
        public string ProfileName { get; set; }
        [ForeignKey("PrimarySkillId")]
        public virtual PrimarySkill? PrimarySkill { get; set; }
        public int PrimarySkillId { get; set; }
        public string? AdditionalSkills { get; set; }
    }
}
