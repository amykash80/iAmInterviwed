using IAI.BusinessService.Interface;
using IAI.BusinessService.Interface.Candidate;
using IAI.Models.Models.Candidate.Requests;
using IAI.Models.Models.Responses;
using IAI.Repositories.Interface;
using IAI.Repositories.Interface.Candidate;
using Microsoft.Extensions.Configuration;

namespace IAI.BusinessService.Implementation.Candidate
{
    public class ScheduleInterviewService : IScheduleInterviewService
    {
        private readonly IScheduleInterviewRepository iScheduleInterviewRepository;
        private readonly IConfiguration configuration;
        private readonly IEmailHelperService iEmailHelperService;
        private readonly IAccountRepository iAccountRepository;
        private readonly IMasterDataRepository iMasterDataRepository;
        public ScheduleInterviewService(IScheduleInterviewRepository iScheduleInterviewRepository, IConfiguration configuration, IEmailHelperService iEmailHelperService, 
            IAccountRepository iAccountRepository, IMasterDataRepository iMasterDataRepository)
        {
            this.iScheduleInterviewRepository = iScheduleInterviewRepository;
            this.configuration = configuration;
            this.iEmailHelperService = iEmailHelperService;
            this.iAccountRepository = iAccountRepository;
            this.iMasterDataRepository = iMasterDataRepository;
        }

        public async Task<BaseResponse<bool>> ScheduleInterview(ScheduleInterviewRequest interviewRequest)
        {
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            var interviewScheduled = false;
            try
            {
                var isScheduleExist = await iScheduleInterviewRepository.CheckCandidateHasActiveSchedule(interviewRequest.CandidateId);
                if (isScheduleExist)
                {
                    errorMessages.Add("Candidate has an active Schedule. Please wait untill the active schedule is rated before scheduling another interview.");
                }
                else
                {
                    var updateOldInterviews = await iScheduleInterviewRepository.InActiveCandidateOldSchedules(interviewRequest.CandidateId);
                    var defaultInterviewer = Guid.Parse(configuration.GetValue<string>("DefaultParams:DefaultInterviewer"));
                    var interviewer = await iScheduleInterviewRepository.ScheduleInterview(interviewRequest, defaultInterviewer);
                    if (interviewer != null)
                    {
                        //if(interviewer != defaultInterviewer)
                        //{
                            var candidate = await iAccountRepository.GetUserDetails(interviewRequest.CandidateId);
                            var interviewerDetails = await iAccountRepository.GetUserDetails((Guid)interviewer);
                            var timeslot = await iMasterDataRepository.GetTimeslotById(interviewRequest.TimeSlotId);
                            var primarySkill = await iMasterDataRepository.GetPrimarySkillNameById(interviewRequest.PrimarySkillId);
                            var secondarySkill = await iMasterDataRepository.GetSecondarySkillNameById(interviewRequest.SecondarySkills);
                            var emailSent = await iEmailHelperService.SendInterviewScheduleCandidateEmail(candidate.EmailId, candidate.Name, interviewerDetails.Name, interviewRequest.InterviewDate.ToString("MMM-dd-yyyy") + " - " + timeslot, primarySkill + ", " + secondarySkill);
                            var emailSentInterviewer = await iEmailHelperService.SendInterviewScheduleInterviewerEmail(interviewerDetails.EmailId, candidate.Name, interviewerDetails.Name, interviewRequest.InterviewDate.ToString("MMM-dd-yyyy") + " - " + timeslot, primarySkill + ", " + secondarySkill);
                        //}                        
                        infoMessages.Add("Interview has been scheduled Successfully.");
                        interviewScheduled = true;
                    }
                    else
                    {
                        errorMessages.Add("Unable to Schedule an Interview. Please try again");
                    }
                }                
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while processing request. " + ex.Message);
            }
            return new BaseResponse<bool>(interviewScheduled, errorMessages, new List<string>(), infoMessages);
        }
    }
}
