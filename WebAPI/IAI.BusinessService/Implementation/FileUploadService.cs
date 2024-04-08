using IAI.BusinessService.Interface;
using IAI.Models.Entities;
using IAI.Models.Enums;
using IAI.Models.Models.Common;
using IAI.Models.Models.Responses;
using IAI.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.BusinessService.Implementation
{
    public class FileUploadService : IFileUploadService
    {
        private readonly IAccountRepository iAccountRepository;
        private readonly IFileUploadRepository iFileUploadRepository;
        public FileUploadService(IAccountRepository iAccountRepository, IFileUploadRepository iFileUploadRepository)
        {
            this.iAccountRepository = iAccountRepository;
            this.iFileUploadRepository = iFileUploadRepository;
        }

        public async Task<BaseResponse<bool>> UploadFile(FileUploadModel file)
        {
            //BaseResponse<List<IdNameModel>> response = new BaseResponse<List<IdNameModel>>();
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            try
            {
                if(file.FileUploadType == FileUploadTypeEnum.CandidateResume.ToString())
                {
                    var candidateExist = await iAccountRepository.CheckCandidateExists(file.UserId);
                    if (candidateExist)
                    {
                        var fileInserted = await iFileUploadRepository.UploadCandidateResume(file);
                        infoMessages.Add(fileInserted);
                    }
                    else
                    {
                        errorMessages.Add("Candidate Doesnot Exist.");
                    }
                }
                else if (file.FileUploadType == FileUploadTypeEnum.CandidatePhoto.ToString())
                {
                    var candidateExist = await iAccountRepository.CheckCandidateExists(file.UserId);
                    if (candidateExist)
                    {
                        var fileInserted = await iFileUploadRepository.UploadCandidatePhoto(file);
                        infoMessages.Add(fileInserted);
                    }
                    else
                    {
                        errorMessages.Add("Candidate Doesnot Exist.");
                    }
                }
                else if (file.FileUploadType == FileUploadTypeEnum.InterviewerResume.ToString())
                {
                    var candidateExist = await iAccountRepository.CheckInterviewerExists(file.UserId);
                    if (candidateExist)
                    {
                        var fileInserted = await iFileUploadRepository.UploadInterviewerResume(file);
                        infoMessages.Add(fileInserted);
                    }
                    else
                    {
                        errorMessages.Add("Interviewer Doesnot Exist.");
                    }
                }
                else if (file.FileUploadType == FileUploadTypeEnum.InterviewerPhoto.ToString())
                {
                    var candidateExist = await iAccountRepository.CheckInterviewerExists(file.UserId);
                    if (candidateExist)
                    {
                        var fileInserted = await iFileUploadRepository.UploadInterviewerPhoto(file);
                        infoMessages.Add(fileInserted);
                    }
                    else
                    {
                        errorMessages.Add("Interviewer Doesnot Exist.");
                    }
                }
                else if (file.FileUploadType == FileUploadTypeEnum.CompanyLogo.ToString())
                {
                    var candidateExist = await iAccountRepository.CheckCompanyExists(file.UserId);
                    if (candidateExist)
                    {
                        var fileInserted = await iFileUploadRepository.UploadCompanyPhoto(file);
                        infoMessages.Add(fileInserted);
                    }
                    else
                    {
                        errorMessages.Add("Company Doesnot Exist.");
                    }
                }
                else
                {
                    errorMessages.Add("Wrong Upload Category.");
                }
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while uploading File.");
            }
            return new BaseResponse<bool>(true, errorMessages, new List<string>(), infoMessages);
        }

        public async Task<BaseResponse<FileDownloadModel>> DownloadFile(Guid userId, string fileUploadType)
        {
            var file = new FileDownloadModel();
            List<string> errorMessages = new List<string>();
            List<string> infoMessages = new List<string>();
            try
            {
                if (fileUploadType == FileUploadTypeEnum.CandidateResume.ToString())
                {
                    var candidateExist = await iAccountRepository.CheckCandidateExists(userId);
                    if (candidateExist)
                    {
                        file = await iFileUploadRepository.DownloadCandidateResume(userId);
                    }
                    else
                    {
                        errorMessages.Add("Candidate Doesnot Exist.");
                    }
                }
                else if (fileUploadType == FileUploadTypeEnum.CandidatePhoto.ToString())
                {
                    var candidateExist = await iAccountRepository.CheckCandidateExists(userId);
                    if (candidateExist)
                    {
                        file = await iFileUploadRepository.DownloadCandidatePhoto(userId);
                    }
                    else
                    {
                        errorMessages.Add("Candidate Doesnot Exist.");
                    }
                }
                else if (fileUploadType == FileUploadTypeEnum.InterviewerResume.ToString())
                {
                    var candidateExist = await iAccountRepository.CheckInterviewerExists(userId);
                    if (candidateExist)
                    {
                        file = await iFileUploadRepository.DownloadInterviewerResume(userId);
                    }
                    else
                    {
                        errorMessages.Add("Interviewer Doesnot Exist.");
                    }
                }
                else if (fileUploadType == FileUploadTypeEnum.InterviewerPhoto.ToString())
                {
                    var candidateExist = await iAccountRepository.CheckInterviewerExists(userId);
                    if (candidateExist)
                    {
                        file = await iFileUploadRepository.DownloadInterviewerPhoto(userId);
                    }
                    else
                    {
                        errorMessages.Add("Interviewer Doesnot Exist.");
                    }
                }
                else if (fileUploadType == FileUploadTypeEnum.CompanyLogo.ToString())
                {
                    var candidateExist = await iAccountRepository.CheckCompanyExists(userId);
                    if (candidateExist)
                    {
                        file = await iFileUploadRepository.DownloadCompanyPhoto(userId);
                    }
                    else
                    {
                        errorMessages.Add("Company Doesnot Exist.");
                    }
                }
                else
                {
                    errorMessages.Add("Wrong Download Category.");
                }
            }
            catch (Exception ex)
            {
                errorMessages.Add("Error while uploading File.");
            }
            return new BaseResponse<FileDownloadModel>(file, errorMessages, new List<string>(), infoMessages);
        }
    }
}
