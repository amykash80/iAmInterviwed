using System.ComponentModel.DataAnnotations;

namespace IAI.Models.Enums
{
    public enum NoticePeriodEnum
    {
        [Display(Name = "Immediate")]
        Immediate = 1,
        [Display(Name = "30 days")]
        Thirtydays = 2,
        [Display(Name = "60 days")]
        Sixtydays = 3,
        [Display(Name = "90 days")]
        Ninetydays = 4
    }
}
