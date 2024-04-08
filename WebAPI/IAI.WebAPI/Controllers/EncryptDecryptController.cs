using IAI.BusinessService.Implementation;
using IAI.BusinessService.Interface;
using IAI.Models.Models.JWTTokens;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NLog;

namespace IAI.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EncryptDecryptController : ControllerBase
    {
        private static Logger _logger = LogManager.GetLogger("ControllerLogs");
        private readonly IEncryptDecryptService iEncryptDecryptService;
        public EncryptDecryptController(IEncryptDecryptService iEncryptDecryptService)
        {
            this.iEncryptDecryptService = iEncryptDecryptService;
        }

        [HttpGet]
        [Route("Encrypt/{plainText}")]
        public IActionResult EncryptString(string plainText)
        {
            try
            {
                var response = iEncryptDecryptService.Encrypt(plainText);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("Decrypt/{encryptedText}")]
        public IActionResult DecryptString(string encryptedText)
        {
            try
            {
                var response = iEncryptDecryptService.Decrypt(encryptedText);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("EncryptBase64/{plainText}")]
        public IActionResult EncryptBase64String(string plainText)
        {
            try
            {
                var response = iEncryptDecryptService.EncryptBase64(plainText);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("DecryptBase64/{encryptedText}")]
        public IActionResult DecryptBase64String(string encryptedText)
        {
            try
            {
                var response = iEncryptDecryptService.DecryptBase64(encryptedText);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
