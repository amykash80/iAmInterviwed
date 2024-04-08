using System.Collections;

namespace IAI.Models.Models.Responses.Interfaces
{
    public interface IPagedList<T> : IEnumerable<T>, IPagedList
    {

    }
    public interface IPagedList : IEnumerable
    {
        int PageIndex { get; }
        int PageSize { get; }
        int TotalCount { get; }
        int TotalPages { get; }
        bool HasPreviousPage { get; }
        bool HasNextPage { get; }
    }
}
