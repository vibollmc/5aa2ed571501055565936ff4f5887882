using Hotel.Persistence.DbAccess.Interface;
using System;
using MongoDB.Driver;
using Hotel.Domain.Data;

namespace Hotel.Persistence.DbAccess.Implement
{
    public class WriteDataContextFactory : IWriteDataContextFactory
    {
        private readonly MongoClient _mongoDbClient;
        private readonly string _connectionString;

        public WriteDataContextFactory()
        {
            
            _connectionString = DatabaseConfiguration.MongoDbConnection;

            //Set max connection idle time to 1 minute.
            //https://support.mongolab.com/entries/23009358-Handling-dropped-connections-on-Windows-Azure
            MongoDefaults.MaxConnectionIdleTime = TimeSpan.FromMinutes(1);

            MongoDefaults.ConnectTimeout = TimeSpan.FromMinutes(1);
            MongoDefaults.ServerSelectionTimeout = TimeSpan.FromMinutes(1);
            MongoDefaults.WaitQueueTimeout = TimeSpan.FromMinutes(1);
            MongoDefaults.OperationTimeout = TimeSpan.FromMinutes(1);
            MongoDefaults.SocketTimeout = TimeSpan.FromMinutes(1);
            MongoDefaults.WaitQueueTimeout = TimeSpan.FromMinutes(1);

            _mongoDbClient = new MongoClient(_connectionString);
        }

        public IMongoDatabase CreateMongoDbWriteContext()
        {
            var dbName = new MongoUrl(_connectionString).DatabaseName;

            return _mongoDbClient.GetDatabase(dbName);
        }
    }
}
