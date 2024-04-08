using IAI.Models.Models.Common;

namespace IAI.Models.Models
{
    public class UserDetailsModel
    {
        public Guid UserId { get; set; }
        public string? UserName { get; set; }
        public string? Name { get; set; }
        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public Guid? ProfileId { get; set; }
        public string? EmailId { get; set; }
        public List<RoleScreenMappingModel> Routes { get; set; }
    }
}
