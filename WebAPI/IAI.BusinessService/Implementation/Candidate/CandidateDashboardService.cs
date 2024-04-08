using IAI.BusinessService.Interface.Candidate;
using IAI.Models.Models.Candidate.Responses;
using IAI.Models.Models.Responses;
using IAI.Repositories.Implementation.Candidate;
using IAI.Repositories.Interface.Candidate;

namespace IAI.BusinessService.Implementation.Candidate
{
    public class CandidateDashboardService : ICandidateDashboardService
    {
        private readonly ICandidateDashboardRepository iCandidateDashboardRepository;
        public CandidateDashboardService(ICandidateDashboardRepository iCandidateDashboardRepository)
        {
            this.iCandidateDashboardRepository = iCandidateDashboardRepository;
        }

        public async Task<BaseResponse<CandidateDashboardModel>> GetCandidateDashboardDetails(Guid candidateId)
        {
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            var candidateDashboardDetails = new CandidateDashboardModel();
            try
            {
                candidateDashboardDetails = await iCandidateDashboardRepository.GetCandidateDashboardDetails(candidateId);
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while processing request. " + ex.Message);
            }
            return new BaseResponse<CandidateDashboardModel>(candidateDashboardDetails, errorMessages, new List<string>(), infoMessages);
        }
    }
}
