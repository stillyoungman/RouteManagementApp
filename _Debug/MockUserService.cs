using System;
using System.Collections.Generic;
using RouteManagementApp.Entities;
using RouteManagementApp.Services;

namespace RouteManagementApp.Debug {
    public class MockUserService : IUserService
    {
        public User Authenticate(string email, string password)
        {
            return new User{
                UserId = 1532,
                Email = email,
                Name = "Saul",
            };
        }

        public User Create(User user, string password)
        {
            return user;
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public User GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(User user, string password = null)
        {
            throw new NotImplementedException();
        }
    }
}