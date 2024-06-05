using Repositories;
using Testing;
using DTOs;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}


﻿

