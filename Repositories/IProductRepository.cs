//using Entities;
using DTOs;

namespace Repositories
{
    public interface IProductRepository
    {
        //Task<User> addUser(User user);
        Task<Product> getProductById(int id);
        Task<List<Product>> getAllProducts();
        //Task<User> updateUser(int id, User userToUpdate);
    }
}