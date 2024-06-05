using Repositories;
using Testing;
using DTOs;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Testing
{
    public class UserRepositoryIntegretionTest : IClassFixture<DatabaseFixture>
    {
        private readonly PicturesStore_326058609Context _dbContext;
        private readonly UserRepository _userRepository;

        public UserRepositoryIntegretionTest(DatabaseFixture databaseFixture)
        {
            _dbContext = databaseFixture.Context;
            _userRepository = new UserRepository(_dbContext);

        }

        //test for login
        [Fact]
        public async Task GetUser_ValidCredentials_RetrnUser()
        {
            var email = "test@gmail.com";
            var password = "password";
            var user = new User { Email = email, Password = password, FirstName = "test", LastName = "test22" };
            var userLogin = new User { Email = email, Password = password, FirstName = null, LastName = null };
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            var result = await _userRepository.GetUserByEmailAndPassword(userLogin);
            Assert.NotNull(result);
        }



        // Integration test for updateUser without firstname and lastname
        //[Fact]
        //public async Task updateUser_ValidIdAndUser_ReturnsUpdatedUser()
        //{
        //    // Arrange
        //    var existingUser = new User { Email = "existing@example.com", Password = "password" };
        //    await _dbContext.Users.AddAsync(existingUser);
        //    await _dbContext.SaveChangesAsync();

        //    // Detach existing entity to avoid tracking issues
        //    _dbContext.Entry(existingUser).State = EntityState.Detached;

        //    var userToUpdate = new User { Email = "updated@example.com", Password = "newpassword" };

        //    // Act
        //    var result = await _userRepository.updateUser(existingUser.UserId, userToUpdate);

        //    // Assert
        //    Assert.Equal(existingUser.UserId, result.UserId);
        //    Assert.Equal("updated@example.com", result.Email);
        //    Assert.Equal("newpassword", result.Password);
        //}

        // Integration test for updateUser
        [Fact]
        public async Task updateUser_ValidIdAndUser_ReturnsUpdatedUser()
        {
            // Arrange
            var existingUser = new User
            {
                Email = "existing@example.com",
                Password = "password",
                FirstName = "ExistingFN", // Shorter first name
                LastName = "ExistingLN"   // Shorter last name
            };
            await _dbContext.Users.AddAsync(existingUser);
            await _dbContext.SaveChangesAsync();

            // Detach existing entity to avoid tracking issues
            _dbContext.Entry(existingUser).State = EntityState.Detached;

            var userToUpdate = new User
            {
                Email = "updated@example.com",
                Password = "newpassword",
                FirstName = "UpdatedFN", // Shorter first name
                LastName = "UpdatedLN"   // Shorter last name
            };

            // Act
            var result = await _userRepository.updateUser(existingUser.UserId, userToUpdate);

            // Assert
            Assert.Equal(existingUser.UserId, result.UserId);
            Assert.Equal("updated@example.com", result.Email);
            Assert.Equal("newpassword", result.Password);
            Assert.Equal("UpdatedFN", result.FirstName);
            Assert.Equal("UpdatedLN", result.LastName);
        }
    }
    }
