using System.Threading.Tasks;
using Hotel.Domain.Data;
using System.Collections.Generic;
using Hotel.Domain.Data.Enum;

namespace Hotel.Domain.Repositories
{
    public interface IRoomTypeRepository
    {
        Task<bool> SaveRoomType(RoomType roomType);
        Task<IEnumerable<RoomType>> GetRoomType(string filterString);
        Task<bool> UpdateStatus(string id, Status status);
    }
}
