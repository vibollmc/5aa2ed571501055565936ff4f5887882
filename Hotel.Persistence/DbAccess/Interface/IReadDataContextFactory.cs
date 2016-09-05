using MongoDB.Driver;

namespace Hotel.Persistence.DbAccess.Interface
{
    public interface IReadDataContextFactory
    {
        IMongoDatabase CreateMongoDbReadContext();
    }
}
