using System.Configuration;

namespace Hotel.Persistence.DbAccess
{
    public class DatabaseConfiguration
    {
        public static string MongoDbConnection
        {
            get { return ConfigurationManager.ConnectionStrings["MongoDB"].ConnectionString; }
        }
    }
}
