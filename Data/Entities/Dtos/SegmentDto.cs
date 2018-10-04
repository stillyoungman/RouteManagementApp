using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace RouteManagementApp.Entities
{
    public class SegmentDto
    {
        public SegmentDto(){
            Sections = new Collection<Section>();
        }
        public int SegmentId { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public string Properties { get; set; }
        public int Distance { get; set; }
        public ICollection<Section> Sections { get; set; }
    }
}