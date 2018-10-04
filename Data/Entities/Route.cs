﻿using System;
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
        public bool isShared { get; set; }
        public ICollection<Segment> Segments { get; set; }
    }
}
