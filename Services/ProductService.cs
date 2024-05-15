using Repositories;
using System.Data;
using System.Diagnostics;
using Zxcvbn;
namespace Services
{
    public class ProductService : IProductService
    {
        private IProductRepository _IProductRepository;

        public ProductService(IProductRepository IProductRepository)
        {
            _IProductRepository = IProductRepository;
        }


        public async Task<List<Product>> getAllProducts()
        {
            return await _IProductRepository.getAllProducts();
        }

        public async Task<Product> getProductById(int id)
        {
            return await _IProductRepository.getProductById(id);
        }
    }
}
