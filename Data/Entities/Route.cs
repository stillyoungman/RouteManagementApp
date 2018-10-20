using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace RouteManagementApp.Entities
{
    [Table("Routes")]
    public class Route
    {
        public Route()
        {
            Segments = new Collection<Segment>();
        }
        public int RouteId { get; set; }

        //!Q! will it work? OwnerId?
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Bounds { get; set; }
        public string Created { get; set; }
        public string Location { get; set; }
        public int Distance { get; set; }
        public bool isShared { get; set; }
        public ICollection<Segment> Segments { get; set; }

        public void UpdateRoute(Route r){
            this.Name = r.Name;
            this.Description = r.Description;
            this.Location = r.Location;
            this.isShared = r.isShared; 
        }

        public override String ToString(){
            return $"ID: {this.RouteId},\nuid: {this.UserId},\nName: {this.Name}";
        }
    }
}
