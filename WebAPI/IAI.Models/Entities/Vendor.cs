using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("Vendor")]
    public class Vendor : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid VendorId { get; set; }
        [ForeignKey("CompanyId")]
        public virtual CompanyProfile? Company { get; set; }
        public Guid CompanyId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserMaster? UserMaster { get; set; }
        public Guid UserId { get; set; }
        public string? VendorName { get; set; }
        public string? VendorEmailId { get; set; }
        public long VendorPhoneNumber { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
    }
}
