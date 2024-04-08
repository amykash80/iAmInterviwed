using System.ComponentModel.DataAnnotations;

namespace IAI.Models.Models.Account
{
    public class VerificationModel
    {
        [Required]
        public string? VerificationCode { get; set; }
        [Required]
        public string? VerificationString { get; set; }
    }
}
