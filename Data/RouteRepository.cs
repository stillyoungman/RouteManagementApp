using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using RouteManagementApp.Data.Access;
using RouteManagementApp.Entities;

namespace RouteManagementApp.Data
{
    public class RouteRepository : IRouteRepository
    {
        private MainContext _context;

        public RouteRepository(MainContext context)
        {
            this._context = context;
        }
        public void Add(Route r)
        {
            _context.Routes.Add(r);
        }

        public bool Any(Func<Route, bool> predicate)
        {
            return _context.Routes.Any(predicate);
        }
        
        public Route GetRoute(int id)
        {
            return _context.Routes
            .Where(route => route.RouteId == id)
            .Include(route => route.Segments)
            .ThenInclude(segment => segment.Sections)
            .ThenInclude( section => section.Marker )
            .FirstOrDefault();
        }

        public ICollection<Route> GetRoutes(int userId, bool isEager = false)
        {
            return _context.Routes.Where(r => r.UserId == userId).ToList();
        }
    }
}