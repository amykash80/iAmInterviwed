using IAI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Repositories.Implementation
{
    public class CandidateRepository : ICandidateRepository
    {
        private IAIDBContext dbContext;
        public CandidateRepository(IAIDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> CheckCandidateExists(Guid candidateId)
        {
            var canddate = await dbContext.CandidateProfile.Where(x => x.CandidateId == candidateId && x.IsActive).FirstOrDefaultAsync();
            if (canddate == null)
            {
                return false;
            }
            return true;
        }
    }
}
