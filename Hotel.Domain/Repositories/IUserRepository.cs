using Hotel.Domain.Data;
using Hotel.Domain.Data.Enum;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> Login(string userName, string password);
        Task<bool> CreateNewUser(User newUser);
        Task<bool> UpdateUser(User user);
        Task<IEnumerable<User>> GetListUser(string searchFilter);
        Task<bool> ChangeUserStatus(string userName, Status status);
    }
}
