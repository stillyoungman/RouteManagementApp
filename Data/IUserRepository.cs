using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using RouteManagementApp.Entities;

namespace RouteManagementApp.Data
{
    public interface IUserRepository
    {
        void Add(User user);
        User GetUserByEmail(string email);
        DbSet<User> GetAll();
        bool Any(Func<User, bool> predicate);
    }
}