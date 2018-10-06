using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace RouteManagementApp.Entities
{
    public class RouteDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool isShared { get; set; }
        public ICollection<Segment> Segments { get; set; }
    }
}
