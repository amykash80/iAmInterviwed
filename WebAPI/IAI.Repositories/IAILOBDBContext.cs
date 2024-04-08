using Microsoft.EntityFrameworkCore;
using IAI.Models.Entities;

namespace IAI.Repositories
{
    public class IAILOBDBContext : DbContext
    {
        public IAILOBDBContext(DbContextOptions<IAILOBDBContext> options)
            : base(options)
        {

        }
        public virtual DbSet<CandidatePhoto> CandidatePhoto { get; set; }
        public virtual DbSet<CandidateResume> CandidateResume { get; set; }
        public virtual DbSet<CompanyPhoto> CompanyPhoto { get; set; }
        public virtual DbSet<InterviewerPhoto> InterviewerPhoto { get; set; }
        public virtual DbSet<InterviewerResume> InterviewerResume { get; set; }
    }
}
