using IAI.Repositories.Interface;
using IAI.Models.Entities;
using Microsoft.EntityFrameworkCore;
using IAI.Models.Models.Responses;
using IAI.Models.Models;
using IAI.Models.Models.Requests;
using IAI.Repositories.Extensions;
using IAI.Models.Models.Common;

namespace IAI.Repositories.Implementation
{
    public class PrimarySkillRepository : IPrimarySkillRepository
    {
        private IAIDBContext dbContext;
        public PrimarySkillRepository(IAIDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<PagedListModel<PrimarySkillModel>> GetAllPrimarySkills(FilterPagingParameters parms)
        {
            var query = dbContext.PrimarySkill.AsNoTracking();
            if (!string.IsNullOrWhiteSpace(parms.SearchText))
            {
                query = query.Where(x => x.PrimarySkillName.Contains(parms.SearchText));
            }
            var paged = await query.Select( x => new PrimarySkillModel()
            {
                PrimarySkillId= x.PrimarySkillId,
                PrimarySkillName = x.PrimarySkillName,
                Description = x.Description
            }).Sort(parms).GetPagedAsync(parms.Page, parms.PageSize);
            //var primaryskills = await dbContext.PrimarySkill.Skip(0).Take(10).ToListAsync();
            return new PagedListModel<PrimarySkillModel>(paged);
        }

        public async Task<PrimarySkill> GetPrimarySkillById(int primarySkillId)
        {
            return await dbContext.PrimarySkill.Where(x => x.PrimarySkillId == primarySkillId).FirstOrDefaultAsync();
        }

        public async Task<PrimarySkill> AddPrimarySkill(PrimarySkill primarySkill)
        {
            if (primarySkill == null)
            {
                throw new ArgumentNullException(nameof(primarySkill));
            }

            dbContext.Set<PrimarySkill>().Add(primarySkill);
            await dbContext.SaveChangesAsync();
            return primarySkill;
        }

        public async Task<PrimarySkill> UpdatePrimarySkill(PrimarySkill primarySkill)
        {
            dbContext.Entry(primarySkill).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return primarySkill;
        }

        public async Task<PrimarySkill> DeletePrimarySkill(int primarySkillId)
        {
            var primarySkill = await dbContext.Set<PrimarySkill>().FindAsync(primarySkillId);
            if (primarySkill == null)
            {
                return primarySkill;
            }
            dbContext.Set<PrimarySkill>().Remove(primarySkill);
            await dbContext.SaveChangesAsync();
            return primarySkill;
        }

        public async Task<List<IdNameModel>> GetAllIdValues()
        {
            return await dbContext.PrimarySkill.OrderBy(x => x.PrimarySkillName).Select (x => new IdNameModel()
            {
                Id = x.PrimarySkillId,
                Name = x.PrimarySkillName
            }).ToListAsync();
        }

        public async Task<IEnumerable<UserRole>> GetUserRoles()
        {
            var userRoles = await dbContext.UserRole.Include(x => x.Role).ToListAsync();
            return userRoles;
        }
    }
}
