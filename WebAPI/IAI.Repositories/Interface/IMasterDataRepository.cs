using IAI.Models.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Repositories.Interface
{
    public interface IMasterDataRepository
    {
        Task<List<IdNameModel>> LoadPrimarySkills();
        Task<List<IdNameModel>> LoadSecondarySkills(int primarySkillId);
        Task<List<IdNameModel>> LoadSoftSkills();
        Task<List<IdNameModel>> LoadRoles();
        Task<List<IdNameModel>> LoadCountries();
        Task<List<IdNameModel>> LoadCities(int countryId);
        Task<List<IdNameModel>> LoadDesignation(Guid companyId);
        Task<List<IdNameModel>> LoadDomains();
        Task<List<IdNameModel>> LoadExperiences();
        Task<List<IdNameModel>> LoadInterviewTypes();
        Task<List<IdNameModel>> LoadJobTypes();
        Task<List<IdNameModel>> LoadNoticePeriod();
        Task<List<IdNameModel>> LoadScreens();
        Task<List<IdNameModel>> LoadStatus();
        Task<List<IdNameModel>> LoadTimeSlots();
        Task<List<IdNameModel>> LoadZoomAccounts();
        Task<string> GetTimeslotById(int id);
        Task<string> GetPrimarySkillNameById(int id);
        Task<string> GetSecondarySkillNameById(List<int> id);
        Task<List<IdNameModel>> LoadInterviewRounds();
    }
}
