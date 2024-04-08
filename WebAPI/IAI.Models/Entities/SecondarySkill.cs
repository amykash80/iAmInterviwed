using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("SecondarySkill")]
    public class SecondarySkill : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SecondarySkillId { get; set; }
        public string? SecondarySkillName { get; set; }
        public string? Description { get; set; }
        [ForeignKey("UserId")]
        public virtual PrimarySkill? PrimarySkill { get; set; }
        public int PrimarySkillId { get; set; }        
    }
}
