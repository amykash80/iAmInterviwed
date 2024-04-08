using System.ComponentModel.DataAnnotations;

namespace IAI.Models.Enums
{
    public enum InterviewTypeEnum
    {
        [Display(Name = "Audio")]
        Audio = 1,
        [Display(Name = "Video")]
        Video = 2,
        [Display(Name = "CodeTest")]
        CodeTest = 3
    }
}
