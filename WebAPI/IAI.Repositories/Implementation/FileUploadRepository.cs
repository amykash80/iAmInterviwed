using IAI.Models.Entities;
using IAI.Models.Models.Common;
using IAI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Repositories.Implementation
{
    public class FileUploadRepository : IFileUploadRepository
    {
        private IAIDBContext dbContext;
        private IAILOBDBContext lobDBContext;

        public FileUploadRepository(IAIDBContext dbContext, IAILOBDBContext lobDBContext)
        {
            this.dbContext = dbContext;
            this.lobDBContext = lobDBContext;
        }

        public async Task<string> UploadCandidateResume(FileUploadModel file)
        {
            if (file == null)
            {
                throw new ArgumentNullException(nameof(file));
            }
            var candidateResume = await lobDBContext.CandidateResume.Where(x => x.CandidateId == file.UserId).FirstOrDefaultAsync();
            if (candidateResume == null)
            {
                candidateResume = new CandidateResume()
                {
                    CandidateId = file.UserId,
                    FileName = file.FileName,
                    FileContent = file.FileData,
                    CreatedBy = file.UserId,
                    CreatedDate = DateTimeOffset.Now,
                    ModifiedBy = file.UserId,
                    ModifiedDate = DateTimeOffset.Now,
                    DeletedDate = DateTimeOffset.Now
                };
                lobDBContext.Set<CandidateResume>().Add(candidateResume);
            }
            else
            {
                candidateResume.FileContent = file.FileData;
                candidateResume.FileName = file.FileName;
                candidateResume.ModifiedBy = file.UserId;
                candidateResume.ModifiedDate = DateTimeOffset.Now;
            }
            await lobDBContext.SaveChangesAsync();
            return "Resume Uploaded Successfully.";
        }

        public async Task<string> UploadCandidatePhoto(FileUploadModel file)
        {
            if (file == null)
            {
                throw new ArgumentNullException(nameof(file));
            }
            var candidatePhoto = await lobDBContext.CandidatePhoto.Where(x => x.CandidateId == file.UserId).FirstOrDefaultAsync();
            if (candidatePhoto == null)
            {
                candidatePhoto = new CandidatePhoto()
                {
                    CandidateId = file.UserId,
                    FileName = file.FileName,
                    FileContent = file.FileData,
                    CreatedBy = file.UserId,
                    CreatedDate = DateTimeOffset.Now,
                    ModifiedBy = file.UserId,
                    ModifiedDate = DateTimeOffset.Now,
                    DeletedDate = DateTimeOffset.Now
                };
                lobDBContext.Set<CandidatePhoto>().Add(candidatePhoto);
            }
            else
            {
                candidatePhoto.FileContent = file.FileData;
                candidatePhoto.FileName = file.FileName;
                candidatePhoto.ModifiedBy = file.UserId;
                candidatePhoto.ModifiedDate = DateTimeOffset.Now;
            }
            await lobDBContext.SaveChangesAsync();
            return "Photo Uploaded Successfully.";
        }

        public async Task<string> UploadInterviewerResume(FileUploadModel file)
        {
            if (file == null)
            {
                throw new ArgumentNullException(nameof(file));
            }
            var interviewerResume = await lobDBContext.InterviewerResume.Where(x => x.InterviewerId == file.UserId).FirstOrDefaultAsync();
            if (interviewerResume == null)
            {
                interviewerResume = new InterviewerResume()
                {
                    InterviewerId = file.UserId,
                    FileName = file.FileName,
                    FileContent = file.FileData,
                    CreatedBy = file.UserId,
                    CreatedDate = DateTimeOffset.Now,
                    ModifiedBy = file.UserId,
                    ModifiedDate = DateTimeOffset.Now,
                    DeletedDate = DateTimeOffset.Now
                };
                lobDBContext.Set<InterviewerResume>().Add(interviewerResume);
            }
            else
            {
                interviewerResume.FileContent = file.FileData;
                interviewerResume.FileName = file.FileName;
                interviewerResume.ModifiedBy = file.UserId;
                interviewerResume.ModifiedDate = DateTimeOffset.Now;
            }
            await lobDBContext.SaveChangesAsync();
            return "Resume Uploaded Successfully.";
        }

        public async Task<string> UploadInterviewerPhoto(FileUploadModel file)
        {
            if (file == null)
            {
                throw new ArgumentNullException(nameof(file));
            }
            var interviewerPhoto = await lobDBContext.InterviewerPhoto.Where(x => x.InterviewerId == file.UserId).FirstOrDefaultAsync();
            if (interviewerPhoto == null)
            {
                interviewerPhoto = new InterviewerPhoto()
                {
                    InterviewerId = file.UserId,
                    FileName = file.FileName,
                    FileContent = file.FileData,
                    CreatedBy = file.UserId,
                    CreatedDate = DateTimeOffset.Now,
                    ModifiedBy = file.UserId,
                    ModifiedDate = DateTimeOffset.Now,
                    DeletedDate = DateTimeOffset.Now
                };
                lobDBContext.Set<InterviewerPhoto>().Add(interviewerPhoto);
            }
            else
            {
                interviewerPhoto.FileContent = file.FileData;
                interviewerPhoto.FileName = file.FileName;
                interviewerPhoto.ModifiedBy = file.UserId;
                interviewerPhoto.ModifiedDate = DateTimeOffset.Now;
            }
            await lobDBContext.SaveChangesAsync();
            return "Photo Uploaded Successfully.";
        }

        public async Task<string> UploadCompanyPhoto(FileUploadModel file)
        {
            if (file == null)
            {
                throw new ArgumentNullException(nameof(file));
            }
            var companyPhoto = await lobDBContext.CompanyPhoto.Where(x => x.CompanyId == file.UserId).FirstOrDefaultAsync();
            if (companyPhoto == null)
            {
                companyPhoto = new CompanyPhoto()
                {
                    CompanyId = file.UserId,
                    FileName = file.FileName,
                    FileContent = file.FileData,
                    CreatedBy = file.UserId,
                    CreatedDate = DateTimeOffset.Now,
                    ModifiedBy = file.UserId,
                    ModifiedDate = DateTimeOffset.Now,
                    DeletedDate = DateTimeOffset.Now
                };
                lobDBContext.Set<CompanyPhoto>().Add(companyPhoto);
            }
            else
            {
                companyPhoto.FileContent = file.FileData;
                companyPhoto.FileName = file.FileName;
                companyPhoto.ModifiedBy = file.UserId;
                companyPhoto.ModifiedDate = DateTimeOffset.Now;
            }
            await lobDBContext.SaveChangesAsync();
            return "Photo Uploaded Successfully.";
        }

        public async Task<FileDownloadModel> DownloadCandidateResume(Guid candidateId)
        {
            return await lobDBContext.CandidateResume.Where(x => x.CandidateId == candidateId).Select(x => new FileDownloadModel()
            {
                FileId = x.CandidateResumeId,
                FileData = x.FileContent,
                FileName = x.FileName
            }).FirstOrDefaultAsync();
        }

        public async Task<FileDownloadModel> DownloadCandidatePhoto(Guid candidateId)
        {
            return await lobDBContext.CandidatePhoto.Where(x => x.CandidateId == candidateId).Select(x => new FileDownloadModel()
            {
                FileId = x.CandidatePhotoId,
                FileData = x.FileContent,
                FileName = x.FileName
            }).FirstOrDefaultAsync();
        }

        public async Task<FileDownloadModel> DownloadInterviewerResume(Guid interviewerId)
        {
            return await lobDBContext.InterviewerResume.Where(x => x.InterviewerId == interviewerId).Select(x => new FileDownloadModel()
            {
                FileId = x.InterviewerResumeId,
                FileData = x.FileContent,
                FileName = x.FileName
            }).FirstOrDefaultAsync();
        }

        public async Task<FileDownloadModel> DownloadInterviewerPhoto(Guid interviewerId)
        {
            return await lobDBContext.InterviewerPhoto.Where(x => x.InterviewerId == interviewerId).Select(x => new FileDownloadModel()
            {
                FileId = x.InterviewerPhotoId,
                FileData = x.FileContent,
                FileName = x.FileName
            }).FirstOrDefaultAsync();
        }

        public async Task<FileDownloadModel> DownloadCompanyPhoto(Guid companyId)
        {
            return await lobDBContext.CompanyPhoto.Where(x => x.CompanyId == companyId).Select(x => new FileDownloadModel()
            {
                FileId = x.CompanyPhotoId,
                FileData = x.FileContent,
                FileName = x.FileName
            }).FirstOrDefaultAsync();
        }
    }
}
