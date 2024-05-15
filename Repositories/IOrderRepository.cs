//using Entities;

using DTOs;

namespace Repositories
{
    public interface IOrderRepository
    {
        Task<User> addOrder(User user);
        Task<User> GetUserByEmailAndPassword(UserLoginDto userLogin);
        Task<User> getUserById(int id);
        Task<User> updateUser(int id, User userToUpdate);
    }
}