using Repositories;

namespace Services
{
    public interface ICategoryService
    {
        Task<Category> addCategory(Category category);
        Task<Category> getCategoryById(int id); 
        Task<List<Category>> getCategories();
        Task<Category> updateCategory(int id, Category categoryToUpdate);
    }
}