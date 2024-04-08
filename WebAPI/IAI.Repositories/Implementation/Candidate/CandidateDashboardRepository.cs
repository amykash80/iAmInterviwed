using IAI.Models.Models.Candidate.Responses;
using IAI.Repositories.Interface.Candidate;
using Microsoft.EntityFrameworkCore;

namespace IAI.Repositories.Implementation.Candidate
{
    public class CandidateDashboardRepository : ICandidateDashboardRepository
    {
        private IAIDBContext dbContext;
        private IAILOBDBContext lobBbContext;
        public CandidateDashboardRepository(IAIDBContext dbContext, IAILOBDBContext lobBbContext)
        {
            this.dbContext = dbContext;
            this.lobBbContext = lobBbContext;
        }

        public async Task<CandidateDashboardModel> GetCandidateDashboardDetails(Guid candidateId)
        {
            var candidateDashboardDetails = new CandidateDashboardModel();
            candidateDashboardDetails.CandidateDashboardProfile = await dbContext.CandidateProfile.Where(x => x.CandidateId == candidateId && x.IsActive)
                .Include(x => x.CandidateDesignation).Include(x => x.PrimarySkill).Include(x => x.City).Include(x => x.Experience).Select(x => new CandidateDashboardProfile()
                {
                    CandidateId = candidateId,
                    CandidateName = x.Name,
                    DesignationName = x.CandidateDesignation.DesignationName,
                    PrimarySkillName = x.PrimarySkill.PrimarySkillName,
                    CityName = x.City.CityName,
                    ExperienceName = x.Experience.ExperienceName
                }).FirstOrDefaultAsync();
            if (candidateDashboardDetails.CandidateDashboardProfile != null)
            {
                candidateDashboardDetails.CandidateDashboardProfile.ResumeTitle = await lobBbContext.CandidateResume.Where(x => x.CandidateId == candidateId).Select(x => x.FileName).FirstOrDefaultAsync();
            }

            candidateDashboardDetails.CandidateDashboardActiveInterview = await dbContext.Interview.Where(x => x.CandidateId == candidateId && x.IsActive
            && !dbContext.RequirementSchedule.Any(p => p.InterviewId == x.InterviewerId)).OrderByDescending(x => x.InterviewDate)
                .Include(x => x.PrimarySkill).Include(x => x.TimeSlot).Include(x => x.Interviewer).Select(x => new CandidateDashboardInterview()
                {
                    CandidateId = candidateId,
                    InterviewUniqueId = x.InterviewUniqueId,
                    InterviewId = x.InterviewId,
                    InterviewDate = x.InterviewDate,
                    TimeSlotName = x.TimeSlot.TimeSlotName,
                    PrimarySkillName = x.PrimarySkill.PrimarySkillName,
                    InterviewerName = x.Interviewer.Name
                }).FirstOrDefaultAsync();
            if (candidateDashboardDetails.CandidateDashboardActiveInterview != null)
            {
                candidateDashboardDetails.CandidateDashboardActiveInterview.SecondarySkillName = await dbContext.InterviewSkill.Where(x => x.InterviewId == candidateDashboardDetails.CandidateDashboardActiveInterview.InterviewId)
                .Include(x => x.SecondarySkill).Select(x => x.SecondarySkill.SecondarySkillName).ToListAsync();
            }

            candidateDashboardDetails.CandidateDashboardCompletedInterview = await dbContext.Interview.Where(x => x.CandidateId == candidateId && x.IsActive && x.IsRated 
            && !dbContext.RequirementSchedule.Any(p => p.InterviewId == x.InterviewerId)).OrderByDescending(x => x.InterviewDate)
                .Include(x => x.PrimarySkill).Include(x => x.TimeSlot).Include(x => x.Interviewer).Select(x => new CandidateDashboardInterview()
                {
                    CandidateId = candidateId,
                    InterviewUniqueId = x.InterviewUniqueId,
                    InterviewId = x.InterviewId,
                    InterviewDate = x.InterviewDate,
                    TimeSlotName = x.TimeSlot.TimeSlotName,
                    PrimarySkillName = x.PrimarySkill.PrimarySkillName,
                    InterviewerName = x.Interviewer.Name
                }).FirstOrDefaultAsync();

            if (candidateDashboardDetails.CandidateDashboardCompletedInterview != null)
            {
                candidateDashboardDetails.CandidateDashboardCompletedInterview.SecondarySkillName = await dbContext.InterviewSkill.Where(x => x.InterviewId == candidateDashboardDetails.CandidateDashboardCompletedInterview.InterviewId)
                .Include(x => x.SecondarySkill).Select(x => x.SecondarySkill.SecondarySkillName).ToListAsync();

                candidateDashboardDetails.CandidateDashboardRating = await dbContext.InterviewRating.Where(x => x.InterviewId == candidateDashboardDetails.CandidateDashboardCompletedInterview.InterviewId && x.IsActive).Include(x => x.Interview)
                    .Select(x => new CandidateDashboardRating()
                    {
                        InterviewId = x.InterviewId,
                        InterviewUniqueId = x.Interview.InterviewUniqueId,
                        RatingId = x.RatingId,
                        TotalRating = Convert.ToDouble(x.TotalRating).ToString(),
                        InterviewerComments = x.InterviewerComments
                    }).FirstOrDefaultAsync();

                candidateDashboardDetails.CandidateDashboardRating.CandidateDashboardRatingDetails = await dbContext.InterviewRatingTechnicalSkillDetail.Where(x => x.RatingId == candidateDashboardDetails.CandidateDashboardRating.RatingId)
                    .Include(x => x.InterviewSkill).Include(x => x.InterviewSkill.SecondarySkill).Select(x => new CandidateDashboardRatingDetails()
                    {
                        RatingId = x.RatingId,
                        SecondarySkillName = x.InterviewSkill.SecondarySkill.SecondarySkillName,
                        Rating = x.Rating,
                        Comments = x.Comments
                    }).ToListAsync();

                candidateDashboardDetails.CandidateDashboardRating.SoftSkillRatingDetails = await dbContext.InterviewRatingSoftSkillDetail.Where(x => x.RatingId == candidateDashboardDetails.CandidateDashboardRating.RatingId)
                    .Include(x => x.SoftSkill).Select(x => new SoftSkillRatingModel()
                    {
                        SoftSkillId = x.SoftSkillId,
                        SoftSkillName = x.SoftSkill.SoftSkillName,
                        Rating = x.Rating,
                        Comments = x.Comments
                    }).ToListAsync();
            }
            
            return candidateDashboardDetails;
        }
    }
}
