using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("PrimarySkill")]
    public class PrimarySkill : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PrimarySkillId { get; set; }
        public string? PrimarySkillName { get; set; }
        public string? Description { get; set; }
    }
}
