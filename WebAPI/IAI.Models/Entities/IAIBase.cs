﻿
namespace IAI.Models.Entities
{
    public class IAIBase
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
