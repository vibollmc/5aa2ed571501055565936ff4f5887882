using Hotel.Domain.Data;
using Hotel.Domain.Data.Enum;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Domain.Services.Interface
{
    public interface IRoomTypeService
    {
        Task<bool> SaveRoomType(RoomType roomType);
        Task<IEnumerable<RoomType>> GetRoomType(string filterString);
        Task<bool> UpdateStatus(string id, Status status);
    }
}
