using IAI.BusinessService.Interface.Candidate;
using IAI.Models.Entities;
using IAI.Models.Models.Candidate.Requests;
using IAI.Models.Models.Candidate.Responses;
using IAI.Models.Models.Common;
using IAI.Models.Models.Responses;
using IAI.Repositories.Interface.Candidate;

namespace IAI.BusinessService.Implementation.Candidate
{
    public class CandidateProfileService : ICandidateProfileService
    {
        private readonly ICandidateProfileRepository iCandidateProfileRepository;
        public CandidateProfileService(ICandidateProfileRepository iCandidateProfileRepository)
        {
            this.iCandidateProfileRepository = iCandidateProfileRepository;
        }

        public async Task<BaseResponseList<IdNameModel>> LoadCandidateDesignation()
        {
            List<string> errorMessages = new List<string>();
            var designation = new List<IdNameModel>();
            try
            {
                designation = await iCandidateProfileRepository.LoadCandidateDesignation();
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while loading data.");
            }
            return new BaseResponseList<IdNameModel>(designation, errorMessages, new List<string>(), new List<string>());
        }

        public async Task<BaseResponse<CandidateProfileModel>> GetCandidateProfile(Guid candidateId)
        {
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            var candidateProfile = new CandidateProfileModel();
            try
            {
                candidateProfile = await iCandidateProfileRepository.GetCandidateProfile(candidateId);
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while processing request. " + ex.Message);
            }
            return new BaseResponse<CandidateProfileModel>(candidateProfile, errorMessages, new List<string>(), infoMessages);
        }

        public async Task<BaseResponse<bool>> UpdateCandidateProfile(CandidateProfileRequest candidateProfileRequest)
        {
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            var candidateProfileSaved = false;
            try
            {
                candidateProfileSaved = await iCandidateProfileRepository.UpdateCandidateProfile(candidateProfileRequest);
                if(candidateProfileSaved)
                {
                    infoMessages.Add("Profile Updated Successfully.");
                }
                else
                {
                    errorMessages.Add("Candidate Doesn't exist. Please check and try again.");
                }
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while processing request. " + ex.Message);
            }
            return new BaseResponse<bool>(candidateProfileSaved, errorMessages, new List<string>(), infoMessages);
        }
    }
}
