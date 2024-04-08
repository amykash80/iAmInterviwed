using System.ComponentModel.DataAnnotations;

namespace IAI.Models.Models.Account
{
    public class ChangePasswordModel
    {
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? NewPassword { get; set; }
        [Required]
        public string? ConfirmNewPassword { get; set; }
    }
}
