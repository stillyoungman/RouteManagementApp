using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RouteManagementApp.Data.Access;
using RouteManagementApp.Entities;

namespace RouteManagementApp.Data
{
    public class UserRepository : IUserRepository
    {
        private MainContext _context;
        public UserRepository(MainContext context){
            _context = context;
        }
        public void Add(User user)
        {
            _context.Users.Add(user);
        }
        public bool Any(Func<User,bool> predicate)
        {
            return _context.Users.Any(predicate);
        }
        public DbSet<User> GetAll()
        {
            throw new System.NotImplementedException();
        }
        public User GetUserByEmail(string email)
        {
            throw new System.NotImplementedException();
        }
    }
}