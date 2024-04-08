using IAI.Models.Enums;
using IAI.Models.Models.Responses.Interfaces;

namespace IAI.Models.Models.Responses
{
    public class SearchAndPagingParameters : ISearchAndPagingParameters
    {
        /// <summary>
        /// Gets or sets the current Page, default is 1
        /// </summary>
        /// <value>
        /// current page
        /// </value>
        public int Page { get; set; } = 1;
        /// <summary>
        /// Gets or sets the size of the page, default is 10
        /// </summary>
        /// <value>
        /// The size of the page.
        /// </value>
        public int PageSize { get; set; } = 10;

        public string? Sort { get; set; }
        public SortDirection SortDir { get; set; }
    }
}
