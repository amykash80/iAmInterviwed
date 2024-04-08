using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("Designation")]
    public class Designation : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid DesignationId { get; set; }
        [ForeignKey("CompanyId")]
        public virtual CompanyProfile? Company { get; set; }
        public Guid CompanyId { get; set; }        
        public string? DesignationName { get; set; }
        public string? Description { get; set; }
    }
}