using DTOs;
using Repositories;
using System.Data;
using System.Diagnostics;
using Zxcvbn;
namespace Services
{
    public class UserService : IUserService
    {
        private IUserRepository _IUserRepository;
        public UserService(IUserRepository IUserRepository)
        {
            _IUserRepository = IUserRepository;
        }
        

        public Task<User> getUserById(int id)
        {
            return _IUserRepository.getUserById(id);
        }
        public Task<User> GetUserByEmailAndPassword(User userLogin)
        {

            return _IUserRepository.GetUserByEmailAndPassword(userLogin);
        }
        public Task<User> addUser(User user)
        {
            //Debugger;
            var scored = evalutePassword(user.Password);
            if (scored > 1)
                return _IUserRepository.addUser(user);
            else
                return null;
        }


        public Task<User> updateUser(int id, User userToUpdate)
        {
            //בדיקת הסיסמה
            return _IUserRepository.updateUser(id, userToUpdate);
        }
        public int evalutePassword(string password)
        {
            var result = Zxcvbn.Core.EvaluatePassword(password);
            return result.Score;
        }

        //public Task<User> addUser(User user)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
