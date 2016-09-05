using Hotel.Domain.Data.Enum;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
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
        public string IdNumber { get; set; }
        public string UrlImage { get; set; }
        public GroupUser Group { get; set; }
    }
}
