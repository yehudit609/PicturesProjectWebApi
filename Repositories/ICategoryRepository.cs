//using Entities;
using DTOs;

namespace Repositories
{
    public interface ICategoryRepository
    {
        //Task<User> addCategory(User user);
        //Task<User> GetUserByEmailAndPassword(UserLogin userLogin);
        Task<CategoryDto> getCategoryById(int id);
        Task<List<Category>> getCategories();
        //Task<Category> updateCategory(int id, User userToUpdate);
    }
}