using IAI.Models.Models.Candidate.Requests;
using IAI.Models.Models.Candidate.Responses;
using IAI.Models.Models.Common;
using IAI.Repositories.Interface.Candidate;
using Microsoft.EntityFrameworkCore;

namespace IAI.Repositories.Implementation.Candidate
{
    public class CandidateProfileRepository : ICandidateProfileRepository
    {
        private IAIDBContext dbContext;
        private IAILOBDBContext lobBbContext;
        public CandidateProfileRepository(IAIDBContext dbContext, IAILOBDBContext lobBbContext)
        {
            this.dbContext = dbContext;
            this.lobBbContext = lobBbContext;
        }

        public async Task<List<IdNameModel>> LoadCandidateDesignation()
        {
            return await dbContext.CandidateDesignation.Where(x => x.IsActive).Select(x => new IdNameModel()
            {
                Id = x.DesignationId,
                Name = x.DesignationName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<CandidateProfileModel> GetCandidateProfile(Guid candidateId)
        {
            var candidateProfile = new CandidateProfileModel();
            candidateProfile = await dbContext.CandidateProfile.Where(x => x.CandidateId == candidateId).Include(x => x.City).Select(x => new CandidateProfileModel()
            {
                CandidateId = x.CandidateId,
                CountryId = x.City.CountryId,
                CityId = x.CityId,
                ExperienceId = x.ExperienceId,
                DesignationId = x.DesignationId,
                CurrentPay = x.CurrentPay,
                NoticePeriodId = x.NoticePeriodId,
                MobileNumber = x.MobileNumber,
                EmailId = x.EmailId,
                RestrictEmployerToViewProfile = x.RestrictEmployerToViewProfile
            }).FirstOrDefaultAsync();
            if (candidateProfile != null)
            {
                candidateProfile.ResumeTitle = await lobBbContext.CandidateResume.Where(x => x.CandidateId == candidateId).Select(x => x.FileName).FirstOrDefaultAsync();
            }
            return candidateProfile;
        }

        public async Task<bool> UpdateCandidateProfile(CandidateProfileRequest candidateProfileRequest)
        {
            var candidateProfile = await dbContext.CandidateProfile.Where(x => x.CandidateId == candidateProfileRequest.CandidateId).FirstOrDefaultAsync();
            if (candidateProfile != null)
            {
                candidateProfile.CityId = candidateProfileRequest.CityId;
                candidateProfile.ExperienceId = candidateProfileRequest.ExperienceId;
                candidateProfile.DesignationId = candidateProfileRequest.DesignationId;
                candidateProfile.CurrentPay = candidateProfileRequest.CurrentPay;
                candidateProfile.NoticePeriodId = candidateProfileRequest.NoticePeriodId;
                candidateProfile.MobileNumber = candidateProfileRequest.MobileNumber;
                candidateProfile.EmailId = candidateProfileRequest.EmailId;
                candidateProfile.RestrictEmployerToViewProfile = candidateProfileRequest.RestrictEmployerToViewProfile;
                await dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
