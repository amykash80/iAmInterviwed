using IAI.Models.Entities;
using IAI.Models.Models.Common;
using IAI.Models.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.BusinessService.Interface
{
    public interface IFileUploadService
    {
        Task<BaseResponse<bool>> UploadFile(FileUploadModel file);
        Task<BaseResponse<FileDownloadModel>> DownloadFile(Guid userId, string fileUploadType);
    }
}
