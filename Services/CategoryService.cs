using DTOs;
using Repositories;
using System.Data;
using System.Diagnostics;
using Zxcvbn;
namespace Services
{
    public class CategoryService : ICategoryService
    {
        private ICategoryRepository _ICategoryRepository;
        public CategoryService(IUserRepository IUserRepository, ICategoryRepository categoryRepository)
        {
            _ICategoryRepository = categoryRepository;
        }

        public Task<Category> addCategory(Category category)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Category>> getCategories()
        {
            return await _ICategoryRepository.getCategories();
        }

        public Task<Category> getCategoryById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Category> updateCategory(int id, Category categoryToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
