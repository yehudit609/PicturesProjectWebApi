using Repositories;
using System.Data;
using System.Diagnostics;
using Zxcvbn;
namespace Services
{
    public class OrderService : IProductService
    {
        private IOrderRepository _IOrderRepository;

        public Task<List<Product>> getAllProducts()
        {
            throw new NotImplementedException();
        }

        public Task<Product> getProductById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
