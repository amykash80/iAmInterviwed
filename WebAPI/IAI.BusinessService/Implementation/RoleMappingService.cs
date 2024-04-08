using IAI.BusinessService.Interface;
using IAI.Models.Models;
using IAI.Models.Models.Common;
using IAI.Models.Models.Responses;
using IAI.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.BusinessService.Implementation
{
    public class RoleMappingService : IRoleMappingService
    {
        private readonly IRoleMappingRepository iRoleMappingRepository;
        public RoleMappingService(IRoleMappingRepository iRoleMappingRepository)
        {
            this.iRoleMappingRepository = iRoleMappingRepository;
        }

        public async Task<BaseResponse<List<RoleScreenMappingModel>>> GetRoleBasedRoutes(Guid userId)
        {
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            var roleMapping = new List<RoleScreenMappingModel>();
            try
            {
                roleMapping = await iRoleMappingRepository.GetRoleBasedRoutes(userId);
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while uploading File. " + ex.Message);
            }
            return new BaseResponse<List<RoleScreenMappingModel>>(roleMapping, errorMessages, new List<string>(), infoMessages);
        }
    }
}
