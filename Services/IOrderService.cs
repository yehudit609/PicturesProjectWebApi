using DTOs;
using Repositories;

namespace Services
{
    public interface IOrderService
    {
        Task<Order> addOrder(Order orderDto);
        Task<Order> getAllOrders();
        Task<Order> getOrderById(int id);
        //Task<Order> updateOrder(int id, Order orderToUpdate);
    }
}