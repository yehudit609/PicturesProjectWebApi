using Repositories;

namespace Services
{
    public interface IOrderItemService
    {
        Task<OrderItem> addOrderItem(OrderItem orderItem);
        Task<OrderItem> getOrderItemById(int id);
        Task<OrderItem> updateOrderItem(int id, OrderItem orderItemToUpdate);
    }
}