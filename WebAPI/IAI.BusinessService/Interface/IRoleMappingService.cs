using IAI.Models.Models;
using IAI.Models.Models.Common;
using IAI.Models.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.BusinessService.Interface
{
    public interface IRoleMappingService
    {
        Task<BaseResponse<List<RoleScreenMappingModel>>> GetRoleBasedRoutes(Guid userId);
    }
}
