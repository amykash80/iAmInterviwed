using IAI.BusinessService.Interface;
using IAI.Models.Models;
using IAI.Models.Entities;
using IAI.Repositories.Interface;
using IAI.Models.Models.Responses;
using IAI.Models.Models.Requests;
using IAI.Models.Models.Common;

namespace IAI.BusinessService.Implementation
{
    public class PrimarySkillService : IPrimarySkillService
    {
        private readonly IPrimarySkillRepository iPrimarySkillRepository;
        public PrimarySkillService(IPrimarySkillRepository iPrimarySkillRepository)
        {
            this.iPrimarySkillRepository = iPrimarySkillRepository;
        }

        public async Task<PagedListModel<PrimarySkillModel>> GetAllPrimarySkills(FilterPagingParameters parms) 
        {
            //var mailsent = configuration.SendEmail("praneeth.pn@gmail.com", "Test mail from CoreAPP", "Test Mail");
            var primaryskills = await iPrimarySkillRepository.GetAllPrimarySkills(parms);
            return primaryskills;
        }
        public async Task<PrimarySkillModel> GetPrimarySkillById(int primarySkillId)
        {
            var primarySkill = await iPrimarySkillRepository.GetPrimarySkillById(primarySkillId);            
            var primarySkillModel = Mapping.Mapper.Map<PrimarySkill, PrimarySkillModel>(primarySkill);
            return primarySkillModel;
        }
        public async Task<PrimarySkillModel> AddPrimarySkill(PrimarySkillModel primaryskillModel)
        {
            var primarySkill = Mapping.Mapper.Map<PrimarySkillModel, PrimarySkill>(primaryskillModel);
            await iPrimarySkillRepository.AddPrimarySkill(primarySkill);
            return primaryskillModel;
        }
        public async Task<PrimarySkillModel> UpdatePrimarySkill(PrimarySkillModel primarySkillModel)
        {
            var primarySkill = Mapping.Mapper.Map<PrimarySkillModel, PrimarySkill>(primarySkillModel);
            await iPrimarySkillRepository.UpdatePrimarySkill(primarySkill);
            return primarySkillModel;
        }
        public async Task<PrimarySkillModel> DeletePrimarySkill(int primarySkillId)
        {
            var primarySkill = await iPrimarySkillRepository.DeletePrimarySkill(primarySkillId);
            var primarySkillModel = Mapping.Mapper.Map<PrimarySkill, PrimarySkillModel>(primarySkill);
            return primarySkillModel;
        }

        public async Task<List<IdNameModel>> GetAllIdValues()
        {
            return await iPrimarySkillRepository.GetAllIdValues();
        }

        public async Task<IEnumerable<UserRoleModel>> GetUserRoles()
        {
            var userRole = await iPrimarySkillRepository.GetUserRoles();
            var userRoleModels = Mapping.Mapper.Map<IEnumerable<UserRole>, IEnumerable<UserRoleModel>>(userRole);
            return userRoleModels;
        }
    }
}
