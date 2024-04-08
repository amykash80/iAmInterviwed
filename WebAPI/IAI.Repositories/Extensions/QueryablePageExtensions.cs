using IAI.Models.Models.Responses;
using Microsoft.EntityFrameworkCore;

namespace IAI.Repositories.Extensions
{
    public static class QueryablePageExtensions
    {
        public static IQueryable<T> GetPageRows<T>(this IQueryable<T> query, int pageIndex, int pageSize)
        {
            int skip = pageIndex * pageSize;
            return query.Skip(skip).Take(pageSize);
        }

        public static PagedList<T> GetPaged<T>(this IQueryable<T> query, int page, int pageSize)
        {
            int pageIndex = page - 1;
            int totalCount = query.Count();
            var results = query.GetPageRows(pageIndex, pageSize).ToList();
            return new PagedList<T>(results, pageIndex, pageSize, totalCount);
        }

        public static async Task<PagedList<T>> GetPagedAsync<T>(this IQueryable<T> query, int page, int pageSize)
        {
            int pageIndex = page - 1;
            int totalCount = await query.CountAsync();
            var results = await query.GetPageRows(pageIndex, pageSize).ToListAsync();
            return new PagedList<T>(results, pageIndex, pageSize, totalCount);
        }

        public static PagedList<T> GetPaged<T>(this IEnumerable<T> query, int page, int pageSize)
        {
            int pageIndex = page - 1;
            int totalCount = query.Count();
            int skip = pageIndex * pageSize;
            var results = query.Skip(skip).Take(pageSize).ToList();
            return new PagedList<T>(results, pageIndex, pageSize, totalCount);
        }
    }
}