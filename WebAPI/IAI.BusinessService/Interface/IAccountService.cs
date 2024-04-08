using IAI.Models.Entities;
using IAI.Models.Models;
using IAI.Models.Models.Account;
using IAI.Models.Models.Responses;

namespace IAI.BusinessService.Interface
{
    public interface IAccountService
    {
        Task<bool> CheckUserExist(string userName);
        Task<AuthenticationModel> AuthenticateUser(string userName, string password);
        Task<BaseResponse<AuthenticationModel>> RegisterUser(RegisterModel model);
        Task<BaseResponse<AuthenticationModel>> RegisterCompanyUser(CompanyRegisterModel model);
        Task<BaseResponse<UserDetailsModel>> GetUserDetails(Guid userId);
        Task<BaseResponse<bool>> VerifyUserAccount(VerificationModel model);
        Task<BaseResponse<bool>> ChangePassword(ChangePasswordModel model);
    }
}
