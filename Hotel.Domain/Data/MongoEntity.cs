using Hotel.Domain.Data.Enum;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Hotel.Domain.Data
{
    [BsonIgnoreExtraElements]
    public class MongoEntity
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public Status Status { get; set; }

        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
    }
}
