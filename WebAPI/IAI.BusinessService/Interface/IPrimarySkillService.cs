using IAI.Models.Models;
using IAI.Models.Models.Common;
using IAI.Models.Models.Requests;
using IAI.Models.Models.Responses;

namespace IAI.BusinessService.Interface
{
    public interface IPrimarySkillService
    {
        Task<PagedListModel<PrimarySkillModel>> GetAllPrimarySkills(FilterPagingParameters parms);
        Task<PrimarySkillModel> GetPrimarySkillById(int clientId);
        Task<PrimarySkillModel> AddPrimarySkill(PrimarySkillModel client);
        Task<PrimarySkillModel> UpdatePrimarySkill(PrimarySkillModel client);
        Task<PrimarySkillModel> DeletePrimarySkill(int clietnId);
        Task<List<IdNameModel>> GetAllIdValues();
        Task<IEnumerable<UserRoleModel>> GetUserRoles();
    }
}
