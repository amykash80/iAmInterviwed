using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("EmailTracker")]
    public class EmailTracker : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid EmailTrackerId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserMaster? UserMaster { get; set; }
        public Guid UserId { get; set; }        
        public string? EmailId { get; set; }
        public string? EmailSubject { get; set; }
        public string? CCEmailIds { get; set; }
        public bool IsDelivered { get; set; }
    }
}
