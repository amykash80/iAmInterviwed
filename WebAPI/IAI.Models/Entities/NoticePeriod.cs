using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("NoticePeriod")]
    public class NoticePeriod : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NoticePeriodId { get; set; }
        public string? NoticePeriodName { get; set; }
        public string? Description { get; set; }
    }
}
