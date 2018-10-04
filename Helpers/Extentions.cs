using System;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace RouteManagementApp.Helpers
{
    public static class MvcExtentions{
        public static int GetUserId(this HttpContext context){
            var uid = context.User.Claims.Any( c => c.Type == "uid") ?  context.User.Claims.First( c => c.Type == "uid").Value : null;
             return Int32.Parse(uid);
        }
    }
    
}