using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    public class UserRole : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid UserRoleId { get; set; }
        public virtual Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserMaster? UserMaster { get; set; }
        public virtual int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public virtual Role? Role { get; set; }
    }
}
