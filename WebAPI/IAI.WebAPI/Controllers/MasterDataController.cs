using IAI.BusinessService.Implementation;
using IAI.BusinessService.Interface;
using IAI.Models.Models.Common;
using IAI.Models.Models.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NLog;

namespace IAI.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterDataController : ControllerBase
    {
        private static Logger _logger = LogManager.GetLogger("ControllerLogs");
        private readonly IMasterDataService iMasterDataService;

        public MasterDataController(IMasterDataService iMasterDataService)
        {
            this.iMasterDataService = iMasterDataService;
        }

        [HttpGet]
        [Route("GetPrimarySkills")]
        public async Task<IActionResult> LoadPrimarySkills()
        {
            try
            {
                var response = await iMasterDataService.LoadPrimarySkills();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetSecondarySkills/{primarySkillId}")]
        public async Task<IActionResult> LoadSecondarySkills(int primarySkillId)
        {
            try
            {
                var response = await iMasterDataService.LoadSecondarySkills(primarySkillId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetSoftSkills")]
        public async Task<IActionResult> LoadSoftSkills()
        {
            try
            {
                var response = await iMasterDataService.LoadSoftSkills();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetRoles")]
        public async Task<IActionResult> LoadRoles()
        {
            try
            {
                var response = await iMasterDataService.LoadRoles();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetCountries")]
        public async Task<IActionResult> LoadCountries()
        {
            try
            {
                var response = await iMasterDataService.LoadCountries();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetCities/{countryId}")]
        public async Task<IActionResult> LoadCities(int countryId)
        {
            try
            {
                var response = await iMasterDataService.LoadCities(countryId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetDesignation/{companyId}")]
        public async Task<IActionResult> LoadDesignation(Guid companyId)
        {
            try
            {
                var response = await iMasterDataService.LoadDesignation(companyId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetDomains")]
        public async Task<IActionResult> LoadDomains()
        {
            try
            {
                var response = await iMasterDataService.LoadDomains();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetExperiences")]
        public async Task<IActionResult> LoadExperiences()
        {
            try
            {
                var response = await iMasterDataService.LoadExperiences();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetInterviewTypes")]
        public async Task<IActionResult> LoadInterviewTypes()
        {
            try
            {
                var response = await iMasterDataService.LoadInterviewTypes();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetJobTypes")]
        public async Task<IActionResult> LoadJobTypes()
        {
            try
            {
                var response = await iMasterDataService.LoadJobTypes();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetNoticePeriod")]
        public async Task<IActionResult> LoadNoticePeriod()
        {
            try
            {
                var response = await iMasterDataService.LoadNoticePeriod();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetScreens")]
        public async Task<IActionResult> LoadScreens()
        {
            try
            {
                var response = await iMasterDataService.LoadScreens();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetStatus")]
        public async Task<IActionResult> LoadStatus()
        {
            try
            {
                var response = await iMasterDataService.LoadStatus();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetTimeSlots")]
        public async Task<IActionResult> LoadTimeSlots()
        {
            try
            {
                var response = await iMasterDataService.LoadTimeSlots();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetZoomAccounts")]
        public async Task<IActionResult> LoadZoomAccounts()
        {
            try
            {
                var response = await iMasterDataService.LoadZoomAccounts();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetInterviewRounds")]
        public async Task<IActionResult> LoadInterviewRounds()
        {
            try
            {
                var response = await iMasterDataService.LoadInterviewRounds();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
