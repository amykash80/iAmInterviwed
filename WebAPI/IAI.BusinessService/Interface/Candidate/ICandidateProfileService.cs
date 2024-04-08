using IAI.Models.Models.Candidate.Requests;
using IAI.Models.Models.Candidate.Responses;
using IAI.Models.Models.Common;
using IAI.Models.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.BusinessService.Interface.Candidate
{
    public interface ICandidateProfileService
    {
        Task<BaseResponseList<IdNameModel>> LoadCandidateDesignation();
        Task<BaseResponse<CandidateProfileModel>> GetCandidateProfile(Guid candidateId);
        Task<BaseResponse<bool>> UpdateCandidateProfile(CandidateProfileRequest candidateProfileRequest);
    }
}
