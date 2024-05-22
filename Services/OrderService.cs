using DTOs;
using Repositories;
using System.Data;
using System.Diagnostics;
using Zxcvbn;
namespace Services
{
    public class OrderService : IOrderService
    {
        private IOrderRepository _IOrderRepository;
        public OrderService(IOrderRepository IOrderRepository)
        {
            _IOrderRepository = IOrderRepository;
        }

        public Task<Order> addOrder(Order order)
        {
            order.OrderDate=DateOnly.FromDateTime(DateTime.Now.Date);
            //order.OrderSum = order.OrderItems.Count();
            return _IOrderRepository.addOrder(order);
        }

        public Task<Order> getAllOrders()
        {
            throw new NotImplementedException();
        }

        public Task<Order> getOrderById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
