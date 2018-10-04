using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RouteManagementApp.Entities;
using System.Data;
using System.Linq;
using RouteManagementApp.Data;
using RouteManagementApp.Services;
using AutoMapper;
using RouteManagementApp.Helpers;

namespace RouteManagementApp.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private const string KEY = "mySuperSecretKey!12345678_easy";
        private IUserRepository _rep;
        private IUserService _userService;
        private IMapper _mapper;
        public AuthController(
            IUserRepository rep, 
            IUserService userService,
            IMapper mapper)
        {
            _rep = rep;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("auth")]
        public IActionResult Authenticate([FromBody]LoginUserDto userDto)
        {
            //Map(userDto);
            //
            var user = _userService.Authenticate(userDto.Email, userDto.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            var key = Encoding.ASCII.GetBytes(KEY);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("uid", user.UserId.ToString()),
                    new Claim("name", user.Name),
                    new Claim("email", user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                access_token = tokenString
            });
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterUserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);

            try {
                _userService.Create(user, userDto.Password);
                return Ok(user);
            } catch (AppException ex){
                return BadRequest( new {
                    message = ex.Message
                });
            }
        }
        [HttpPost("token")]
        public IActionResult GetToken([FromBody] User user)
        {

            if (string.IsNullOrEmpty(user.Email) ||
            string.IsNullOrEmpty(user.UserId.ToString()) ||
            string.IsNullOrEmpty(user.Name)){
                return BadRequest();
            }

            var key = Encoding.ASCII.GetBytes(KEY);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("uid", user.UserId.ToString()),
                    new Claim("name", user.Name),
                    new Claim("email", user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                access_token = tokenString
            });
        }
    }
}