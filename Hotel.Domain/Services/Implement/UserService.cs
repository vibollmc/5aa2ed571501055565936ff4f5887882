using Hotel.Domain.Services.Interface;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Hotel.Domain.Data;
using Hotel.Domain.Data.Enum;
using Hotel.Domain.Repositories;

namespace Hotel.Domain.Services.Implement
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> ChangeUserStatus(string userName, Status status)
        {
            return await _userRepository.ChangeUserStatus(userName, status);
        }

        public async Task<bool> CreateNewUser(User newUser)
        {
            return await _userRepository.CreateNewUser(newUser);
        }

        public async Task<IEnumerable<User>> GetListUser(string searchFilter)
        {
            return await _userRepository.GetListUser(searchFilter);
        }

        public async Task<User> Login(string userName, string password)
        {
            return await _userRepository.Login(userName, password);
        }

        public async Task<bool> UpdateUser(User user)
        {
            return await _userRepository.UpdateUser(user);
        }
    }
}
