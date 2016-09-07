using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Hotel.Api;
using Hotel.Domain.Data;
using Hotel.Domain.Data.Enum;
using Hotel.Domain.Services.Interface;

namespace Hotel
{
    public class HotelApi : IHotelApi
    {
        private readonly IUserService _userService;

        public HotelApi(IUserService userService)
        {
            this._userService = userService;
        }
        public async Task<bool> ChangeUserStatus(string userName, Status status)
        {
            return await this._userService.ChangeUserStatus(userName, status);
        }

        public async Task<bool> CreateNewUser(User newUser)
        {
            return await this._userService.CreateNewUser(newUser);
        }

        public async Task<IEnumerable<User>> GetListUser(string searchFilter)
        {
            return await this._userService.GetListUser(searchFilter);
        }

        public async Task<User> Login(string userName, string password)
        {
            return await this._userService.Login(userName, password);
        }

        public async Task<bool> UpdateUser(User user)
        {
            return await this._userService.UpdateUser(user);
        }
    }
}
