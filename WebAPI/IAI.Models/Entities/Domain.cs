using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("Domain")]
    public class Domain : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DomainId { get; set; }
        [ForeignKey("CompanyId")]
        public virtual CompanyProfile? Company { get; set; }
        public Guid CompanyId { get; set; }
        public string? DomainName { get; set; }
        public string? Description { get; set; }
    }
}