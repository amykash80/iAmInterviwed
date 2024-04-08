using System.ComponentModel.DataAnnotations;

namespace IAI.Models.Models.Account
{
    public class LoginModel
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string UserName
        {
            get;
            set;
        }
        [Required]
        public string Password
        {
            get;
            set;
        }
        public LoginModel() { }
    }
}
