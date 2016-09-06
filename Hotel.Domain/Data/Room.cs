using Hotel.Domain.Data.Enum;
using Hotel.Domain.Data.MetaData;

namespace Hotel.Domain.Data
{
    public class Room : MongoEntity
    {
        public string Name { get; set; }
        public string RoomTypeId { get; set; }
        public Floor Floor { get; set; }
        public RoomStatus RoomStatus { get; set; }
    }
}
