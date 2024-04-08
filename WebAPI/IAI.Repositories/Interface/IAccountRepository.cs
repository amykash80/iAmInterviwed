using IAI.Models.Entities;
using IAI.Models.Models;
using IAI.Models.Models.Account;

namespace IAI.Repositories.Interface
{
    public interface IAccountRepository
    {
        Task<bool> CheckUserExist(string userName);
        Task<UserMaster> AuthenticateUser(string userName);
        Task<UserRole> GetUserRole(Guid userId);
        Task<AuthenticationModel> RegisterUser(RegisterModel model);
        Task<bool> CheckCandidateExists(Guid candidateId);
        Task<bool> CheckInterviewerExists(Guid interviewerId);
        Task<bool> CheckCompanyExists(Guid companyId);
        Task<AuthenticationModel> RegisterCompanyUser(CompanyRegisterModel model);
        Task<UserMaster> RegisterVendorUser(CompanyRegisterModel model);
        Task<UserDetailsModel> GetUserDetails(Guid userId);
        Task<UserMaster> GetUserById(Guid userId);
        Task<bool> VerifyUserAccount(Guid userId);
        Task<bool> ChangePassword(ChangePasswordModel model);        
    }
}
