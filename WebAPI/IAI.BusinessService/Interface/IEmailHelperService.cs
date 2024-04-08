
namespace IAI.BusinessService.Interface
{
    public interface IEmailHelperService
    {
        Task<bool> SendVerificationEmail(string emailAddress, string name, string VerificationCode, Guid userId);
        Task<bool> SendRegistrationEmail(string emailAddress, string name, string password);
        Task<bool> SendChangePasswordEmail(string emailAddress, string name, string password);
        Task<bool> SendInterviewScheduleCandidateEmail(string emailAddress, string name, string interviewerName, string interviewDate, string topics);
        Task<bool> SendInterviewScheduleInterviewerEmail(string emailAddress, string name, string interviewerName, string interviewDate, string topics);
        Task<bool> SendInterviewConfirmationEmail(string emailAddress, string name, string interviewDate, string interviewerName);
        Task<bool> SendInterviewRatingEmail(string emailAddress, string name, string interviewDate);
    }
}
