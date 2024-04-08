

namespace IAI.Models.Models
{
    public class UserRoleModel : IAIBaseModel
    {
        public Guid UserRoleId { get; set; }
        public Guid UserId { get; set; }
        public int RoleId { get; set; }
        public UserMasterModel? UserMaster { get; set; }
        public RoleModel? Role { get; set; }
    }
}
