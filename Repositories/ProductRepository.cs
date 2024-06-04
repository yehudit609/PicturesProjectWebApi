using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Product>> getProducts(int position, int skip, string? desc, int? minPrice, int? maxPrice, int?[] categoryIds)
        {
            
            var query = _picturesStoreContext.Products.Where(product =>
                (desc == null ? (true) : (product.ProductName.Contains(desc)))
                && ((minPrice == null) ? (true) : (product.Price >= minPrice))
                && ((maxPrice == null) ? (true) : (product.Price <= maxPrice))
                && ((categoryIds.Length == 0) ? (true) : (categoryIds.Contains(product.CategoryId)))).OrderBy(product => product.Price);
            Console.WriteLine(query.ToQueryString());
            List<Product> products = await query.ToListAsync();
            return products;
        }
    }
}
