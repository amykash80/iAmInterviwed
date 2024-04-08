using IAI.Models.Entities;
using IAI.Models.Models.Account;
using IAI.Models.Models.Common;

namespace IAI.Repositories.Interface
{
    public interface IFileUploadRepository
    {
        Task<string> UploadCandidateResume(FileUploadModel file);
        Task<string> UploadCandidatePhoto(FileUploadModel file);
        Task<string> UploadInterviewerResume(FileUploadModel file);
        Task<string> UploadInterviewerPhoto(FileUploadModel file);
        Task<string> UploadCompanyPhoto(FileUploadModel file);
        Task<FileDownloadModel> DownloadCandidateResume(Guid candidateId);
        Task<FileDownloadModel> DownloadCandidatePhoto(Guid candidateId);
        Task<FileDownloadModel> DownloadInterviewerResume(Guid interviewerId);
        Task<FileDownloadModel> DownloadInterviewerPhoto(Guid interviewerId);
        Task<FileDownloadModel> DownloadCompanyPhoto(Guid companyId);
    }
}
