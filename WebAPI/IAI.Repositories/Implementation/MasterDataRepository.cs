using IAI.Models.Models.Common;
using IAI.Repositories.Extensions;
using IAI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Repositories.Implementation
{
    public class MasterDataRepository : IMasterDataRepository
    {
        private IAIDBContext dbContext;

        public MasterDataRepository(IAIDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<IdNameModel>> LoadPrimarySkills()
        {
            return await dbContext.PrimarySkill.Where(x => x.IsActive).Select(x => new IdNameModel()
            {
                Id = x.PrimarySkillId,
                Name = x.PrimarySkillName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadSecondarySkills(int primarySkillId)
        {
            return await dbContext.SecondarySkill.Where(x => x.PrimarySkillId == primarySkillId && x.IsActive).Select(x => new IdNameModel()
            {
                Id = x.SecondarySkillId,
                Name = x.SecondarySkillName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadSoftSkills()
        {
            return await dbContext.SoftSkill.Where(x => x.IsActive).Select(x => new IdNameModel()
            {
                Id = x.SoftSkillId,
                Name = x.SoftSkillName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadRoles()
        {
            return await dbContext.Role.Where(x => x.IsActive).Select(x => new IdNameModel()
            {
                Id = x.RoleId,
                Name = x.RoleName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadCountries()
        {
            return await dbContext.Country.Where(x => x.IsActive).Select(x => new IdNameModel()
            {
                Id = x.CountryId,
                Name = x.CountryName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadCities(int countryId)
        {
            return await dbContext.City.Where(x => x.CountryId == countryId && x.IsActive).Select(x => new IdNameModel()
            {
                Id = x.CityId,
                Name = x.CityName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadDesignation(Guid companyId)
        {
            return await dbContext.Designation.Where(x => x.CompanyId == companyId && x.IsActive).Select(x => new IdNameModel()
            {
                GuId = x.DesignationId,
                Name = x.DesignationName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadDomains()
        {
            return await dbContext.Domain.Where(x => x.IsActive).Select(x => new IdNameModel()
            {
                Id = x.DomainId,
                Name = x.DomainName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadExperiences()
        {
            return await dbContext.Experience.Select(x => new IdNameModel()
            {
                Id = x.ExperienceId,
                Name = x.ExperienceName
            }).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadInterviewTypes()
        {
            return await dbContext.InterviewType.Where(x => x.IsActive).Select(x => new IdNameModel()
            {
                Id = x.InterviewTypeId,
                Name = x.InterviewTypeName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadJobTypes()
        {
            return await dbContext.JobType.Select(x => new IdNameModel()
            {
                Id = x.JobTypeId,
                Name = x.JobTypeName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadNoticePeriod()
        {
            return await dbContext.NoticePeriod.Select(x => new IdNameModel()
            {
                Id = x.NoticePeriodId,
                Name = x.NoticePeriodName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadScreens()
        {
            return await dbContext.Screen.Select(x => new IdNameModel()
            {
                Id = x.ScreenId,
                Name = x.ScreenName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<List<IdNameModel>> LoadStatus()
        {
            return await dbContext.Status.Select(x => new IdNameModel()
            {
                Id = x.StatusId,
                Name = x.StatusName
            }).OrderBy(x => x.Name).ToListAsync();
        }
        public async Task<List<IdNameModel>> LoadTimeSlots()
        {
            return await dbContext.TimeSlot.Select(x => new IdNameModel()
            {
                Id = x.TimeSlotId,
                Name = x.TimeSlotName
            }).OrderBy(x => x.Name).ToListAsync();
        }
        public async Task<List<IdNameModel>> LoadZoomAccounts()
        {
            return await dbContext.ZoomAccount.Select(x => new IdNameModel()
            {
                GuId = x.ZoomAccountId,
                Name = x.UserName
            }).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<string> GetTimeslotById(int id)
        {
            return await dbContext.TimeSlot.Where(x => x.TimeSlotId == id).Select(x => x.TimeSlotName).FirstOrDefaultAsync();
        }

        public async Task<string> GetPrimarySkillNameById(int id)
        {
            return await dbContext.PrimarySkill.Where(x => x.PrimarySkillId == id).Select(x => x.PrimarySkillName).FirstOrDefaultAsync();
        }

        public async Task<string> GetSecondarySkillNameById(List<int> id)
        {
            var secondarySkillName = await dbContext.SecondarySkill.Where(x => id.Contains(x.SecondarySkillId)).Select(x => x.SecondarySkillName).ToListAsync();
            return String.Join(",", secondarySkillName);
        }

        public async Task<List<IdNameModel>> LoadInterviewRounds()
        {
            return await dbContext.InterviewRound.Select(x => new IdNameModel()
            {
                Id = x.InterviewRoundId,
                Name = x.RoundName
            }).ToListAsync();
        }
    }
}
