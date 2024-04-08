using IAI.BusinessService.Interface;
using IAI.Models.Models.Common;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System.Net.Mail;
  using Microsoft.Extensions.Configuration.Binder
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using IAI.Models.Models.Common;

namespace IAI.BusinessService.Implementation
{
    public class EmailHelperService : IEmailHelperService
    {
        private readonly IConfiguration configuration;
        private readonly IEncryptDecryptService iEncryptDecryptService;
        public EmailHelperService(IConfiguration configuration, IEncryptDecryptService iEncryptDecryptService)
        {
            this.configuration = configuration;
            this.iEncryptDecryptService = iEncryptDecryptService;
        }

        public async Task<bool> SendVerificationEmail(string emailAddress, string name, string VerificationCode, Guid userId)
        {
            var baseUrl = configuration.GetValue<string>("EmailSettings:DomainUrl");
            var encryptionKeys = iEncryptDecryptService.EncryptBase64(userId + ":" + VerificationCode);
            var verificationUrl = baseUrl + "verifyaccount/" + encryptionKeys;
            var subject = "IAmInterviewed Registration";
            var body = "Hi " + name + ",<br /><br />Thank you for registering with iaminterviewed. Verifivation mail will be sent to your Email, please check and verify your account<br /><br />"
                                        + "<strong>Verification Code:</strong>  " + VerificationCode + "<br />"
                                        + "Please Click Here to Verify your account: " + verificationUrl + "<br /><br />"
                                         + "Have a nice day...<br /><br />"
                                    + "Thanks,<br />"
                                    + "Team IAmInterviewed";
            var emailMessage = CreateMailMessage(emailAddress, subject, body);
            return await SendRegistrationEmail(emailMessage);
        }

        public async Task<bool> SendRegistrationEmail(string emailAddress, string name, string password)
        {
            var baseUrl = configuration.GetValue<string>("EmailSettings:DomainUrl");
            var subject = "IAmInterviewed Registration";
            string body = "Hi " + name + ",<br /><br />Thank you for registering with iaminterviewed. Please find your UserName and Password below<br /><br />"
                                        + "<strong>User Name:</strong>  " + emailAddress + "<br />"
                                        + "<strong>Password:</strong>  " + password + "<br />"
                                        + "Please Click Here to Login: " + baseUrl + "<br /><br />"
                                         + "Have a nice day...<br /><br />"
                                    + "Thanks,<br />"
                                    + "Team IAmInterviewed";
            var emailMessage = CreateMailMessage(emailAddress, subject, body);
            return await SendRegistrationEmail(emailMessage);
        }

        public async Task<bool> SendChangePasswordEmail(string emailAddress, string name, string password)
        {
            var baseUrl = configuration.GetValue<string>("EmailSettings:DomainUrl");
            var subject = "IAmInterviewed Password Change";
            string body = "Hi " + name + ",<br /><br />Your Password has been Changed. Please find your new Password below<br /><br />"
                                        + "<strong>User Name:</strong>  " + emailAddress + "<br />"
                                        + "<strong>Password:</strong>  " + password + "<br />"
                                        + "Please Click Here to Login: " + baseUrl + "<br /><br />"
                                         + "Have a nice day...<br /><br />"
                                    + "Thanks,<br />"
                                    + "Team IAmInterviewed";
            var emailMessage = CreateMailMessage(emailAddress, subject, body);
            return await SendRegistrationEmail(emailMessage);
        }

        public async Task<bool> SendInterviewScheduleCandidateEmail(string emailAddress, string name, string interviewerName, string interviewDate, string topics)
        {
            var baseUrl = configuration.GetValue<string>("EmailSettings:DomainUrl");
            var subject = "Interview Schedule";
            string body = "Hi " + name + ",<br /><br />Please find your interview scheduled,<br /><br />"
                                            + "<strong>Interviewer:</strong>  " + interviewerName + "<br />"
                                            + "<strong>Date and Time:</strong>  " + interviewDate + "<br />"
                                            + "Interview Topics: " + topics + "<br />"
                                            + "Please login here to see details: " + baseUrl + "<br /><br />"
                                            + "You will receive ZOOM invite for the Interview. <strong> Please check your SPAM folder also for the invite "
                                            + "Note: At the time of interview, Panel may be delayed by few minutes, please wait. If panel doesn't join in 10 min, "
                                            + "please log off. We will re-schedule the interview. </strong> <br /><br />"
                                            + "Please visit https://iaminterviewed.com/PrivacyPolicy.html to know the Privacy Policy. <br /><br />"
                                            + "Have a nice day...<br /><br />"
                                            + "Thanks,<br />"
                                            + "Team IAmInterviewed";
            var emailMessage = CreateMailMessage(emailAddress, subject, body);
            return await SendScheduleEmail(emailMessage);
        }

        public async Task<bool> SendInterviewScheduleInterviewerEmail(string emailAddress, string name, string interviewerName, string interviewDate, string topics)
        {
            var baseUrl = configuration.GetValue<string>("EmailSettings:DomainUrl");
            var subject = "Interview Schedule";
            string body = "Hi " + interviewerName + ",<br /><br />Please find the new  interview scheduled for you,<br /><br />"
                                            + "<strong>Name:</strong>  " + name + "<br />"
                                            + "<strong>Date and Time:</strong>  " + interviewDate + "<br />"
                                            + "Interview Topics: " + topics + "<br />"
                                            + "Please Click Here to Confirm: " + baseUrl + "<br /><br />"
                                            + "You will receive ZOOM invite for the Interview. <strong> Please check your SPAM folder also for the invite "
                                            + "Note: At the time of interview, Panel may be delayed by few minutes, please wait. If panel doesn't join in 10 min, "
                                            + "please log off. We will re-schedule the interview. </strong> <br /><br />"
                                            + "Please visit https://iaminterviewed.com/PrivacyPolicy.html to know the Privacy Policy. <br /><br />"
                                            + "Have a nice day...<br /><br />"
                                            + "Thanks,<br />"
                                            + "Team IAmInterviewed";
            var emailMessage = CreateMailMessage(emailAddress, subject, body);
            return await SendScheduleEmail(emailMessage);
        }

        public async Task<bool> SendInterviewConfirmationEmail(string emailAddress, string name, string interviewDate, string interviewerName)
        {
            var baseUrl = configuration.GetValue<string>("EmailSettings:DomainUrl");
            var subject = "Interview Confirmation";
            string body = "Hi " + name + ",<br /><br />Your Interview has been confirmed on " + interviewDate + "<br /><br />"
                                            + "<strong>Interviewer:</strong>  " + interviewerName + "<br />"
                                            + "All the best.<br /><br />"
                                            + "Please Click Here to For More Details: " + baseUrl + "<br /><br />"
                                            + "Have a nice day...<br /><br />"
                                            + "Thanks,<br />"
                                            + "Team IAmInterviewed";
            var emailMessage = CreateMailMessage(emailAddress, subject, body);
            return await SendScheduleEmail(emailMessage);
        }

        public async Task<bool> SendInterviewRatingEmail(string emailAddress, string name, string interviewDate)
        {
            var baseUrl = configuration.GetValue<string>("EmailSettings:DomainUrl");
            var subject = "Interview Rating";
            string body = "Hi " + name + ",<br /><br />Your Interview on " + interviewDate + " has been rated by the interviewer.<br /><br />"
                                            + "You need to accept the Rating in order to appear for the Employer.<br /><br />"
                                            + "Please check and accept your Rating by loging into " + baseUrl + "<br /><br />"
                                            + "Have a nice day...<br /><br />"
                                            + "Thanks,<br />"
                                            + "Team IAmInterviewed";
            var emailMessage = CreateMailMessage(emailAddress, subject, body);
            return await SendScheduleEmail(emailMessage);
        }

        private async Task<bool> SendRegistrationEmail(MimeMessage emailMessage)
        {
            var emailParameters = new EmailParameters();
            emailParameters.SmtpHost = configuration.GetValue<string>("EmailSettings:SmtpHost");
            emailParameters.Port = configuration.GetValue<int>("EmailSettings:Port");
            emailParameters.UserName = configuration.GetValue<string>("EmailSettings:RegisterMail");
            emailParameters.Password = configuration.GetValue<string>("EmailSettings:RegisterMailPassword");
            return await Send(emailMessage, emailParameters);
        }

        private async Task<bool> SendScheduleEmail(MimeMessage emailMessage)
        {
            var emailParameters = new EmailParameters();
            emailParameters.SmtpHost = configuration.GetValue<string>("EmailSettings:SmtpHost");
            emailParameters.Port = configuration.GetValue<int>("EmailSettings:Port");
            emailParameters.UserName = configuration.GetValue<string>("EmailSettings:InvitesMail");
            emailParameters.Password = configuration.GetValue<string>("EmailSettings:InvitesMailPassword");
            return await Send(emailMessage, emailParameters);
        }

        private async Task<bool> Send(MimeMessage email, EmailParameters emailParameters)
        {
            try
            {
                using var smtp = new SmtpClient();
                smtp.Connect(emailParameters.SmtpHost, emailParameters.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(emailParameters.UserName, emailParameters.Password);
                await smtp.SendAsync(email);
                smtp.Disconnect(true);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private MimeMessage CreateMailMessage(string emailAddress, string Subject, string body)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(configuration.GetValue<string>("EmailSettings:From"));
            email.To.Add(MailboxAddress.Parse(emailAddress));
            email.Subject = Subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = body;
            email.Body = builder.ToMessageBody();
            return email;
        }
    }
}
