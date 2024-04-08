using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Models.Models.Interviewer.Requests
{
    public class InterviewerPersonalInfoRequestModel
    {
        [Required]
        public Guid InterviewerId { get; set; }
        [Required]
        public int CityId { get; set; }
        [Required]
        public int ExperienceId { get; set; }
        [Required]
        public long MobileNumber { get; set; }
        public string? Address { get; set; }
    }
}
