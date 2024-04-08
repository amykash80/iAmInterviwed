using IAI.Models.Models.Candidate.Responses;
using IAI.Models.Models.Responses;

namespace IAI.BusinessService.Interface.Candidate
{
    public interface ICandidateDashboardService
    {
        Task<BaseResponse<CandidateDashboardModel>> GetCandidateDashboardDetails(Guid candidateId);
    }
}
