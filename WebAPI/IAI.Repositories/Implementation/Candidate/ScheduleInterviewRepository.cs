using IAI.Models.Entities;
using IAI.Models.Enums;
using IAI.Models.Models.Candidate.Requests;
using IAI.Repositories.Interface.Candidate;
using Microsoft.EntityFrameworkCore;

namespace IAI.Repositories.Implementation.Candidate
{
    public class ScheduleInterviewRepository : IScheduleInterviewRepository
    {
        private IAIDBContext dbContext;
        public ScheduleInterviewRepository(IAIDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Guid?> ScheduleInterview(ScheduleInterviewRequest interviewRequest, Guid defaultInterviewerId)
        {
            var inteviewerId = await FindInterviewer(interviewRequest, defaultInterviewerId);
            var newInterview = new Interview()
            {
                InterviewUniqueId = Guid.NewGuid().ToString("n").Substring(0, 10),
                InterviewDate = interviewRequest.InterviewDate,
                TimeSlotId = interviewRequest.TimeSlotId,
                InterviewTypeId = interviewRequest.InterviewTypeId,
                CandidateId = interviewRequest.CandidateId,
                InterviewerId = inteviewerId,
                PrimarySkillId = interviewRequest.PrimarySkillId,
                IsValid = true,
                StatusId = (int)StatusEnum.InterviewScheduled,
                IsBlocked = false,
                IsRated = false,
                IsActive = true,
                CreatedBy = interviewRequest.CandidateId,
                CreatedDate = DateTime.Now,
                ModifiedBy = interviewRequest.CandidateId,
                ModifiedDate = DateTime.Now
            };
            dbContext.Interview.Add(newInterview);
            foreach (var (skill, index) in interviewRequest.SecondarySkills.Select((x, i) => (x, i)))
            {
                var newInterviewSkill = new InterviewSkill()
                {
                    InterviewId = newInterview.InterviewId,
                    SecondarySkillId = skill,
                    SecondarySkillNumber = index + 1,
                    IsCommentsRequired = index < (int)IAIEnums.CommentesRequired ? true : false,
                    IsActive = true,
                    CreatedBy = interviewRequest.CandidateId,
                    CreatedDate = DateTime.Now,
                    ModifiedBy = interviewRequest.CandidateId,
                    ModifiedDate = DateTime.Now
                };
                dbContext.InterviewSkill.Add(newInterviewSkill);
            }

            await dbContext.SaveChangesAsync();
            return inteviewerId;
        }

        public async Task<bool> CheckCandidateHasActiveSchedule(Guid candidateId)
        {
            var schedule = await dbContext.Interview.Where(x => x.CandidateId == candidateId && x.IsValid && !x.IsRated).FirstOrDefaultAsync();
            if (schedule == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public async Task<bool> InActiveCandidateOldSchedules(Guid candidateId)
        {
            var schedules = await dbContext.Interview.Where(x => x.CandidateId == candidateId).ToListAsync();
            foreach (var schedule in schedules)
            {
                schedule.IsValid = false;
            }
            await dbContext.SaveChangesAsync();
            return true;
        }

        private async Task<Guid> FindInterviewer(ScheduleInterviewRequest interviewRequest, Guid defaultInterviewerId)
        {
            var interviewerIds = new List<Guid>();
            interviewerIds = await (from i in dbContext.InterviewerSchedule
                                    join ip in dbContext.InterviewerProfile on i.InterviewerId equals ip.InterviewerId
                                    join ipd in dbContext.InterviewerProfileDetail on ip.InterviewerId equals ipd.InterviewerId
                                    where i.Date.Date == interviewRequest.InterviewDate.Date && i.TimeSlotId == interviewRequest.TimeSlotId && i.IsActive && !i.IsBlocked
                                    && ipd.PrimarySkillId == interviewRequest.PrimarySkillId
                                    select ip.InterviewerId).Distinct().ToListAsync();
            if (interviewerIds.Count > 0)
            {
                Random random = new Random();
                int randomPosition = random.Next(interviewerIds.Count());
                return interviewerIds[randomPosition];
            }
            else
            {
                return defaultInterviewerId;
            }
        }
    }
}
