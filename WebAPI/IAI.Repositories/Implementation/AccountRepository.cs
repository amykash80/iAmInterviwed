using IAI.Repositories.Interface;
using IAI.Models.Entities;
using Microsoft.EntityFrameworkCore;
using IAI.Models.Models.Account;
using IAI.Models.Enums;
using IAI.Models.Models;

namespace IAI.Repositories.Implementation
{
    public class AccountRepository : IAccountRepository
    {
        private IAIDBContext dbContext;
        public AccountRepository(IAIDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> CheckUserExist(string userName)
        {
            var user = await dbContext.UserMaster.Where(x => x.UserName.ToLower() == userName.ToLower() && x.IsActive).FirstOrDefaultAsync();
            return user == null ? false : true;
        }

        public async Task<UserMaster> AuthenticateUser(string userName)
        {
            var user = await dbContext.UserMaster.Where(x => x.UserName.ToLower() == userName.ToLower() && x.IsActive && x.IsVerified).FirstOrDefaultAsync();
            return user;
        }

        public async Task<UserRole> GetUserRole(Guid userId)
        {
            var userRole = await dbContext.UserRole.Where(x => x.UserId == userId && x.IsActive).Include(x => x.Role).FirstOrDefaultAsync();
            return userRole;
        }

        public async Task<AuthenticationModel> RegisterUser(RegisterModel model)
        {
            var userModel = new AuthenticationModel();
            var user = await SaveUser(model);
            var userRole = await SaveUserRole(model, user);
            if (model.RoleId == Convert.ToInt32(RoleEnum.Candidate))
            {
                var candidate = await SaveCandidateProfile(model, user);
                userModel = new AuthenticationModel()
                {
                    UserId = user.UserId,
                    ProfileId = candidate.CandidateId,
                    UserName = candidate.Name,
                    RoleId = userRole.RoleId,
                    RoleName = userRole?.Role?.RoleName
                };
            }
            else if (model.RoleId == Convert.ToInt32(RoleEnum.Interviewer))
            {
                var interviewer = await SaveInterviewerProfile(model, user);
                userModel = new AuthenticationModel()
                {
                    UserId = user.UserId,
                    ProfileId = interviewer.InterviewerId,
                    UserName = interviewer.Name,
                    RoleId = userRole.RoleId,
                    RoleName = userRole?.Role?.RoleName
                };
            }
            return userModel;
        }

        public async Task<AuthenticationModel> RegisterCompanyUser(CompanyRegisterModel model)
        {
            var registerModel = new RegisterModel();
            registerModel.UserName = model.UserName;
            registerModel.EmailId = model.EmailId;
            registerModel.Password = model.Password;
            registerModel.RoleId = model.RoleId;
            registerModel.Name = model.Name;
            registerModel.MobileNumber = model.MobileNumber;
            var user = await SaveUser(registerModel);
            var userRole = await SaveUserRole(registerModel, user);
            var countryId = await dbContext.City.Where(x => x.CityId == model.CityId).Select(x => x.CountryId).FirstOrDefaultAsync();
            model.CountryId = countryId;
            var company = await SaveCompanyProfile(model, user);
            var userModel = new AuthenticationModel()
            {
                UserId = user.UserId,
                ProfileId = company.CompanyId,
                UserName = company.Name,
                RoleId = userRole.RoleId,
                RoleName = userRole?.Role?.RoleName
            };
            return userModel;
        }

        public async Task<UserMaster> RegisterVendorUser(CompanyRegisterModel model)
        {
            var userModel = new AuthenticationModel();
            var registerModel = new RegisterModel();
            registerModel.UserName = model.UserName;
            registerModel.EmailId = model.EmailId;
            registerModel.Password = model.Password;
            registerModel.RoleId = model.RoleId;
            registerModel.Name = model.Name;
            registerModel.EmailId = model.EmailId;
            registerModel.MobileNumber = model.MobileNumber;
            var user = await SaveUser(registerModel);
            var userRole = await SaveUserRole(registerModel, user);
            return user;
        }

        private async Task<UserMaster> SaveUser(RegisterModel model)
        {
            var user = new UserMaster();
            user.UserName = model.UserName;
            user.UniqueId = Guid.NewGuid().ToString("n").Substring(0, 10);
            user.Password = model.Password;
            user.LoweredUserName = model.UserName.ToLower();
            user.PasswordSalt = model.Password;
            user.PasswordFormat = 1;
            user.LastActivityDate = DateTime.Now;
            user.IsPasswordChanged = true;
            user.IsVerified = (model.RoleId == Convert.ToInt32(RoleEnum.Candidate) || model.RoleId == Convert.ToInt32(RoleEnum.Interviewer)) ? false : true;
            user.VerificationCode = Guid.NewGuid().ToString("n").Substring(0, 10);
            user.IsLockedOut = false;
            user.LastLoginDate = DateTime.Now;
            user.LastPasswordChangedDate = DateTime.Now;
            user.LastLockoutDate = DateTime.Now;
            user.FailedPasswordAttemptCount = 0;
            user.PasswordResetRequestActive = false;
            user.IsActive = true;
            user.CreatedBy = Guid.Empty;
            user.CreatedDate = DateTime.Now;
            user.ModifiedBy = Guid.Empty;
            user.ModifiedDate = DateTime.Now;
            user.DeletedBy = Guid.Empty;
            user.DeletedDate = DateTime.Now;
            dbContext.UserMaster.Add(user);
            await dbContext.SaveChangesAsync();
            return user;
        }

        private async Task<UserRole> SaveUserRole(RegisterModel model, UserMaster user)
        {
            var userRole = new UserRole();
            userRole.UserId = user.UserId;
            userRole.RoleId = model.RoleId;
            userRole.IsActive = true;
            userRole.CreatedBy = user.UserId;
            userRole.CreatedDate = DateTime.Now;
            userRole.ModifiedBy = user.UserId;
            userRole.ModifiedDate = DateTime.Now;
            userRole.DeletedBy = user.UserId;
            userRole.DeletedDate = DateTime.Now;
            dbContext.UserRole.Add(userRole);
            await dbContext.SaveChangesAsync();
            return userRole;
        }

        private async Task<CandidateProfile> SaveCandidateProfile(RegisterModel model, UserMaster user)
        {
            var candidate = await dbContext.CandidateProfile.Where(x => x.UserId == user.UserId && x.IsActive).Include(x => x.UserMaster).FirstOrDefaultAsync();
            if (candidate == null)
            {
                candidate = new CandidateProfile()
                {
                    UserId = user.UserId,
                    Name = model.Name,
                    EmailId = model.EmailId,
                    MobileNumber = model.MobileNumber,
                    PrimarySkillId = model.PrimarySkillId,
                    AdditionalSkills = model.PrimarySkillId.ToString(),
                    CityId = model.CityId,
                    ExperienceId = model.ExperienceId,
                    GapInEducation = false,
                    GapInExperience = false,
                    NoticePeriodId = (int)NoticePeriodEnum.Sixtydays,
                    ReadyToChange = true,
                    Address = "",
                    PromoCode = false,
                    RestrictEmployerToViewProfile = false,
                    IsActive = true,
                    CreatedBy = user.UserId,
                    CreatedDate = DateTimeOffset.Now
                };
                dbContext.CandidateProfile.Add(candidate);
            }
            else
            {
                candidate.Name = model.Name;
                candidate.EmailId = model.EmailId;
                candidate.MobileNumber = model.MobileNumber;
                candidate.PrimarySkillId = model.PrimarySkillId;
                candidate.AdditionalSkills = model.PrimarySkillId.ToString();
                candidate.CityId = model.CityId;
                candidate.ExperienceId = model.ExperienceId;
                candidate.GapInEducation = false;
                candidate.GapInExperience = false;
                candidate.NoticePeriodId = (int)NoticePeriodEnum.Sixtydays;
                candidate.ReadyToChange = true;
                candidate.Address = "";
                candidate.PromoCode = false;
                candidate.RestrictEmployerToViewProfile = false;
                candidate.IsActive = true;
                candidate.ModifiedBy = user.UserId;
                candidate.ModifiedDate = DateTimeOffset.Now;
            }
            await dbContext.SaveChangesAsync();
            return candidate;
        }

        private async Task<InterviewerProfile> SaveInterviewerProfile(RegisterModel model, UserMaster user)
        {
            var interviewer = await dbContext.InterviewerProfile.Where(x => x.UserId == user.UserId && x.IsActive).FirstOrDefaultAsync();
            if (interviewer == null)
            {
                interviewer = new InterviewerProfile()
                {
                    UserId = user.UserId,
                    Name = model.Name,
                    EmailId = model.EmailId,
                    MobileNumber = model.MobileNumber,
                    CityId = model.CityId,
                    ExperienceId = model.ExperienceId,
                    Address = "",
                    IsActive = true,
                    CreatedBy = user.UserId,
                    CreatedDate = DateTimeOffset.Now
                };
                dbContext.InterviewerProfile.Add(interviewer);

                var interviewerProfile = new InterviewerProfileDetail()
                {
                    InterviewerId = interviewer.InterviewerId,
                    ProfileName = "Profile 1",
                    PrimarySkillId = model.PrimarySkillId,
                    AdditionalSkills = model.PrimarySkillId.ToString(),
                    IsActive = true,
                    CreatedBy = user.UserId,
                    CreatedDate = DateTimeOffset.Now,
                    ModifiedBy = user.UserId,
                    ModifiedDate = DateTimeOffset.Now
                };
                dbContext.InterviewerProfileDetail.Add(interviewerProfile);
            }
            else
            {
                interviewer.Name = model.Name;
                interviewer.EmailId = model.EmailId;
                interviewer.MobileNumber = model.MobileNumber;
                interviewer.CityId = model.CityId;
                interviewer.ExperienceId = model.ExperienceId;
                interviewer.Address = "";
                interviewer.IsActive = true;
                interviewer.ModifiedBy = user.UserId;
                interviewer.ModifiedDate = DateTimeOffset.Now;
            }
            await dbContext.SaveChangesAsync();
            return interviewer;
        }

        private async Task<CompanyProfile> SaveCompanyProfile(CompanyRegisterModel model, UserMaster user)
        {
            var company = await dbContext.CompanyProfile.Where(x => x.UserId == user.UserId && x.IsActive).FirstOrDefaultAsync();
            if (company == null)
            {
                company = new CompanyProfile()
                {
                    UserId = user.UserId,
                    Name = model.Name,
                    EmailId = model.EmailId,
                    MobileNumber = model.MobileNumber,
                    CountryId = model.CountryId,
                    CityId = model.CityId,
                    IsActive = true,
                    CreatedBy = user.UserId,
                    CreatedDate = DateTimeOffset.Now
                };
                dbContext.CompanyProfile.Add(company);
            }
            else
            {
                company.Name = model.Name;
                company.EmailId = model.EmailId;
                company.MobileNumber = model.MobileNumber;
                company.CountryId = model.CountryId;
                company.CityId = model.CityId;
                company.IsActive = true;
                company.ModifiedBy = user.UserId;
                company.ModifiedDate = DateTimeOffset.Now;
            }
            await dbContext.SaveChangesAsync();
            return company;
        }

        public async Task<bool> CheckCandidateExists(Guid candidateId)
        {
            var canddate = await dbContext.CandidateProfile.Where(x => x.CandidateId == candidateId && x.IsActive).FirstOrDefaultAsync();
            return canddate == null ? false : true;
        }

        public async Task<bool> CheckInterviewerExists(Guid interviewerId)
        {
            var interviewer = await dbContext.InterviewerProfile.Where(x => x.InterviewerId == interviewerId && x.IsActive).FirstOrDefaultAsync();
            return interviewer == null ? false : true;
        }

        public async Task<bool> CheckCompanyExists(Guid companyId)
        {
            var company = await dbContext.CompanyProfile.Where(x => x.CompanyId == companyId && x.IsActive).FirstOrDefaultAsync();
            return company == null ? false : true;
        }

        public async Task<UserDetailsModel> GetUserDetails(Guid userId)
        {
            var userDetails = new UserDetailsModel();
            var user = await dbContext.UserMaster.Where(x => x.UserId == userId && x.IsActive).FirstOrDefaultAsync();
            var userRole = await dbContext.UserRole.Where(x => x.UserId == userId && x.IsActive).Include(x => x.Role).FirstOrDefaultAsync();
            if (userRole != null && user != null)
            {
                userDetails.UserId = userId;
                userDetails.UserName = user.UserName;
                userDetails.RoleId = userRole.RoleId;
                userDetails.RoleName = userRole?.Role?.RoleName;
                if (userRole?.RoleId == Convert.ToInt32(RoleEnum.Candidate))
                {
                    var candidateProfile = await dbContext.CandidateProfile.Where(x => x.UserId == userId).FirstOrDefaultAsync();
                    userDetails.Name = candidateProfile?.Name;
                    userDetails.EmailId = candidateProfile?.EmailId;
                    userDetails.ProfileId = candidateProfile?.CandidateId;
                }
                else if (userRole?.RoleId == Convert.ToInt32(RoleEnum.Interviewer) || userRole?.RoleId == Convert.ToInt32(RoleEnum.ClientInterviewer))
                {
                    var interviewerProfile = await dbContext.InterviewerProfile.Where(x => x.UserId == userId).FirstOrDefaultAsync();
                    userDetails.Name = interviewerProfile?.Name;
                    userDetails.EmailId = interviewerProfile?.EmailId;
                    userDetails.ProfileId = interviewerProfile?.InterviewerId;
                }
                else if (userRole?.RoleId == Convert.ToInt32(RoleEnum.Vendor) || userRole?.RoleId == Convert.ToInt32(RoleEnum.ClientAdmin) || userRole?.RoleId == Convert.ToInt32(RoleEnum.ClientRecruiter))
                {
                    var companyProfile = await dbContext.CompanyProfile.Where(x => x.UserId == userId).FirstOrDefaultAsync();
                    userDetails.Name = companyProfile?.Name;
                    userDetails.EmailId = companyProfile?.EmailId;
                    userDetails.ProfileId = companyProfile?.CompanyId;
                }
                else
                {
                    userDetails.Name = user.UserName;
                }
            }
            return userDetails;
        }

        public async Task<UserMaster> GetUserById(Guid userId)
        {
            var user = await dbContext.UserMaster.Where(x => x.UserId == userId).FirstOrDefaultAsync();
            return user;
        }

        public async Task<bool> VerifyUserAccount(Guid userId)
        {
            var user = await dbContext.UserMaster.Where(x => x.UserId == userId).FirstOrDefaultAsync();
            if (user != null)
            {
                user.IsVerified = true;
                user.ModifiedDate = DateTime.Now;
                await dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> ChangePassword(ChangePasswordModel model)
        {
            var user = await dbContext.UserMaster.Where(x => x.UserId == model.UserId).FirstOrDefaultAsync();
            if (user != null)
            {
                user.Password = model.NewPassword;
                user.PasswordSalt = model.NewPassword;
                user.ModifiedDate = DateTime.Now;
                await dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
