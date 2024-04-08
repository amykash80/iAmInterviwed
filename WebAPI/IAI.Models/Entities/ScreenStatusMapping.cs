using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("ScreenStatusMapping")]
    public class ScreenStatusMapping : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ScreenStatusId { get; set; }
        [ForeignKey("ScreenId")]
        public virtual Screen? Screen { get; set; }
        public int ScreenId { get; set; }        
        [ForeignKey("StatusId")]
        public virtual Status? Status { get; set; }
        public int StatusId { get; set; }        
    }
}
