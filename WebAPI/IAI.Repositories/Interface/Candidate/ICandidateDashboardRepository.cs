using IAI.Models.Models.Candidate.Responses;

namespace IAI.Repositories.Interface.Candidate
{
    public interface ICandidateDashboardRepository
    {
        Task<CandidateDashboardModel> GetCandidateDashboardDetails(Guid candidateId);
    }
}
