using System.ComponentModel.DataAnnotations;

namespace IAI.Models.Enums
{
    public enum RoleEnum
    {
        [Display(Name = "Administrator")]
        Administrator = 1,
        [Display(Name = "Candidate")]
        Candidate = 2,
        [Display(Name = "Interviewer")]
        Interviewer = 3,
        [Display(Name = "IAI Recruiter")]
        IAIRecruiter = 4,
        [Display(Name = "Vendor")]
        Vendor = 5,
        [Display(Name = "Client Interviewer")]
        ClientInterviewer = 6,
        [Display(Name = "Client Admin")]
        ClientAdmin = 7,
        [Display(Name = "Client Recruiter")]
        ClientRecruiter = 8,
        [Display(Name = "Panel Management")]
        PanelManagement = 9,
        [Display(Name = "Common Components")]
        CommonComponents = 10,
        [Display(Name = "Vendor Recruiter")]
        VendorRecruiter = 11
    }
}
