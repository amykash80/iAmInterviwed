using IAI.Models.Models.Responses.Interfaces;
using System.Collections;
using System.Collections.ObjectModel;

namespace IAI.Models.Models.Responses
{
    public class PagedList<T> : IPagedList<T>
    {
        public PagedList(IEnumerable<T> source, int pageIndex, int pageSize, int totalCount)
        {
            Items = new ReadOnlyCollection<T>(source.ToList());
            TotalCount = totalCount;
            TotalPages = totalCount / pageSize;

            if (totalCount % pageSize > 0)
                TotalPages++;

            PageSize = pageSize;
            PageIndex = pageIndex;
        }

        public IReadOnlyList<T> Items { get; }
        public int PageIndex { get; }
        public int PageSize { get; }
        public int TotalCount { get; }
        public int TotalPages { get; }

        public bool HasPreviousPage
        {
            get
            {
                return PageIndex > 0;
            }
        }

        public bool HasNextPage
        {
            get
            {
                return PageIndex + 1 < TotalPages;
            }
        }

        public IEnumerator<T> GetEnumerator()
        {
            return Items.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
