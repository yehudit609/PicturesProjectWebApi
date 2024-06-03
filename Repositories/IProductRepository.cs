//using Entities;
using DTOs;

namespace Repositories
{
    public interface IProductRepository
    {
        //Task<User> addUser(User user);
        Task<Product> getProductById(int id);
        Task<List<Product>> getProducts(int position, int skip, string? desc, int? minPrice, int? maxPrice, int?[] categoryIds);
        //Task<User> updateUser(int id, User userToUpdate);

    }
}