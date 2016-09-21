﻿using MongoDB.Driver;

namespace HMS.Core.DataAccess.Interface
{
    public interface IWriteDataContextFactory
    {
        IMongoDatabase CreateMongoDbWriteContext();
    }
}