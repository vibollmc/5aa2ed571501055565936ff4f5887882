using Hotel.Domain.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using HMS.Core.DataAccess.Interface;
using Hotel.Domain.Data;
using Hotel.Domain.Data.Enum;
using MongoDB.Driver;

namespace Hotel.Persistence
{
    public class UserRepository : IUserRepository
    {
        private readonly IReadDataContextFactory _readDataContextFactory;
        private readonly IWriteDataContextFactory _writeDataContextFactory;
        public UserRepository(IReadDataContextFactory readDataContextFactory, IWriteDataContextFactory writeDataContextFactory)
        {
            _readDataContextFactory = readDataContextFactory;
            _writeDataContextFactory = writeDataContextFactory;
        }

        public async Task<bool> ChangeUserStatus(string userName, Status status)
        {
            var userCollection = this._writeDataContextFactory.CreateMongoDbWriteContext().GetCollection<User>(MongoDbCollectionName.User);
            var filter = Builders<User>.Filter.Eq(x => x.UserName, userName);
            var update = Builders<User>.Update.Set(x => x.Status, status);

            await userCollection.UpdateOneAsync(filter, update);

            return true;
        }

        public async Task<bool> CreateNewUser(User newUser)
        {
            var userCollection = this._writeDataContextFactory.CreateMongoDbWriteContext().GetCollection<User>(MongoDbCollectionName.User);
            await userCollection.InsertOneAsync(newUser);
            return true;
        }

        public async Task<IEnumerable<User>> GetListUser(string searchFilter)
        {
            var userCollection = this._readDataContextFactory.CreateMongoDbReadContext().GetCollection<User>(MongoDbCollectionName.User);
            var filter = Builders<User>.Filter.Where(x => searchFilter.Contains(x.FullName) || searchFilter.Contains(x.UserName) || searchFilter.Contains(x.IdNumber));

            var results = await userCollection.Find(filter).ToListAsync();

            return results;
        }

        public async Task<User> Login(string userName, string password)
        {
            var userCollection = this._readDataContextFactory.CreateMongoDbReadContext().GetCollection<User>(MongoDbCollectionName.User);
            var filter = Builders<User>.Filter.Or(
                Builders<User>.Filter.Eq(x => x.UserName, userName),
                Builders<User>.Filter.Eq(x => x.Password, password));

            var user = await userCollection.Find(filter).FirstOrDefaultAsync();

            return user;
        }

        public async Task<bool> UpdateUser(User user)
        {
            var userCollection = this._writeDataContextFactory.CreateMongoDbWriteContext().GetCollection<User>(MongoDbCollectionName.User);
            var filter = Builders<User>.Filter.Where(x => x.UserName == user.UserName || x.Id == user.Id);
            await userCollection.ReplaceOneAsync(filter, user);

            return true;
        }
    }
}
