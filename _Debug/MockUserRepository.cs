using System;
using Microsoft.EntityFrameworkCore;
using RouteManagementApp.Data;
using RouteManagementApp.Entities;

namespace RouteManagementApp.Debug {

    public class MockUserRepository : IUserRepository
    {
        public void Add(User user)
        {
            throw new NotImplementedException();
        }

        public bool Any(Func<User, bool> predicate)
        {
            return false;
        }

        public DbSet<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public User GetUserByEmail(string email)
        {
            throw new NotImplementedException();
        }
    }
}