using Microsoft.EntityFrameworkCore;
using RouteManagementApp.Entities;

namespace RouteManagementApp.Data.Access
{
    public class MainContext : DbContext
    {

        public MainContext(DbContextOptions<MainContext> options):base(options) { 
                
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Route> Routes { get; set; }

    }
}