using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewRound")]
    public class InterviewRound : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InterviewRoundId { get; set; }
        public string? RoundName { get; set; }
        public string? Description { get; set; }
    }
}
