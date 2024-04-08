using IAI.BusinessService.Interface;
using IAI.Models.Models;
using IAI.Repositories.Interface;
using IAI.Models.Models.Account;
using IAI.Models.Models.Responses;

namespace IAI.BusinessService.Implementation
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository iAccountRepository;
        private readonly IEncryptDecryptService iEncryptDecryptService;
        private readonly IRoleMappingRepository iRoleMappingRepository;
        private readonly IEmailHelperService iEmailHelperService;
        public AccountService(IAccountRepository iAccountRepository, IEncryptDecryptService iEncryptDecryptService, IRoleMappingRepository iRoleMappingRepository, IEmailHelperService iEmailHelperService)
        {
            this.iAccountRepository = iAccountRepository;
            this.iEncryptDecryptService = iEncryptDecryptService;
            this.iRoleMappingRepository = iRoleMappingRepository;
            this.iEmailHelperService = iEmailHelperService;
        }

        public async Task<bool> CheckUserExist(string userName)
        {
            return await iAccountRepository.CheckUserExist(userName);
        }

        public async Task<AuthenticationModel> AuthenticateUser(string userName, string password)
        {
            var authenticationModel = new AuthenticationModel();
            var user = await iAccountRepository.AuthenticateUser(userName);
            if (user != null)
            {
                var decryptedPassword = iEncryptDecryptService.DecryptBase64(password).Replace("\"", string.Empty).Trim();
                if (iEncryptDecryptService.Decrypt(user.Password) == decryptedPassword)
                {
                    authenticationModel.UserName = user.UserName;
                    authenticationModel.UserId = user.UserId;
                    var userRole = await iAccountRepository.GetUserRole(user.UserId);
                    if (userRole != null)
                    {
                        authenticationModel.RoleId = userRole.RoleId;
                        authenticationModel.RoleName = userRole.Role?.RoleName;
                    }
                }
            }
            return authenticationModel;
        }

        public async Task<BaseResponse<AuthenticationModel>> RegisterUser(RegisterModel model)
        {
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            var user = new AuthenticationModel();
            try
            {
                var userExist = await iAccountRepository.CheckUserExist(model.UserName);
                if (userExist)
                {
                    errorMessages.Add("User already exists. Please try with another Email Address");
                }
                else
                {
                    model.Password = iEncryptDecryptService.DecryptBase64(model.Password).Replace("\"", string.Empty).Trim();
                    model.ConfirmPassword = iEncryptDecryptService.DecryptBase64(model.ConfirmPassword).Replace("\"", string.Empty).Trim();
                    if (model.Password != model.ConfirmPassword)
                    {
                        errorMessages.Add("Password and Confirm Password Doesnot match.");
                    }
                    else
                    {
                        model.Password = iEncryptDecryptService.Encrypt(model.Password);
                        model.ConfirmPassword = iEncryptDecryptService.Encrypt(model.ConfirmPassword);
                        user = await iAccountRepository.RegisterUser(model);
                        var userDetail = await iAccountRepository.GetUserById(user.UserId);
                        var emailSent = await iEmailHelperService.SendVerificationEmail(model?.EmailId, user?.UserName, userDetail?.VerificationCode, (Guid)user.UserId);
                        infoMessages.Add("User Saved Successfully. Please check your Email to Vertify your account");
                    }
                }
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while uploading File. " + ex.Message);
            }
            return new BaseResponse<AuthenticationModel>(user, errorMessages, new List<string>(), infoMessages);
        }

        public async Task<BaseResponse<AuthenticationModel>> RegisterCompanyUser(CompanyRegisterModel model)
        {
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            var user = new AuthenticationModel();
            try
            {
                var userExist = await iAccountRepository.CheckUserExist(model.UserName);
                if (userExist)
                {
                    errorMessages.Add("User already exists. Please try with another Email Address");
                }
                else
                {
                    model.Password = iEncryptDecryptService.DecryptBase64(model.Password).Replace("\"", string.Empty).Trim();
                    model.ConfirmPassword = iEncryptDecryptService.DecryptBase64(model.ConfirmPassword).Replace("\"", string.Empty).Trim();
                    if (model.Password != model.ConfirmPassword)
                    {
                        errorMessages.Add("Password and Confirm Password Doesnot match.");
                    }
                    else
                    {
                        model.Password = iEncryptDecryptService.Encrypt(model.Password);
                        model.ConfirmPassword = iEncryptDecryptService.Encrypt(model.ConfirmPassword);
                        user = await iAccountRepository.RegisterCompanyUser(model);
                        var emailSent = await iEmailHelperService.SendRegistrationEmail(model?.EmailId, model.Name, iEncryptDecryptService.Decrypt(model.Password));
                        infoMessages.Add("Company Registered Successfully.");
                    }
                }
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while uploading File. " + ex.Message);
            }
            return new BaseResponse<AuthenticationModel>(user, errorMessages, new List<string>(), infoMessages);
        }

        public async Task<BaseResponse<UserDetailsModel>> GetUserDetails(Guid userId)
        {
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            var userDetails = new UserDetailsModel();
            try
            {
                userDetails = await iAccountRepository.GetUserDetails(userId);
                if (userDetails == null || string.IsNullOrEmpty(userDetails.UserName))
                {
                    errorMessages.Add("User doesnot Exist.");
                }
                else
                {
                    userDetails.Routes = await iRoleMappingRepository.GetRoleBasedRoutes(userId);
                }
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while getting User Details. " + ex.Message);
            }
            return new BaseResponse<UserDetailsModel>(userDetails, errorMessages, new List<string>(), infoMessages);
        }

        public async Task<BaseResponse<bool>> VerifyUserAccount(VerificationModel model)
        {
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            var userVerified = false;
            try
            {
                var verificationString = iEncryptDecryptService.DecryptBase64(model.VerificationString);
                var verificationStringSplit = verificationString.Split(":");
                if (verificationStringSplit.Length > 0)
                {
                    var user = await iAccountRepository.GetUserById(Guid.Parse(verificationStringSplit[0]));
                    if (model.VerificationCode == verificationStringSplit[1] && model.VerificationCode == user.VerificationCode)
                    {
                        userVerified = await iAccountRepository.VerifyUserAccount(Guid.Parse(verificationStringSplit[0]));
                        if (userVerified)
                        {
                            var userDetails = await iAccountRepository.GetUserDetails(Guid.Parse(verificationStringSplit[0]));
                            var emailSent = await iEmailHelperService.SendRegistrationEmail(userDetails?.EmailId, userDetails?.UserName, iEncryptDecryptService.Decrypt(user.Password));
                            infoMessages.Add("User Registered and Verified Successfully");
                        }
                        else
                        {
                            errorMessages.Add("Error while Verifying User, please try again.");
                        }
                    }
                    else
                    {
                        errorMessages.Add("Invalid Verification Code.");
                    }
                }
                else
                {
                    errorMessages.Add("Invalid Verification Code.");
                }
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while Verifying User. " + ex.Message);
            }
            return new BaseResponse<bool>(userVerified, errorMessages, new List<string>(), infoMessages);
        }

        public async Task<BaseResponse<bool>> ChangePassword(ChangePasswordModel model)
        {
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            var paswordChanged = false;
            try
            {
                var user = await iAccountRepository.GetUserById(model.UserId);
                if (user != null)
                {
                    var decryptedPassword = iEncryptDecryptService.DecryptBase64(model.Password).Replace("\"", string.Empty).Trim();
                    if (iEncryptDecryptService.Decrypt(user.Password) == decryptedPassword)
                    {
                        var decryptedNewPassword = iEncryptDecryptService.DecryptBase64(model.NewPassword).Replace("\"", string.Empty).Trim();
                        model.NewPassword = iEncryptDecryptService.Encrypt(decryptedNewPassword);
                        paswordChanged = await iAccountRepository.ChangePassword(model);
                        if (paswordChanged)
                        {
                            var userDetails = await iAccountRepository.GetUserDetails(model.UserId);
                            var userExist = await iAccountRepository.GetUserById(model.UserId);
                            var emailSent = await iEmailHelperService.SendChangePasswordEmail(userDetails?.EmailId, userDetails?.UserName, iEncryptDecryptService.Decrypt(model.NewPassword));
                            infoMessages.Add("Password Changed Successfully.");
                        }
                        else
                        {
                            errorMessages.Add("Error while Changing password, please try again.");
                        }
                    }
                    else
                    {
                        errorMessages.Add("Existing Passwords Doesn't Match");
                    }
                }
                else
                {
                    errorMessages.Add("Invalid User Details.");
                }
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while Verifying User. " + ex.Message);
            }
            return new BaseResponse<bool>(paswordChanged, errorMessages, new List<string>(), infoMessages);
        }
    }
}
