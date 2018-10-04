using System;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using RouteManagementApp.Data;
using RouteManagementApp.Entities;
using RouteManagementApp.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace RouteManagementApp.Controllers
{
    [Route("api/[controller]")]
    public class RouteController : Controller
    {
        private IRouteRepository _rep;
		public RouteController(IRouteRepository rep){
            _rep = rep;
        }

        [HttpGet("[action]")]
        public IActionResult GetRoute([FromQuery] int id){
            //if not Authorized, will be thrown NRF!!!! !Q!
            var uid = HttpContext.User.Claims.FirstOrDefault( c => c.Type == "uid") == null ? null : HttpContext.User.Claims.FirstOrDefault( c => c.Type == "uid").Value;
            var route = _rep.GetRoute(id);

            if (route == null){
                return NotFound();
            }

            if(route.UserId.ToString() != uid && !route.isShared){
                return Forbid();
            }

            return Ok(new {
                route = route
            });
        }
        
        // [Authorize]
        [HttpGet("[action]")]
        public IActionResult GetRoutes(){
            var uid = HttpContext.GetUserId();
            return Ok( new {
                routes = _rep.GetRoutes(uid)
            });
        }


    }
}
