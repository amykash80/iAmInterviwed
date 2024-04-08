using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace IAI.Models.Models.Account
{
    public class CompanyRegisterModel
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string UserName { get; set; }
        [Required]        
        public string? Password { get; set; }
        [Required]        
        public string? ConfirmPassword { get; set; }
        [Required]
        [StringLength(50, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string? Name { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? EmailId { get; set; }
        [Required]        
        public long MobileNumber { get; set; }
        [Required]
        public int CountryId { get; set; }        
        [Required]
        public int RoleId { get; set; }
        public int CityId { get; set; }
    }
}