using IAI.Models.Models.Responses;

namespace IAI.Models.Models.Requests
{
    public class FilterPagingParameters : SearchAndPagingParameters
    {
        public string? SearchText { get; set; }
        public bool ActiveOnly { get; set; }

        public FilterPagingParameters()
        {
        }

        public void ForExport()
        {
            Page = 1;
            PageSize = int.MaxValue;
        }
    }
}
