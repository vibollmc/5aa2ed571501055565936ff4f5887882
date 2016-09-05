using MongoDB.Driver;

namespace Hotel.Persistence.DbAccess.Interface
{
    public interface IWriteDataContextFactory
    {
        IMongoDatabase CreateMongoDbWriteContext();
    }
}
