using System;

namespace RouteManagementApp.Entities
{
    public class Marker
    {
        public int MarkerId { get; set; }
        public string Name { get; set; }
        public string Type {get; set; }
        public string Location {get; set;}
        public string Properties { get; set; }
        
    }
}