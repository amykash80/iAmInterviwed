using IAI.Models.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Repositories.Interface
{
    public interface IRoleMappingRepository
    {
        Task<List<RoleScreenMappingModel>> GetRoleBasedRoutes(Guid userId);
    }
}
