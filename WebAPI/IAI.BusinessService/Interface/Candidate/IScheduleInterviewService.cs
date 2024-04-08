using IAI.Models.Models.Candidate.Requests;
using IAI.Models.Models.Responses;

namespace IAI.BusinessService.Interface.Candidate
{
    public interface IScheduleInterviewService
    {
        Task<BaseResponse<bool>> ScheduleInterview(ScheduleInterviewRequest interviewRequest);
    }
}
