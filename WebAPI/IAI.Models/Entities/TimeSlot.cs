using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("TimeSlot")]
    public class TimeSlot : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TimeSlotId { get; set; }
        public string? TimeSlotName { get; set; }
    }
}
