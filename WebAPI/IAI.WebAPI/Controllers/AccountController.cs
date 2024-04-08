using Azure;
using IAI.BusinessService;
using IAI.BusinessService.Implementation;
using IAI.BusinessService.Interface;
using IAI.Models.Models.Account;
using IAI.Models.Models.Common;
using IAI.Models.Models.JWTTokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using NLog;
using System.Security.Claims;

namespace IAI.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly JwtSettings jwtSettings;
        private static Logger _logger = LogManager.GetLogger("ControllerLogs");
        private readonly IAccountService iAccountService;
        public AccountController(JwtSettings jwtSettings, IAccountService iAccountService)
        {
            this.jwtSettings = jwtSettings;
            this.iAccountService = iAccountService;
        }

        [HttpPost]
        [Route("token")]
        public async Task<IActionResult> GetToken(LoginModel userLogins)
        {
            try
            {
                var Token = new UserTokens();
                var user = await iAccountService.AuthenticateUser(userLogins.UserName, userLogins.Password);
                if (!string.IsNullOrEmpty(user.UserName))
                {
                    Token = JwtHelpers.GenTokenkey(new UserTokens()
                    {
                        EmailId = user.UserName,
                        GuidId = Guid.NewGuid(),
                        UserName = user.UserName,
                        Id = user.UserId,
                        Role = user.RoleName
                    }, jwtSettings);
                }
                else
                {
                    return BadRequest("Incorrect Username or Password");
                }
                return Ok(Token);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> RegisterUser(RegisterModel model)
        {
            try
            {
                var response = await iAccountService.RegisterUser(model);                
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("VerifyUser")]
        public async Task<IActionResult> VerifyUser(VerificationModel model)
        {
            try
            {
                var response = await iAccountService.VerifyUserAccount(model);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            try
            {
                var response = await iAccountService.ChangePassword(model);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("RegisterCompany")]
        public async Task<IActionResult> RegisterCompanyUser(CompanyRegisterModel model)
        {
            try
            {
                var response = await iAccountService.RegisterCompanyUser(model);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("UserDetails")]
        public async Task<IActionResult> GetUserDetails()
        {
            try
            {
                var userId = Guid.Parse(this.User.Claims.First(i => i.Type == "Id").Value);
                var response = await iAccountService.GetUserDetails(userId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
