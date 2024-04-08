using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("RequirementProfile")]
    public class RequirementProfile : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ProfileId { get; set; }
        [ForeignKey("RequirementId")]
        public virtual CompanyRequirement? CompanyRequirement { get; set; }
        public Guid RequirementId { get; set; }        
        [ForeignKey("CandidateId")]
        public virtual CandidateProfile? Candidate { get; set; }
        public Guid CandidateId { get; set; }        
        [ForeignKey("VendorId")]
        public virtual Vendor? Vendor { get; set; }
        public Guid? VendorId { get; set; }
        [ForeignKey("StatusId")]
        public virtual Status? Status { get; set; }
        public int StatusId { get; set; }        
        public string? Comments { get; set; }
    }
}
