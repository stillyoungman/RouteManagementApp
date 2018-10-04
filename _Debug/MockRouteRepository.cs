using System;
using System.Collections.Generic;
using RouteManagementApp.Data;
using RouteManagementApp.Entities;

namespace RouteManagementApp.Debug
{
    public class MockRouteRepository : IRouteRepository
    {
        List<Route> routes;
        public MockRouteRepository()
        {
            this.routes = new List<Route>();
            routes.Add(new Route
            {
                RouteId = 1,
                Name = "First Route [from MOCK]"
            });
        }
        public ICollection<Route> GetRoutesByUser(int id) => throw new NotImplementedException();


        public void Add(Route r)
        {
            throw new NotImplementedException();
        }

        public bool Any(Func<Route, bool> predicate)
        {
            return false;
        }

        public Route GetRoute(int routeId)
        {
            return this.routes[0];

        }

        public ICollection<Route> GetRoutes(int userId, bool isEager = false)
        {
            throw new NotImplementedException();
        }
    }
}
