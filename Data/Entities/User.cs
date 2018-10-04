using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace RouteManagementApp.Entities
{
    [Table("Users")]
    public class User
    {
        public User()
        {
            // Routes = new Collection<Route>();
        }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public ICollection<Route> Routes { get; set; }
    }

}
