using DTOs;
//using Entities;

namespace Repositories
{
    public interface IUserRepository
    {
        Task<User> addUser(User user);
        Task<User> GetUserByEmailAndPassword(User userLogin);
        Task<User> getUserById(int id);
        Task<User> updateUser(int id, User userToUpdate);
    }
}