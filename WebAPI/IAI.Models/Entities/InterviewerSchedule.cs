using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewerSchedule")]
    public class InterviewerSchedule : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid InterviewerScheduleId { get; set; }
        [ForeignKey("InterviewerId")]
        public virtual InterviewerProfile? Interviewer { get; set; }
        public Guid InterviewerId { get; set; }        
        public DateTimeOffset Date { get; set; }
        [ForeignKey("TimeSlotId")]
        public virtual TimeSlot? TimeSlot { get; set; }
        public int TimeSlotId { get; set; }        
        public bool IsTentitivelyBlocked { get; set; }
        public bool IsBlocked { get; set; }
    }
}
