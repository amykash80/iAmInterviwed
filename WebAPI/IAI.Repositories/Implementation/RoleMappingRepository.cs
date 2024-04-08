using IAI.Models.Models.Common;
using IAI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Repositories.Implementation
{
    public class RoleMappingRepository : IRoleMappingRepository
    {
        private IAIDBContext dbContext;
        public RoleMappingRepository(IAIDBContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<List<RoleScreenMappingModel>> GetRoleBasedRoutes(Guid userId)
        {
            var roleId = await dbContext.UserRole.Where(x => x.UserId == userId).Select(x => x.RoleId).FirstOrDefaultAsync();
            var roleMapsTest = await dbContext.RoleScreenMapping.Where(x => x.RoleId == roleId).Include(x => x.Role).Include(x => x.Screen).ToListAsync();
            var roleMaps = await dbContext.RoleScreenMapping.Where(x => x.RoleId == roleId).Include(x => x.Role).Include(x => x.Screen).OrderBy(x => x.Screen.ScreenOrder).Select(x => new RoleScreenMappingModel
            {
                RoleId = x.RoleId,
                RoleName = x.Role.RoleName,
                ScreenId = x.ScreenId,
                ScreenName = x.Screen.ScreenName,
                DisplayName = x.Screen.Description,
                RoutePath = x.Screen.RoutePath,
                Icon = x.Screen.Icon,
                MenuLevel = x.Screen.MenuLevel,
                ParentId = x.Screen.ParentId
            }).ToListAsync();
            return roleMaps;
        }
    }
}
