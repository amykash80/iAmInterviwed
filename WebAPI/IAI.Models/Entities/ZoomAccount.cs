using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("ZoomAccount")]
    public class ZoomAccount : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ZoomAccountId { get; set; }
        public string UserName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
        public string JwtToken { get; set; }
    }
}
