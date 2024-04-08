
namespace IAI.Models.Models
{
    public class UserMasterModel : IAIBaseModel
    {
        public Guid UserId { get; set; }
        public string? UniqueId { get; set; }
        public string? UserName { get; set; }
        public string? LoweredUserName { get; set; }
        public string? Password { get; set; }
        public string? PasswordSalt { get; set; }
        public int PasswordFormat { get; set; }
        public DateTimeOffset LastActivityDate { get; set; }
        public bool IsPasswordChanged { get; set; }
        public bool IsVerified { get; set; }
        public bool IsLockedOut { get; set; }
        public DateTimeOffset LastLoginDate { get; set; }
        public DateTimeOffset LastPasswordChangedDate { get; set; }
        public DateTimeOffset LastLockoutDate { get; set; }
        public int FailedPasswordAttemptCount { get; set; }
        public bool PasswordResetRequestActive { get; set; }
    }
}
