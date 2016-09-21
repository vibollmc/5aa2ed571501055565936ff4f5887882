using System.Configuration;

namespace HMS.Core.DataAccess
{
    public class DatabaseConfiguration
    {
        public static string MongoDbConnection => ConfigurationManager.ConnectionStrings["MongoDB"].ConnectionString;
    }
}
