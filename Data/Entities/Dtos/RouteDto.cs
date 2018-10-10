using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace RouteManagementApp.Entities
{
    public class RouteDto
    {
        public int RouteId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Created { get; set; }
        public string Bounds { get; set; }
        public string Location { get; set; }
        public int Distance { get; set; }
        public bool isShared { get; set; }
        public ICollection<Segment> Segments { get; set; }
    }
}
