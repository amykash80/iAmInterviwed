using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CandidateSkill")]
    public class CandidateSkill : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CandidateSkillId { get; set; }

        [ForeignKey("CandidateId")]
        public virtual CandidateProfile? Candidate { get; set; }
        public Guid CandidateId { get; set; }        
        [ForeignKey("SecondarySkillId")]
        public virtual SecondarySkill? SecondarySkill { get; set; }
        public int SecondarySkillId { get; set; }        
        public int SecondarySkillNumber { get; set; }
    }
}
