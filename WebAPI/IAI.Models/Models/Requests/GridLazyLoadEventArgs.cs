using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace IAI.Models.Models.Requests
{
    public class GridLazyLoadEventArgs<TFilter> : ILazyLoadEventArgs
    {
        public GridLazyLoadEventArgs() { }
        public int Skip { get; set; }
        public int Rows { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public TFilter? Filters { get; set; }
        public Dictionary<string, string> GetFieldMapping()
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            PropertyInfo[] props = typeof(TFilter).GetProperties();
            foreach(PropertyInfo prop in props)
            {
                object[] attrs = prop.GetCustomAttributes(true);
                foreach(object attr in attrs)
                {
                    DmMember authAttr = attr as DmMember;
                    if(authAttr != null)
                    {
                        string propName = prop.Name;
                        string auth = authAttr.Field;
                        dict.Add(propName, auth);
                    }
                }
            }
            return dict;
        }
    }

    public class DmMember : Attribute
    {
        public string? Field;

        public DmMember(string field)
        {
            Field = field;
        }
    }

    public interface ILazyLoadEventArgs
    {
        Dictionary<string, string> GetFieldMapping();
        int Skip { get; set; }
        int Rows { get; set; }
        string SortField { get; set; }
        string SortOrder { get; set; }
    }
}
