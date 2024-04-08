using Microsoft.AspNetCore.Mvc;
using IAI.BusinessService.Interface;
using IAI.Models.Models;
using NLog;
using Microsoft.AspNetCore.Authorization;
using IAI.Models.Models.Responses;
using IAI.Models.Models.Requests;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IAI.WebAPI.Controllers
{
    [Authorize(Roles = "Administrator")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PrimarySkillController : ControllerBase
    {
        private static Logger _logger = LogManager.GetLogger("ControllerLogs");
        private readonly IPrimarySkillService iPrimarySkillService;
        public PrimarySkillController(IPrimarySkillService iPrimarySkillService)
        {
            this.iPrimarySkillService = iPrimarySkillService;
        }
        // GET: api/<PrimarySkillController>
        [HttpPost]
        public async Task<PagedListModel<PrimarySkillModel>> GetPrimarySkills([FromBody] FilterPagingParameters parms)
        {
            _logger.Info("Primary skills called");
            return await iPrimarySkillService.GetAllPrimarySkills(parms);
        }

        // GET api/<PrimarySkillController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PrimarySkillModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPrimarySkill(int id)
        {
            _logger.Info("Get By Id -" + id);
            var primaryskill = await iPrimarySkillService.GetPrimarySkillById(id);
            if (primaryskill == null)
            {
                return NotFound();
            }
            return Ok(primaryskill);
        }

        // POST api/<PrimarySkillController>
        [HttpPost]
        public async Task<IActionResult> PostPrimarySKill([FromBody] PrimarySkillModel primarySkill)
        {
            try
            {
                await iPrimarySkillService.AddPrimarySkill(primarySkill);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<PrimarySkillController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrimarySkill(int id, [FromBody] PrimarySkillModel primarySkill)
        {
            if (id != primarySkill.PrimarySkillId)
            {
                return BadRequest();
            }
            await iPrimarySkillService.UpdatePrimarySkill(primarySkill);
            return Ok();
        }

        // DELETE api/<PrimarySkillController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrimarySkill(int id)
        {
            var primaryskill = await iPrimarySkillService.DeletePrimarySkill(id);
            if (primaryskill == null)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
