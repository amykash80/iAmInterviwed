using IAI.Models.Entities;
using IAI.Models.Models.Responses;
using IAI.Models.Models;
using IAI.Models.Models.Requests;
using IAI.Models.Models.Common;

namespace IAI.Repositories.Interface
{
    public interface IPrimarySkillRepository
    {
        Task<PagedListModel<PrimarySkillModel>> GetAllPrimarySkills(FilterPagingParameters parms);
        Task<PrimarySkill> GetPrimarySkillById(int clientId);
        Task<PrimarySkill> AddPrimarySkill(PrimarySkill client);
        Task<PrimarySkill> UpdatePrimarySkill(PrimarySkill client);
        Task<PrimarySkill> DeletePrimarySkill(int clietnId);
        Task<List<IdNameModel>> GetAllIdValues();
        Task<IEnumerable<UserRole>> GetUserRoles();
    }
}
