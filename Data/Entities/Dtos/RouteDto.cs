using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace RouteManagementApp.Entities
{
    public class RouteDto
    {
        public int RouteId { get; set; }
        public string Name { get; set; }
        public ICollection<Segment> Segments { get; set; }
    }
}
