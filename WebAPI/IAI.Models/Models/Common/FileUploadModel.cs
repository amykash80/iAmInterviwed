using System.ComponentModel.DataAnnotations;

namespace IAI.Models.Models.Common
{
    public class FileUploadModel
    {
        [Required]
        public string? FileName { get; set; }
        [Required]
        public Guid UserId { get; set; }
        public long? Size { get; set; }
        [Required]
        public byte[]? FileData { get; set; }
        public string? FileUploadType { get; set; }
    }

    public class FileDownloadModel
    {
        public Guid FileId { get; set; }
        public byte[]? FileData { get; set; }
        public string? FileName { get; set; }
    }
}
