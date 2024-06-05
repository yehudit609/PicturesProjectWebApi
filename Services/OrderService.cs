using DTOs;
using Microsoft.Extensions.Logging;
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
        private ILogger<OrderService> _logger;
        public OrderService(IOrderRepository IOrderRepository, IProductRepository IProductRepository, ILogger<OrderService> logger)
        {
            _IOrderRepository = IOrderRepository;
            _IProductRepository = IProductRepository;
            _logger = logger;
        }

        public async Task<Order> addOrder(Order order)
        {
            order.OrderDate=DateOnly.FromDateTime(DateTime.Now.Date);
            int sumPay = await sumToPay(order.OrderItems);
            if (sumPay != order.OrderSum)
                //_logger.LogInformation($"sum to pay is not valid. id: {order.UserId}");
                _logger.LogError($"user {order.UserId}  tried perchasing with a difffrent price {order.OrderSum} instead of {sumPay}");
                _logger.LogInformation($"user {order.UserId}  tried perchasing with a difffrent price {order.OrderSum} instead of {sumPay}");
            order.OrderSum = sumPay;
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

        private async Task<int> sumToPay(ICollection<OrderItem> orderItems)
        {
            int totalSum = 0;
            foreach (var item in orderItems)
            {
                Product p=await _IProductRepository.getProductById(item.ProductId);
                int Counter = item.Quantity * (int)p.Price;
                totalSum += Counter;
            }

            
            return (int)(totalSum);
        }
    }
}
