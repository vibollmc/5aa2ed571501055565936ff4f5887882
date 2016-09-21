using Hotel.Domain.Data;
using Hotel.Domain.Data.Enum;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Api
{
    public interface IHotelApi
    {
        #region User Management
        Task<User> Login(string userName, string password);
        Task<bool> CreateNewUser(User newUser);
        Task<bool> UpdateUser(User user);
        Task<IEnumerable<User>> GetListUser(string searchFilter);
        Task<bool> ChangeUserStatus(string userName, Status status);
        #endregion User Management

        #region Room type management
        Task<bool> SaveRoomType(RoomType roomType);
        Task<IEnumerable<RoomType>> GetRoomType(string filterString);
        Task<bool> UpdateRoomTypeStatus(string id, Status status);
        #endregion Room type management
    }
}
