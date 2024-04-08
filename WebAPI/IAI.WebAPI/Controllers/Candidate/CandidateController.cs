using IAI.BusinessService.Interface.Candidate;
using IAI.Models.Models.Candidate.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NLog;

namespace IAI.WebAPI.Controllers.Candidate
{
    [Authorize(Roles = "Candidate")]
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private static Logger _logger = LogManager.GetLogger("ControllerLogs");
        private readonly ICandidateProfileService iCandidateProfileService;
        private readonly ICandidateDashboardService iCandidateDashboardService;
        private readonly IScheduleInterviewService iScheduleInterviewService;
        public CandidateController(ICandidateProfileService iCandidateProfileService, ICandidateDashboardService iCandidateDashboardService, IScheduleInterviewService iScheduleInterviewService)
        {
            this.iCandidateProfileService = iCandidateProfileService;
            this.iCandidateDashboardService = iCandidateDashboardService;
            this.iScheduleInterviewService = iScheduleInterviewService;
        }

        [HttpGet]
        [Route("CandidateDesignation")]
        public async Task<IActionResult> LoadCandidateDesignation()
        {
            try
            {
                var response = await iCandidateProfileService.LoadCandidateDesignation();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("CandidateProfile/{candidateId}")]
        public async Task<IActionResult> GetCandidateProfile(Guid candidateId)
        {
            try
            {
                var response = await iCandidateProfileService.GetCandidateProfile(candidateId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("SaveCandidateProfile")]
        public async Task<IActionResult> UpdateCandidateProfile(CandidateProfileRequest candidateProfileRequest)
        {
            try
            {
                var response = await iCandidateProfileService.UpdateCandidateProfile(candidateProfileRequest);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("ScheduleInterview")]
        public async Task<IActionResult> ScheduleInterview(ScheduleInterviewRequest interviewRequest)
        {
            try
            {
                var response = await iScheduleInterviewService.ScheduleInterview(interviewRequest);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("CandidateDashboardDetails/{candidateId}")]
        public async Task<IActionResult> GetCandidateDashboardDetails(Guid candidateId)
        {
            try
            {
                var response = await iCandidateDashboardService.GetCandidateDashboardDetails(candidateId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpGet]
        //[Route("InterviewRatingDetails/{interviewId}")]
        //public async Task<IActionResult> GetInterviewRatingDetails(Guid interviewId)
        //{
        //    try
        //    {
        //        var response = await iInterviewerDashboardService.GetInterviewRatingDetails(interviewId);
        //        return Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
