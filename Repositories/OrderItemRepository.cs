//using Microsoft.EntityFrameworkCore;
//using System.Text.Json;
//namespace Repositories
   
//{
//    public class UserRepository : IUserRepository
//    {
//        private PicturesStore_326058609Context _picturesStoreContext;
//        public UserRepository(PicturesStore_326058609Context picturesStoreContext)
//        {
//            _picturesStoreContext = picturesStoreContext;
//        }

//        public async Task<User> getUserById(int id)
//        {
//            var foundUser = await _picturesStoreContext.Users.FindAsync(id);
//            if (foundUser==null)
//                return null;
//            await _picturesStoreContext.SaveChangesAsync();
//            return foundUser;
//        }

//        public async Task<User> GetUserByEmailAndPassword(UserLogin userLogin)
//        {
//            return await _picturesStoreContext.Users.Where(e => e.Email == userLogin.Email && e.Password == userLogin.Password).FirstOrDefaultAsync();
//        }

//        public async Task<User> addUser(User user)
//        {
//            try { 
//            await _picturesStoreContext.Users.AddAsync(user);           
//            await _picturesStoreContext.SaveChangesAsync();
//            return user;
//            }
//            catch (Exception err)
//            {
//                return null;
//            }
//        }
//        public async Task<User> updateUser(int id, User userToUpdate)
//        {
//            try {
//                userToUpdate.UserId = id;
//                _picturesStoreContext.Update(userToUpdate);
//                await _picturesStoreContext.SaveChangesAsync();
//                return userToUpdate;
//            } catch(Exception err)
//            {
//                throw err;
//            }


           
//        }

        
//    }
//}
