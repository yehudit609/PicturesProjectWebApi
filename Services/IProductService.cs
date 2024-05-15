using Repositories;

namespace Services
{
    public interface IProductService
    {
        //Task<Product> addProduct(Product product);
        Task<Product> getProductById(int id);
        Task<List<Product>> getAllProducts();
        //Task<Product> updateProduct(int id, Product productToUpdate);
    }
}