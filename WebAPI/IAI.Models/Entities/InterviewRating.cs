using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewRating")]
    public class InterviewRating : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RatingId { get; set; }
        [ForeignKey("InterviewId")]
        public virtual Interview? Interview { get; set; }
        public Guid InterviewId { get; set; }        
        public decimal TotalRating { get; set; }
        public string? InterviewerComments { get; set; }
        public string? InterviewRecordingTitle { get; set; }
        public DateTimeOffset RatedDate { get; set; }
        public bool IsRatingAcceptedByUser { get; set; }
    }
}
