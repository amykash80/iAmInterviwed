using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("SubUser")]
    public class SubUser : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid SubUserId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserMaster? UserMaster { get; set; }
        public Guid UserId { get; set; }        
        [ForeignKey("CompanyId")]
        public virtual CompanyProfile? Company { get; set; }
        public Guid CompanyId { get; set; }

        [ForeignKey("DepartmentId")]
        public virtual Department? Department { get; set; }
        public Guid DepartmentId { get; set; }
    }
}