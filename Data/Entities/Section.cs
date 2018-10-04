using System;

namespace RouteManagementApp.Entities
{
    public class Section
    {
        public int SectionId { get; set; }
        public Marker Marker { get; set; }
        public string Path { get; set; }
        public int Distance { get; set; }
        
    }
}