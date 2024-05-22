using DTOs;
using Repositories;
using System.Data;
using System.Diagnostics;
using System.Diagnostics.Metrics;
using Zxcvbn;
namespace Services
{
    public class OrderService : IOrderService
    {
        private IOrderRepository _IOrderRepository;
        private IProductRepository _IProductRepository;
        public OrderService(IOrderRepository IOrderRepository, IProductRepository IProductRepository)
        {
            _IOrderRepository = IOrderRepository;
            _IProductRepository = IProductRepository;
        }

        public async Task<Order> addOrder(Order order)
        {
            order.OrderDate=DateOnly.FromDateTime(DateTime.Now.Date);
            order.OrderSum = await sumToPay(order.OrderItems);
            //order.OrderSum = order.OrderItems.Count();
            return await _IOrderRepository.addOrder(order);
        }


        public Task<Order> getAllOrders()
        {
            throw new NotImplementedException();
        }

        public Task<Order> getOrderById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<int> sumToPay(ICollection<OrderItem> orderItems)
        {
            decimal totalSum = 0;
            foreach (var item in orderItems)
            {
                Product p=await _IProductRepository.getProductById(item.ProductId);
                if (p == null)
                {
                    return 0;
                }
                int Counter = (int)(item.Quantity * p.Price);
                totalSum += Counter;
            }

            
            return (int)(totalSum);
        }
    }
}
