using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Models.Models.Interviewer.Requests
{
    public class InterviewerSchedulesRequestModel
    {
        [Required]
        public Guid InterviewerId { get; set; }
        [Required]
        public string? StartDate { get; set; }
        [Required]
        public string? EndDate { get; set; }
        [Required, MinLength(1, ErrorMessage = "Atleast one Timeslot must be selected")]
        public List<int>? TimeSlotIds { get; set; }
        [Required]
        public bool BlockSchedule { get; set; }
    }
}
