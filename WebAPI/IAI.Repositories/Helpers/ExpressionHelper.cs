using System.Linq.Expressions;

namespace IAI.Repositories.Helpers
{
    public static class ExpressionHelper
    {
        public static Expression<Func<T, TProperty>> GetExpression<T, TProperty>(string propertyName)
        {
            // x =>
            var parameter = Expression.Parameter(typeof(T));
            // x.Name
            var mapProperty = Expression.Property(parameter, propertyName);
            // (object)x.Name
            var convertedExpression = Expression.Convert(mapProperty, typeof(TProperty));
            // x => (object)x.Name
            return Expression.Lambda<Func<T, TProperty>>(convertedExpression, parameter);
        }

        /// <summary>
        /// Combines two expression into a binary expression.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="expr1"></param>
        /// <param name="expr2"></param>
        /// <param name="binaryExpression"></param>
        /// <returns></returns>
        public static Expression<Func<T, bool>> Binary<T>(Func<Expression, Expression, BinaryExpression> binaryExpression, Expression<Func<T, bool>> expr1, Expression<Func<T, bool>> expr2)
        {
            // Need to detect whether they use the same
            // parameter instance. If not, they need fixing
            ParameterExpression param = expr1.Parameters[0];

            if (ReferenceEquals(param, expr2.Parameters[0]))
            {
                // Simple version
                return Expression.Lambda<Func<T, bool>>(binaryExpression(expr1.Body, expr2.Body), param);
            }

            // Otherwise, keep expr1 "as is" and invoke expr2
            return Expression.Lambda<Func<T, bool>>(binaryExpression(expr1.Body, Expression.Invoke(expr2, param)), param);
        }
    }
}
