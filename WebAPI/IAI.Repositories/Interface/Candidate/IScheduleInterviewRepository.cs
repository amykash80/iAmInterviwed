
using IAI.Models.Models.Candidate.Requests;
using IAI.Models.Models.Candidate.Responses;

namespace IAI.Repositories.Interface.Candidate
{
    public interface IScheduleInterviewRepository
    {
        Task<Guid?> ScheduleInterview(ScheduleInterviewRequest interviewRequest, Guid defaultInterviewerId);
        Task<bool> CheckCandidateHasActiveSchedule(Guid candidateId);
        Task<bool> InActiveCandidateOldSchedules(Guid candidateId);
    }
}
