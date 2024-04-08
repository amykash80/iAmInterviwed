using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Models.Entities
{
    [Table("CandidateDesignation")]
    public class CandidateDesignation : IAIBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DesignationId { get; set; }
        public string? DesignationName { get; set; }
        public string? Description { get; set; }
    }
}
