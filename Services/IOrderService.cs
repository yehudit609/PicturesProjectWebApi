using Repositories;

namespace Services
{
    public interface IOrderService
    {
        Task<Order> addOrder(Order order);
        Task<Order> getOrderById(int id);
        Task<Order> updateOrder(int id, Order orderToUpdate);
    }
}