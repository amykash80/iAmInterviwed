using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("RoleScreenMapping")]
    public class RoleScreenMapping : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoleScreenId { get; set; }
        [ForeignKey("RoleId")]
        public Role? Role { get; set; }
        public int RoleId { get; set; }        
        [ForeignKey("ScreenId")]
        public Screen? Screen { get; set; }
        public int ScreenId { get; set; }        
    }
}
