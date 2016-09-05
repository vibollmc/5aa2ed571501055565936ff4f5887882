using Hotel.Domain.Data.Enum;

namespace Hotel.Domain.Data
{
    public class OtherService : MongoEntity
    {
        public string Name { get; set; }
        public int InStock { get; set; }
        public string Unit { get; set; }
        public decimal Price { get; set; }
        public ServiceType Type { get; set; }
    }
}
