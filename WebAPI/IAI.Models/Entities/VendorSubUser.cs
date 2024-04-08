using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("VendorSubUser")]
    public class VendorSubUser : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid VendorSubUserId { get; set; }
        [ForeignKey("VendorId")]
        public virtual Vendor? Vendor { get; set; }
        public Guid VendorId { get; set; }
        [ForeignKey("UserId")]
        public virtual UserMaster? UserMaster { get; set; }
        public Guid UserId { get; set; }
        public string? VendorName { get; set; }
        public string? VendorEmailId { get; set; }
        public long VendorPhoneNumber { get; set; }
    }
}
