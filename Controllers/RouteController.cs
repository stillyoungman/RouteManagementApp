﻿using System;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using RouteManagementApp.Data;
using RouteManagementApp.Entities;
using RouteManagementApp.Helpers;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using RouteManagementApp.Services;
using RouteManagementApp.Data.Access;
using System.Collections;
using System.Collections.Generic;

namespace RouteManagementApp.Controllers
{

    [Route("api/[controller]")]
    public class RouteController : Controller
    {
        private IRouteRepository _rep;
        private IMapper _mapper;
        private IUnitOfWork _uof;
        public RouteController(
            IRouteRepository rep,
            IMapper mapper,
            IUnitOfWork uof)
        {
            _rep = rep;
            _mapper = mapper;
            _uof = uof;
        }

        [HttpGet("[action]")]
        public IActionResult GetRoute([FromQuery] int id)
        {
            //if not Authorized, will be thrown NRF!!!! !Q!
            var uid = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "uid") == null ? null : HttpContext.User.Claims.FirstOrDefault(c => c.Type == "uid").Value;
            var route = _rep.GetRoute(id);

            if (route == null)
            {
                return NotFound();
            }

            if (route.UserId.ToString() != uid && !route.isShared)
            {
                return Forbid();
            }

            return Ok(new
            {
                route = route
            });
        }

        [Authorize]
        [HttpGet("[action]")]
        public IActionResult GetRoutes()
        {
            try
            {
                var uid = HttpContext.GetUserId();

                IList<RouteDto> routesDto = new List<RouteDto>();
                foreach (var r in _rep.GetRoutes(uid))
                {
                    routesDto.Add(_mapper.Map<RouteDto>(r));
                }
                return Ok(new
                {
                    routes = routesDto
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult SaveRoute([FromBody] RouteDto routeDto)
        {
            try
            {
                var route = _mapper.Map<Route>(routeDto);
                route.Created = DateTime.UtcNow.ToString();
                route.UserId = HttpContext.GetUserId();
                _rep.Add(route);
                _uof.Complete();
                return Ok(new
                {
                    routeId = route.RouteId
                });
            }
            catch
            {
                return BadRequest(new
                {
                    message = "Can't save route."
                });
            }
        }

        [Authorize]
        [HttpPut("[action]")]
        public IActionResult UpdateRoute([FromBody] RouteDto routeDto)
        {
            try
            {
                var route = _mapper.Map<Route>(routeDto);

                if (this.HttpContext.GetUserId() != route.UserId)
                {
                    return Forbid();
                }

                var dbInstance = _rep.GetRoute(route.RouteId);
                if (dbInstance != null)
                {
                    dbInstance.UpdateRoute(route);
                    _uof.Complete();
                }

                return Ok();
            }
            catch
            {
                return BadRequest();
            }

        }
    }

}
