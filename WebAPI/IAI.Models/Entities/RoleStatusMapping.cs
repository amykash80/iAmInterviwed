using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("RoleStatusMapping")]
    public class RoleStatusMapping : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoleStatusId { get; set; }
        [ForeignKey("RoleId")]
        public virtual Role? Role { get; set; }
        public int RoleId { get; set; }        
        [ForeignKey("StatusId")]
        public virtual Status? Status { get; set; }
        public int StatusId { get; set; }        
    }
}
