using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IAI.Models.Entities
{
    [Table("InterviewPayment")]
    public class InterviewPayment : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid PaymentId { get; set; }
        [ForeignKey("InterviewId")]
        public virtual Interview? Interview { get; set; }
        public Guid InterviewId { get; set; }        
        public string? OrderId { get; set; }
        public string? TrackingId { get; set; }
        public string? BankRefId { get; set; }
        public string? OrderStatus { get; set; }
        public string? FailureMessage { get; set; }
        public string? PaymentMode { get; set; }
        public string? CardName { get; set; }
        public string? StatusCode { get; set; }
        public string? StatusMessage { get; set; }
        public DateTimeOffset OrderDate { get; set; }
    }
}
