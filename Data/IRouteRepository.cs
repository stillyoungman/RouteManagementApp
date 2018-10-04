using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using RouteManagementApp.Entities;

namespace RouteManagementApp.Data
{
    public interface IRouteRepository
    {
        void Add(Route r);
        bool Any(Func<Route,bool> predicate);
        Route GetRoute(int routeId);
        ICollection<Route> GetRoutes(int userId, bool isEager = false);
    }
}
