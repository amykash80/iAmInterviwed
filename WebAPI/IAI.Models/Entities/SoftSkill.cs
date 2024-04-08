using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("SoftSkill")]
    public class SoftSkill : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SoftSkillId { get; set; }
        public string? SoftSkillName { get; set; }
    }
}
