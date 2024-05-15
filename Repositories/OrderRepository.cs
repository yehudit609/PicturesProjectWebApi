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

        public Task<User> addOrder(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserByEmailAndPassword(UserLoginDto userLogin)
        {
            throw new NotImplementedException();
        }

        public Task<User> getUserById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<User> updateUser(int id, User userToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
