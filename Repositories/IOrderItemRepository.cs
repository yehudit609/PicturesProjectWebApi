//using Entities;

using DTOs;

namespace Repositories
{
    public interface IOrderItemRepository
    {
        OrderItemDto addOrderItem(OrderItem orderItem);
        //Task<OrderItem> getOrderItemById(int id);
        Task<List<OrderItem>> getAllOrderItems();
        Task<OrderItem> updateOrderItem(int id, OrderItem orderItemToUpdate);
        Task<OrderItem> deleteOrderItem(int id);
        Task<OrderItem> deleteAllOrderItems();
    }
}