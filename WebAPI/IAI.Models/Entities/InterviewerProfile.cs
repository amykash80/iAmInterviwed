using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewerProfile")]
    public class InterviewerProfile : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid InterviewerId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserMaster? UserMaster { get; set; }
        public Guid UserId { get; set; }        
        public string? Name { get; set; }
        public string? EmailId { get; set; }
        public long MobileNumber { get; set; }        
        [ForeignKey("CityId")]
        public virtual City? City { get; set; }
        public int CityId { get; set; }        
        [ForeignKey("ExperienceId")]
        public virtual Experience? Experience { get; set; }
        public int ExperienceId { get; set; }        
        public string? Address { get; set; }
    }
}
