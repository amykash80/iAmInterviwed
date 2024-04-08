using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("ZoomSchedules")]
    public class ZoomSchedules : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ZoomScheduleId { get; set; }
        [ForeignKey("InterviewId")]
        public virtual Interview? Interview { get; set; }
        public Guid InterviewId { get; set; }        
        public string? MeetingId { get; set; }
        [ForeignKey("ZoomAccountId")]
        public virtual ZoomAccount? ZoomAccount { get; set; }
        public Guid ZoomAccountId { get; set; }        
        public string? HostUrl { get; set; }
        public string? JoinUrl { get; set; }
        public string? StatusCode { get; set; }
        public string? RecordingUrl { get; set; }
        public string? Passcode { get; set; }
    }
}
