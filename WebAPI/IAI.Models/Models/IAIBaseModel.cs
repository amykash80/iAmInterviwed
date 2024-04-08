
namespace IAI.Models.Models
{
    public class IAIBaseModel
    {
        public bool IsActive { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTimeOffset? CreatedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public DateTimeOffset? ModifiedDate { get; set; }
        public Guid? DeletedBy { get; set; }
        public DateTimeOffset? DeletedDate { get; set; }
    }
}
