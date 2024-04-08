using IAI.BusinessService.Interface;
using IAI.Models.Models.Common;
using Microsoft.AspNetCore.Mvc;
using NLog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.StaticFiles;

namespace IAI.WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private static Logger _logger = LogManager.GetLogger("ControllerLogs");
        private readonly IFileUploadService iFileUploadService;

        public FileUploadController(IFileUploadService iFileUploadService)
        {
            this.iFileUploadService = iFileUploadService;
        }

        [HttpPost]
        [Route("UploadFile")]
        //public async Task<IActionResult> UploadCandidateResume(IFormFile Uploadedfile)
        public async Task<IActionResult> UploadFile()
        {
            try
            {
                var file = HttpContext.Request.Form.Files[0];
                var candidateResume = new FileUploadModel()
                {
                    FileName = HttpContext.Request.Form["fileName"],
                    UserId = Guid.Parse(HttpContext.Request.Form["userId"]),
                    FileUploadType = HttpContext.Request.Form["fileUploadType"],
                    Size = file.Length
                };
                using (var reader = new MemoryStream())
                {
                    file.CopyTo(reader);
                    candidateResume.FileData = reader.ToArray();
                }

                var response = await iFileUploadService.UploadFile(candidateResume);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("DownloadFile/{userId}/{fileUploadType}")]
        public async Task<IActionResult> DownloadFileContent(Guid userId, string fileUploadType)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var file = await iFileUploadService.DownloadFile(userId, fileUploadType);               
                if (file.ErrorMessages.Count < 1)
                {
                    var contentType = "application/octet-stream";
                    var extension = file.Data.FileName;
                    var provider = new FileExtensionContentTypeProvider();
                    if (!provider.TryGetContentType(file.Data.FileName, out contentType))
                    {
                        contentType = "application/octet-stream";
                    }
                    Response.Headers.Add("Access-Control-Expose-Headers", "Content-Disposition");
                    Response.Headers.Add("Content-Disposition", "attachment;filename=" + file.Data.FileName);
                    //contentType = System.Web.MimeMapping.GetMimeMapping(file.Data.FileName);
                    var memory = new MemoryStream(file.Data.FileData);
                    return File(memory, contentType);
                    //response.StatusCode = HttpStatusCode.OK;
                    //response.Content = new ByteArrayContent(file.Data.FileData.ToArray());
                    //response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                    //response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                    //response.Content.Headers.ContentDisposition.FileName = file.Data.FileName;
                    //response.Content.Headers.ContentLength = file.Data.FileData.Length;
                    //return response;
                }
                else
                {
                    return NotFound("File Not found");
                }                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
