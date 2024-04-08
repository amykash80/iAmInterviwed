using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("JobType")]
    public class JobType : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int JobTypeId { get; set; }
        public string? JobTypeName { get; set; }
        public string? Description { get; set; }
    }
}
