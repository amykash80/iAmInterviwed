using Microsoft.EntityFrameworkCore;
using IAI.Models.Entities;

namespace IAI.Repositories
{
    public class IAIDBContext : DbContext
    {
        public IAIDBContext(DbContextOptions<IAIDBContext> options)
            : base(options)
        {

        }
        public virtual DbSet<CandidateAccessToViewProfile> CandidateAccessToViewProfile { get; set; }
        public virtual DbSet<CandidateApplication> CandidateApplication { get; set; }
        public virtual DbSet<CandidateDesignation> CandidateDesignation { get; set; }
        public virtual DbSet<CandidateProfile> CandidateProfile { get; set; }
        public virtual DbSet<CandidateSkill> CandidateSkill { get; set; }
        public virtual DbSet<CandidateStatusTracker> CandidateStatusTracker { get; set; }
        public virtual DbSet<City> City { get; set; }
        public virtual DbSet<CompanyConfiguration> CompanyConfiguration { get; set; }
        public virtual DbSet<CompanyProfile> CompanyProfile { get; set; }
        public virtual DbSet<CompanyRequirement> CompanyRequirement { get; set; }
        public virtual DbSet<CompanyRequirementInterviewProcess> CompanyRequirementInterviewProcess { get; set; }
        public virtual DbSet<CompanyRequirementRecruiterDetail> CompanyRequirementRecruiterDetail { get; set; }
        public virtual DbSet<CompanyRequirementSkillDetail> CompanyRequirementSkillDetail { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Designation> Designation { get; set; }
        public virtual DbSet<Domain> Domain { get; set; }
        public virtual DbSet<Department> Department { get; set; }
        public virtual DbSet<EmailTracker> EmailTracker { get; set; }
        public virtual DbSet<Experience> Experience { get; set; }
        public virtual DbSet<FavoriteCompany> FavoriteCompany { get; set; }
        public virtual DbSet<Interview> Interview { get; set; }
        public virtual DbSet<InterviewerProfile> InterviewerProfile { get; set; }
        public virtual DbSet<InterviewerProfileDetail> InterviewerProfileDetail { get; set; }
        public virtual DbSet<InterviewerSchedule> InterviewerSchedule { get; set; }
        public virtual DbSet<InterviewerSkill> InterviewerSkill { get; set; }
        public virtual DbSet<InterviewPayment> InterviewPayment { get; set; }
        public virtual DbSet<InterviewRating> InterviewRating { get; set; }
        public virtual DbSet<InterviewRatingSoftSkillDetail> InterviewRatingSoftSkillDetail { get; set; }
        public virtual DbSet<InterviewRatingTechnicalSkillDetail> InterviewRatingTechnicalSkillDetail { get; set; }
        public virtual DbSet<InterviewRound> InterviewRound { get; set; }
        public virtual DbSet<InterviewSkill> InterviewSkill { get; set; }
        public virtual DbSet<InterviewType> InterviewType { get; set; }
        public virtual DbSet<JobType> JobType { get; set; }
        public virtual DbSet<NoticePeriod> NoticePeriod { get; set; }
        public virtual DbSet<PrimarySkill> PrimarySkill { get; set; }
        public virtual DbSet<RequirementProfile> RequirementProfile { get; set; }
        public virtual DbSet<RequirementSchedule> RequirementSchedule { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<RoleScreenMapping> RoleScreenMapping { get; set; }
        public virtual DbSet<RoleStatusMapping> RoleStatusMapping { get; set; }
        public virtual DbSet<Screen> Screen { get; set; }
        public virtual DbSet<ScreenStatusMapping> ScreenStatusMapping { get; set; }
        public virtual DbSet<SecondarySkill> SecondarySkill { get; set; }
        public virtual DbSet<SoftSkill> SoftSkill { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<SubUser> SubUser { get; set; }
        public virtual DbSet<TimeSlot> TimeSlot { get; set; }
        public virtual DbSet<UserMaster> UserMaster { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }
        public virtual DbSet<Vendor> Vendor { get; set; }
        public virtual DbSet<VendorSubUser> VendorSubUser { get; set; }
        public virtual DbSet<ZoomAccount> ZoomAccount { get; set; }
        public virtual DbSet<ZoomSchedules> ZoomSchedules { get; set; }
    }
}
