using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace IAI.Models.Models.Account
{
    public class RegisterModel
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string UserName { get; set; }
        [Required]
        //[RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8}$", ErrorMessage = "Password must meet requirements")]
        public string? Password { get; set; }
        [Required]
        //[RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8}$", ErrorMessage = "Password must meet requirements")]
        public string? ConfirmPassword { get; set; }
        [Required]
        [StringLength(50, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string? Name { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? EmailId { get; set; }
        [Required]
        //[RegularExpression(@"^(\d{10})$", ErrorMessage = "Wrong Mobile")]
        public long MobileNumber { get; set; }
        [Required]
        public int PrimarySkillId { get; set; }
        [Required]
        public int CountryId { get; set; }
        [Required]
        public int CityId { get; set; }
        [Required]
        public int RoleId { get; set; }
        [Required]
        public int ExperienceId { get; set; }
    }
}
