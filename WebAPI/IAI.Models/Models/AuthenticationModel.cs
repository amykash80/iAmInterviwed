
namespace IAI.Models.Models
{
    public class AuthenticationModel
    {
        public Guid UserId { get; set; }
        public Guid ProfileId { get; set; }
        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public string? UserName { get; set; }
    }
}
