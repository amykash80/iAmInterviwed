using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("Experience")]
    public class Experience : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ExperienceId { get; set; }
        public string? ExperienceName { get; set; }
        public string? Description { get; set; }
    }
}
