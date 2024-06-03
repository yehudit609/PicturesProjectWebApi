using Repositories;

namespace Services
{
    public interface IProductService
    {
        //Task<Product> addProduct(Product product);
        Task<Product> getProductById(int id);
        Task<List<Product>> getProducts(int position, int skip, string? desc, int? minPrice, int? maxPrice, int?[] categoryIds);
        //Task<Product> updateProduct(int id, Product productToUpdate);
    }
}