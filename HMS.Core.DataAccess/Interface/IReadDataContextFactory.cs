using MongoDB.Driver;

namespace HMS.Core.DataAccess.Interface
{
    public interface IReadDataContextFactory
    {
        IMongoDatabase CreateMongoDbReadContext();
    }
}
