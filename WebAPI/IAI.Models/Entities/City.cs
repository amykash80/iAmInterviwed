using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("City")]
    public class City : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CityId { get; set; }
        public string? CityName { get; set; }
        public string? Description { get; set; }
        [ForeignKey("CountryId")]
        public virtual Country Country { get; set; }
        public int CountryId { get; set; }        
    }
}
