using IAI.Models.Models.Common;
using IAI.Models.Models.Responses;

namespace IAI.BusinessService.Interface
{
    public interface IMasterDataService
    {
        Task<BaseResponseList<IdNameModel>> LoadPrimarySkills();
        Task<BaseResponseList<IdNameModel>> LoadSecondarySkills(int primarySkillId);
        Task<BaseResponseList<IdNameModel>> LoadSoftSkills();
        Task<BaseResponseList<IdNameModel>> LoadRoles();
        Task<BaseResponseList<IdNameModel>> LoadCountries();
        Task<BaseResponseList<IdNameModel>> LoadCities(int countryId);
        Task<BaseResponseList<IdNameModel>> LoadDesignation(Guid companyId);
        Task<BaseResponseList<IdNameModel>> LoadDomains();
        Task<BaseResponseList<IdNameModel>> LoadExperiences();
        Task<BaseResponseList<IdNameModel>> LoadInterviewTypes();
        Task<BaseResponseList<IdNameModel>> LoadJobTypes();
        Task<BaseResponseList<IdNameModel>> LoadNoticePeriod();
        Task<BaseResponseList<IdNameModel>> LoadScreens();
        Task<BaseResponseList<IdNameModel>> LoadStatus();
        Task<BaseResponseList<IdNameModel>> LoadTimeSlots();
        Task<BaseResponseList<IdNameModel>> LoadZoomAccounts();
        Task<BaseResponseList<IdNameModel>> LoadInterviewRounds();
    }
}
