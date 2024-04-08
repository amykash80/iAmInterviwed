using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("UserMaster")]
    public class UserMaster : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        public string? VerificationCode { get; set; }
        public bool IsLockedOut { get; set; }
        public DateTimeOffset LastLoginDate { get; set; }
        public DateTimeOffset LastPasswordChangedDate { get; set; }
        public DateTimeOffset LastLockoutDate { get; set; }
        public int FailedPasswordAttemptCount { get; set; }
        public bool PasswordResetRequestActive { get; set; }
    }
}
