namespace HMS.Web.Main.Models
{
    public enum ResultCode
    {
        Undefined = 0,
        Error = 1,
        Success = 2,
        Warning = 3
    }
    public class Results<T>
    {
        public Results()
        {
            
        }

        public Results(ResultCode code, string message)
        {
            this.Code = code;
            this.Message = message;
        }

        public Results(T data)
        {
            this.Data = data;
            this.Code = ResultCode.Success;
        }

        public Results(ResultCode code, string message, T data)
        {
            this.Code = code;
            this.Message = message;
            this.Data = data;
        }

        public Results(string message, T data)
        {
            this.Message = message;
            this.Data = data;
        }

        public Results(string message)
        {
            this.Message = message;
            this.Code = ResultCode.Error;
        }

        public ResultCode Code { get; set; }
        public T Data { get; set; }
        public string Message { get; set; }
    }
}