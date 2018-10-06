using System;
using System.Collections.Generic;
using RouteManagementApp.Data.Access;
using RouteManagementApp.Entities;

namespace RouteManagementApp.Data
{
    public class RouteRepository : IRouteRepository
    {
        private MainContext _context;

        public RouteRepository(MainContext context){
            this._context = context;
        }
        public void Add(Route r)
        {
            _context.Routes.Add(r);
        }

        public bool Any(Func<Route, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public Route GetRoute(int id)
        {
            throw new System.NotImplementedException();
        }

        public ICollection<Route> GetRoutes(int userId, bool isEager = false)
        {
            throw new NotImplementedException();
        }
    }
}