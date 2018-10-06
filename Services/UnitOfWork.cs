using Microsoft.EntityFrameworkCore;
using RouteManagementApp.Data.Access;

namespace RouteManagementApp.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private MainContext _context;
        public UnitOfWork(MainContext context){
            _context = context;
        }
        public void Complete()
        {
            _context.SaveChanges();
        }
    }
}