using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using Moq.EntityFrameworkCore;
using Repositories;

namespace Testing
{
    public class userRepositoryUnittest
    {
        [Fact]
        public async Task getUser_ValidCredentials_ReturnsUser()
        {
            var user = new User { Email = "test@example.com", Password = "password" };
            var mockContext = new Mock<PicturesStore_326058609Context>();
            var users = new List<User>() { user };
            mockContext.Setup(x => x.Users).ReturnsDbSet(users); 
            var userRepository = new UserRepository(mockContext.Object);
            var result = await userRepository.GetUserByEmailAndPassword(user);
            Assert.Equal(user, result);
        }



    }
}
