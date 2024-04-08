using IAI.Models.Models.Candidate.Requests;
using IAI.Models.Models.Candidate.Responses;
using IAI.Models.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Repositories.Interface.Candidate
{
    public interface ICandidateProfileRepository
    {
        Task<List<IdNameModel>> LoadCandidateDesignation();
        Task<CandidateProfileModel> GetCandidateProfile(Guid candidateId);
        Task<bool> UpdateCandidateProfile(CandidateProfileRequest candidateProfileRequest);
    }
}
