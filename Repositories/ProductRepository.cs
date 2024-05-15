using Microsoft.EntityFrameworkCore;
using System.Text.Json;
namespace Repositories
   
{
    public class ProductRepository : IProductRepository
    {
        private PicturesStore_326058609Context _picturesStoreContext;
        public ProductRepository(PicturesStore_326058609Context picturesStoreContext)
        {
            _picturesStoreContext = picturesStoreContext;
        }

        public async Task<Product> getProductById(int id)
        {
            var foundProduct = await _picturesStoreContext.Products.FindAsync(id);
            if (foundProduct == null)
                return null;
            return foundProduct;
        }

        public async Task<List<Product>> getAllProducts()
        {
            var foundProduct = await _picturesStoreContext.Products.ToListAsync();
            if (foundProduct == null)
                return null;
            return foundProduct;
        }
    }
}
