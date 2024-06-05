using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Moq;
using Moq.EntityFrameworkCore;
using Repositories;

namespace Testing
{
    public class userRepositoryUnittest
    {
        //happy test for login
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

        //happy test for update

        [Fact]
        public async Task updateUser_ValidIdAndUser_ReturnsUpdatedUser()
        {
            // Arrange
            var userToUpdate = new User { Email = "updated@example.com", Password = "newpassword" };
            var id = 1;
            var mockSet = new Mock<DbSet<User>>();
            var mockContext = new Mock<PicturesStore_326058609Context>();
            mockContext.Setup(m => m.Users).Returns(mockSet.Object);
            mockContext.Setup(m => m.Update(It.IsAny<User>())).Verifiable();
            // Mock SaveChangesAsync
            mockContext.Setup(m => m.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
            var userRepository = new UserRepository(mockContext.Object);
            // Act
            var result = await userRepository.updateUser(id, userToUpdate);
            // Assert
            Assert.Equal(id, result.UserId);
            Assert.Equal(userToUpdate.Email, result.Email);
            Assert.Equal(userToUpdate.Password, result.Password);
            mockContext.Verify(x => x.Update(It.Is<User>(u => u.UserId == id && u.Email == userToUpdate.Email && u.Password == userToUpdate.Password)), Times.Once);
            mockContext.Verify(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        //unhappy test for update
        [Fact]
        public async Task updateUser_ContextThrowsException_ThrowsException()
        {
            var user = new User { Email = "test@example.com", Password = "password" };
            var userNotEqual = new User { Email = "t@example.com", Password = "password" };
            var mockContex = new Mock<PicturesStore_326058609Context>();
            var users = new List<User>() { user };
            mockContex.Setup(x => x.Users).ReturnsDbSet(users);
            var userRepository = new UserRepository(mockContex.Object);
            var result = await userRepository.GetUserByEmailAndPassword(userNotEqual);
            Assert.Null(result);
        }

        //happy test for register
        [Fact]
        public async Task addUser_ValidUser_ReturnsAddedUser()
        {
            // Arrange
            var newUser = new User { Email = "newuser@example.com", Password = "newpassword" };
            var mockSet = new Mock<DbSet<User>>();
            var mockContext = new Mock<PicturesStore_326058609Context>();

            mockContext.Setup(m => m.Users).Returns(mockSet.Object);
            mockSet.Setup(m => m.AddAsync(It.IsAny<User>(), It.IsAny<CancellationToken>())).ReturnsAsync((User u, CancellationToken ct) => null);  // Adjust if necessary
            mockContext.Setup(m => m.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

            var userRepository = new UserRepository(mockContext.Object);

            // Act
            var result = await userRepository.addUser(newUser);

            // Assert
            Assert.Equal(newUser.Email, result.Email);
            Assert.Equal(newUser.Password, result.Password);
            mockSet.Verify(x => x.AddAsync(It.Is<User>(u => u.Email == newUser.Email && u.Password == newUser.Password), It.IsAny<CancellationToken>()), Times.Once);
            mockContext.Verify(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }



    }
}
