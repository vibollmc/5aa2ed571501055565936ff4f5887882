using Hotel.Domain.Data.Enum;
using System;

namespace Hotel.Domain.Data
{
    public class User : MongoEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public DateTime DOB { get; set; }
        public Gender Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string IdNumber { get; set; }
        public string UrlImage { get; set; }
        public GroupUser Group { get; set; }
        public DateTime LastLoginDate { get; set; }
    }
}
