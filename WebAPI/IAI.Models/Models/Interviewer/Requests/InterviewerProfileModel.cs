using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Models.Models.Interviewer.Requests
{
    public class InterviewerProfileModel
    {
        public Guid InterviewerId { get; set; }
        public Guid InterviewerProfileId { get; set; }
        public string? ProfileName { get; set; }
        public int PrimarySkillId { get; set; }
        public string? PrimarySkillName { get; set; }
        public string? AdditionalSkills { get; set; }
        public List<InterviewerSkillsModel>? InterviewerSkills { get; set; }
    }

    public class InterviewerSkillsModel
    {
        public int SecondarySkillId { get; set; }
        public string? SecondarySkillName { get; set; }
        public int SecondarySkillNumber { get; set; }
    }
}
