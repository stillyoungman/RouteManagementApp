using System;

namespace RouteManagementApp.Entities
{
    public class MarkerDto
    {
        public int MarkerId { get; set; }
        public string Name { get; set; }
        public string Type {get; set; }
        public string LatLang {get; set;}
        public string Properties { get; set; }
        
    }
}