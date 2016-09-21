using System.Collections.Generic;
using System.Threading.Tasks;
using HMS.DependencyInjection;
using Hotel.Api;
using Hotel.Domain.Data;
using Hotel.Domain.Data.Enum;
using Hotel.Domain.Services.Interface;

namespace Hotel
{
    public class HotelApi : IHotelApi
    {
        private readonly ICompositionContainer _container;

        public HotelApi(ICompositionContainer container)
        {
            this._container = container;
        }
        #region User management
        public async Task<bool> ChangeUserStatus(string userName, Status status)
        {
            var userService = _container.Resolve<IUserService>();
            return await userService.ChangeUserStatus(userName, status);
        }

        public async Task<bool> CreateNewUser(User newUser)
        {
            var userService = _container.Resolve<IUserService>();
            return await userService.CreateNewUser(newUser);
        }

        public async Task<IEnumerable<User>> GetListUser(string searchFilter)
        {
            var userService = _container.Resolve<IUserService>();
            return await userService.GetListUser(searchFilter);
        }

        public async Task<User> Login(string userName, string password)
        {
            var userService = _container.Resolve<IUserService>();
            return await userService.Login(userName, password);
        }

        public async Task<bool> UpdateUser(User user)
        {
            var userService = _container.Resolve<IUserService>();
            return await userService.UpdateUser(user);
        }
        #endregion User management

        #region Room type management
        public async Task<bool> SaveRoomType(RoomType roomType)
        {
            var roomtypeService = _container.Resolve<IRoomTypeService>();
            return await roomtypeService.SaveRoomType(roomType);
        }

        public async Task<IEnumerable<RoomType>> GetRoomType(string filterString)
        {
            var roomtypeService = _container.Resolve<IRoomTypeService>();
            return await roomtypeService.GetRoomType(filterString);
        }

        public async Task<bool> UpdateRoomTypeStatus(string id, Status status)
        {
            var roomtypeService = _container.Resolve<IRoomTypeService>();
            return await roomtypeService.UpdateStatus(id, status);
        }
        #endregion Room type management
    }
}
