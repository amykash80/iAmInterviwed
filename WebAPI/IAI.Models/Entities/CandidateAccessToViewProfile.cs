using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CandidateAccessToViewProfile")]
    public class CandidateAccessToViewProfile : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid AccessId { get; set; }
        [ForeignKey("CandidateId")]
        public virtual CandidateProfile? Candidate { get; set; }
        public virtual Guid CandidateId { get; set; }
        
        [ForeignKey("RequirementId")]
        public virtual CompanyRequirement? CompanyRequirement { get; set; }
        public Guid RequirementId { get; set; }        
        public bool HasAccess { get; set; }
    }
}
