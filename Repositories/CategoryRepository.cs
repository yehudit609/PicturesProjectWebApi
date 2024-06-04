using DTOs;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Repositories

{
    public class CategoryRepository : ICategoryRepository
    {
        private PicturesStore_326058609Context _picturesStoreContext;
        public CategoryRepository(PicturesStore_326058609Context picturesStoreContext)
        {
            _picturesStoreContext = picturesStoreContext;
        }

        public Task<User> addCategory(User user)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Category>> getCategories()
        {
            var foundCategories = await _picturesStoreContext.Categories.ToListAsync();
            if (foundCategories == null)
                return null;
            return foundCategories;
        }

        public Task<CategoryDto> getCategoryById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Category> updateCategory(int id, User userToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
