using IAI.Models.Enums;

namespace IAI.Models.Models.Responses.Interfaces
{
    public interface ISearchAndPagingParameters
    {
        int Page { get; set; }
        int PageSize { get; set; }
        string Sort { get; set; }
        SortDirection SortDir { get; set; }
    }
}
