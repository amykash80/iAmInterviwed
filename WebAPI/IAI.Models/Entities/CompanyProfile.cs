using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("CompanyProfile")]
    public class CompanyProfile : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CompanyId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserMaster? UserMaster { get; set; }
        public Guid UserId { get; set; }        
        public string? Name { get; set; }
        public string? EmailId { get; set; }
        public long MobileNumber { get; set; }
        public string? Website { get; set; }
        public string? ContactPersonName { get; set; }
        public string? ContactPersonEmailId { get; set; }
        public long? ContactPersonPhoneNumber { get; set; }
        public string? Address { get; set; }
        [ForeignKey("CityId")]
        public virtual City? City { get; set; }
        public int? CityId { get; set; }
        [ForeignKey("CountryId")]
        public virtual Country? Country { get; set; }
        public int? CountryId { get; set; }
    }
}
