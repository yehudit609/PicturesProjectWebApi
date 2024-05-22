//using Entities;

using DTOs;

namespace Repositories
{
    public interface IOrderRepository
    {
        Task<Order> addOrder(Order order);
        Task<Order> getOrderById(int id);
        Task<Order> getAllOrders();
        //Task<Order> updateOrder(int id, Order OrderToUpdate);
    }
}