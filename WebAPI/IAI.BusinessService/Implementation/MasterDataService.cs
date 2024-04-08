using IAI.BusinessService.Interface;
using IAI.Models.Models.Common;
using IAI.Models.Models.Responses;
using IAI.Repositories.Interface;

namespace IAI.BusinessService.Implementation
{
    public class MasterDataService : IMasterDataService
    {
        private readonly IMasterDataRepository iMasterDataRepository;
        public MasterDataService(IMasterDataRepository iMasterDataRepository)
        {
            this.iMasterDataRepository = iMasterDataRepository;
        }
        public async Task<BaseResponseList<IdNameModel>> LoadPrimarySkills()
        {
            List<string> errorMessages = new List<string>();
            var primarySkills = new List<IdNameModel>();
            try
            {
                primarySkills = await iMasterDataRepository.LoadPrimarySkills();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(primarySkills, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadSecondarySkills(int primarySkillId)
        {
            List<string> errorMessages = new List<string>();
            var secondarySkills = new List<IdNameModel>();
            try
            {
                secondarySkills = await iMasterDataRepository.LoadSecondarySkills(primarySkillId);
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(secondarySkills, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadSoftSkills()
        {
            List<string> errorMessages = new List<string>();
            var softSkills = new List<IdNameModel>();
            try
            {
                softSkills = await iMasterDataRepository.LoadSoftSkills();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(softSkills, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadRoles()
        {
            List<string> errorMessages = new List<string>();
            var roles = new List<IdNameModel>();
            try
            {
                roles = await iMasterDataRepository.LoadRoles();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(roles, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadCountries()
        {
            List<string> errorMessages = new List<string>();
            var countries = new List<IdNameModel>();
            try
            {
                countries = await iMasterDataRepository.LoadCountries();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(countries, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadCities(int countryId)
        {
            List<string> errorMessages = new List<string>();
            var cities = new List<IdNameModel>();
            try
            {
                cities = await iMasterDataRepository.LoadCities(countryId);
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(cities, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadDesignation(Guid companyId)
        {
            List<string> errorMessages = new List<string>();
            var designation = new List<IdNameModel>();
            try
            {
                designation = await iMasterDataRepository.LoadDesignation(companyId);
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(designation, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadDomains()
        {
            List<string> errorMessages = new List<string>();
            var domains = new List<IdNameModel>();
            try
            {
                domains = await iMasterDataRepository.LoadDomains();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(domains, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadExperiences()
        {
            List<string> errorMessages = new List<string>();
            var experience = new List<IdNameModel>();
            try
            {
                experience = await iMasterDataRepository.LoadExperiences();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(experience, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadInterviewTypes()
        {
            List<string> errorMessages = new List<string>();
            var interviewTypes = new List<IdNameModel>();
            try
            {
                interviewTypes = await iMasterDataRepository.LoadInterviewTypes();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(interviewTypes, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadJobTypes()
        {
            List<string> errorMessages = new List<string>();
            var jobTypes = new List<IdNameModel>();
            try
            {
                jobTypes = await iMasterDataRepository.LoadJobTypes();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(jobTypes, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadNoticePeriod()
        {
            List<string> errorMessages = new List<string>();
            var noticePeriod = new List<IdNameModel>();
            try
            {
                noticePeriod = await iMasterDataRepository.LoadNoticePeriod();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(noticePeriod, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadScreens()
        {
            List<string> errorMessages = new List<string>();
            var screens = new List<IdNameModel>();
            try
            {
                screens = await iMasterDataRepository.LoadScreens();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(screens, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadStatus()
        {
            List<string> errorMessages = new List<string>();
            var status = new List<IdNameModel>();
            try
            {
                status = await iMasterDataRepository.LoadStatus();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(status, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadTimeSlots()
        {
            List<string> errorMessages = new List<string>();
            var timeSlots = new List<IdNameModel>();
            try
            {
                timeSlots = await iMasterDataRepository.LoadTimeSlots();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(timeSlots, errorMessages, new List<string>(), new List<string>());
        }
        public async Task<BaseResponseList<IdNameModel>> LoadZoomAccounts()
        {
            List<string> errorMessages = new List<string>();
            var zoomAccounts = new List<IdNameModel>();
            try
            {
                zoomAccounts = await iMasterDataRepository.LoadZoomAccounts();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(zoomAccounts, errorMessages, new List<string>(), new List<string>());
        }

        public async Task<BaseResponseList<IdNameModel>> LoadInterviewRounds()
        {
            List<string> errorMessages = new List<string>();
            var rounds = new List<IdNameModel>();
            try
            {
                rounds = await iMasterDataRepository.LoadInterviewRounds();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(rounds, errorMessages, new List<string>(), new List<string>());
        }
    }
}
