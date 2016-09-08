using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Hotel.Domain.Data;
using Hotel.Domain.Data.Enum;
using Hotel.Domain.Repositories;
using Hotel.Persistence.DbAccess.Interface;
using MongoDB.Driver;
namespace Hotel.Persistence
{
    public class RoomTypeRepository : IRoomTypeRepository
    {
        private readonly IReadDataContextFactory _readDataContextFactory;
        private readonly IWriteDataContextFactory _writeDataContextFactory;

        public RoomTypeRepository(IReadDataContextFactory readDataContextFactory,
            IWriteDataContextFactory writeDataContextFactory)
        {
            _readDataContextFactory = readDataContextFactory;
            _writeDataContextFactory = writeDataContextFactory;
        }

        public async Task<IEnumerable<RoomType>> GetRoomType(string filterString)
        {
            var collection = _readDataContextFactory.CreateMongoDbReadContext().GetCollection<RoomType>(MongoDbCollectionName.RoomType);
            var filter = Builders<RoomType>.Filter.Where(x => x.Name.Contains(filterString));

            return await collection.Find(filter).ToListAsync();
        }

        public async Task<bool> SaveRoomType(RoomType roomType)
        {
            var collection = _writeDataContextFactory.CreateMongoDbWriteContext().GetCollection<RoomType>(MongoDbCollectionName.RoomType);
            var filter = Builders<RoomType>.Filter.Eq(x => x.Id, roomType.Id);

            var type = await collection.Find(filter).FirstOrDefaultAsync();

            if (type != null)
            {
                await collection.ReplaceOneAsync(filter, roomType);
                return true;
            }

            await collection.InsertOneAsync(roomType);

            return true;
        }

        public async Task<bool> UpdateStatus(string id, Status status)
        {
            var collection = _writeDataContextFactory.CreateMongoDbWriteContext().GetCollection<RoomType>(MongoDbCollectionName.RoomType);
            var filter = Builders<RoomType>.Filter.Eq(x => x.Id.ToString(), id);
            var update = Builders<RoomType>.Update.Set(x => x.Status, status);

            await collection.UpdateOneAsync(filter, update);

            return true;
        }
    }
}
