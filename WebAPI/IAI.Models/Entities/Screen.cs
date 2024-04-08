using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("Screen")]
    public class Screen : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ScreenId { get; set; }
        public string? ScreenName { get; set; }
        public string? Description { get; set; }
        public string? RoutePath { get; set; }
        public string? Icon { get; set; }
        public int MenuLevel { get; set; }
        public int? ParentId { get; set; }
        public int? ScreenOrder { get; set; }
    }
}
