using IAI.Models.Enums;
using IAI.Models.Models.Responses;
using IAI.Repositories.Helpers;

namespace IAI.Repositories.Extensions
{
    public static class QueryableSortExtensions
    {
        private const string idPropertyName = "Id";
        public static IQueryable<T> Sort<T>(this IQueryable<T> query, SearchAndPagingParameters parameters)
        {
            if (!string.IsNullOrEmpty(parameters.Sort))
            {
                var expression = ExpressionHelper.GetExpression<T, object>(parameters.Sort);
                if (expression != null)
                {
                    IOrderedQueryable<T> orderedQuery;
                    if (parameters.SortDir == SortDirection.Asc)
                    {
                        orderedQuery = query.OrderBy(expression);
                    }
                    else
                    {
                        orderedQuery = query.OrderByDescending(expression);
                    }
                    if (typeof(T).GetProperty(idPropertyName) != null)
                    {
                        var idExpression = ExpressionHelper.GetExpression<T, object>(idPropertyName);
                        if (idExpression != null)
                        {
                            orderedQuery = orderedQuery.ThenBy(idExpression);
                        }
                    }
                    query = orderedQuery;
                }
            }
            return query;
        }
    }
}