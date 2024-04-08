
using System.Collections.ObjectModel;

namespace IAI.Models.Models.Responses
{
    public class BaseResponse<T>
    {
        public BaseResponse(T data, List<string> errorMessages, List<string> warningMessages, List<string> informationMessages)
        {
            Data = data;
            ErrorMessages = errorMessages;
            WarningMessages = warningMessages;
            InformationMessages = informationMessages;
        }
        public bool IsSuccess
        {
            get
            {
                return (!ErrorMessages.Any());
            }
        }
        public List<string> ErrorMessages { get; set; } = new List<string>();
        public List<string> WarningMessages { get; set; } = new List<string>();
        public List<string> InformationMessages { get; set; } = new List<string>();
        public T Data { get; }
    }

    public class BaseResponseList<T>
    {
        public BaseResponseList(List<T> items, List<string> errorMessages, List<string> warningMessages, List<string> informationMessages)
        {
            Items = items;
            ErrorMessages = errorMessages;
            WarningMessages = warningMessages;
            InformationMessages = informationMessages;
        }
        public bool IsSuccess
        {
            get
            {
                return (!ErrorMessages.Any());
            }
        }
        public List<string> ErrorMessages { get; set; } = new List<string>();
        public List<string> WarningMessages { get; set; } = new List<string>();
        public List<string> InformationMessages { get; set; } = new List<string>();
        public List<T> Items { get; }
    }
}
