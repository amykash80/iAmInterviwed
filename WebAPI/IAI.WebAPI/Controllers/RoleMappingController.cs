using IAI.BusinessService.Implementation;
using IAI.BusinessService.Interface;
using IAI.Models.Models.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NLog;

namespace IAI.WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RoleMappingController : ControllerBase
    {
        private static Logger _logger = LogManager.GetLogger("ControllerLogs");
        private readonly IRoleMappingService iRoleMappingService;
        public RoleMappingController(IRoleMappingService iRoleMappingService)
        {
            this.iRoleMappingService = iRoleMappingService;
        }

        [HttpGet]
        [Route("GetRoutes")]
        public async Task<IActionResult> GetRoleBasedRoutes()
        {
            try
            {
                var userId = Guid.Parse(this.User.Claims.First(i => i.Type == "Id").Value);
                var response = await iRoleMappingService.GetRoleBasedRoutes(userId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
