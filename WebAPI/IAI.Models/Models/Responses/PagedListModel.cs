
namespace IAI.Models.Models.Responses
{
    public class PagedListModel<T>
    {
        public int TotalCount { get; private set; }
        public int PageIndex { get; private set; }
        public int PageSize { get; private set; }
        public IReadOnlyList<T> Items { get; private set; }

        public PagedListModel(PagedList<T> pagedList)
        {
            Items = pagedList.Items;
            TotalCount = pagedList.TotalCount;
            PageIndex = pagedList.PageIndex;
            PageSize = pagedList.PageSize;
        }

        public PagedListModel(IReadOnlyList<T> items, SearchAndPagingParameters parameters, int totalCount)
        {
            Items = items;
            TotalCount = totalCount;
            PageIndex = parameters.Page - 1;
            PageSize = parameters.PageSize;
        }
    }
}
