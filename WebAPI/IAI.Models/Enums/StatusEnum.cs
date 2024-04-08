using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Models.Enums
{
    public enum StatusEnum
    {
        [Display(Name = "Interview scheduled")]
        InterviewScheduled = 5
    }

    public enum IAIEnums
    {
        [Display(Name = "Comments Required Upto")]
        CommentesRequired = 5,

        [Display(Name = "Rating Max")]
        TotalRatingMax = 5
    }
}
