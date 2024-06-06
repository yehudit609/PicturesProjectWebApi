using DTOs;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Repositories

{
    public class OrderRepository : IOrderRepository
    {
        private PicturesStore_326058609Context _picturesStoreContext;
        public OrderRepository(PicturesStore_326058609Context picturesStoreContext)
        {
            _picturesStoreContext = picturesStoreContext;
        }

        public async Task<Order> addOrder(Order order)
        {            
                await _picturesStoreContext.Orders.AddAsync(order);
                await _picturesStoreContext.SaveChangesAsync();
                return order;  
        }

        //public async Task<Order> addOrder(OrderDto orderDto)
        //{
        //    try
        //    {
        //        // Map OrderDto to Order entity
        //        Order order = _mapper.Map<Order>(orderDto);

        //        await _picturesStoreContext.Orders.AddAsync(order);
        //        await _picturesStoreContext.SaveChangesAsync();
        //        return order;
        //    }
        //    catch (Exception err)
        //    {
        //        return null;
        //    }
        //}

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
