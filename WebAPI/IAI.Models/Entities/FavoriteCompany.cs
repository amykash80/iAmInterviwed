using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("FavoriteCompany")]
    public class FavoriteCompany : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ApplicationId { get; set; }
        [ForeignKey("CandidateId")]
        public virtual CandidateProfile? Candidate { get; set; }
        public Guid CandidateId { get; set; }        
        [ForeignKey("CompanyId")]
        public virtual CompanyProfile? Company { get; set; }
        public Guid CompanyId { get; set; }        
        [ForeignKey("DesignationId")]
        public virtual Designation? Designation { get; set; }
        public Guid DesignationId { get; set; }        
        public DateTimeOffset AppliedDate { get; set; }
    }
}
