using BookLand.DTOs;
using BookLand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class LoginAndRegister : ControllerBase
    {

        private readonly MyDbContext _db;

        private readonly TokenGenerator _tokenGenerator;

        public LoginAndRegister(MyDbContext db, TokenGenerator tokenGenerator)
        {
            _db = db;
            _tokenGenerator = tokenGenerator;
        }




        [HttpPost("register")]
        public IActionResult Register([FromForm] UsersDTO model)
        {

            var existingUser = _db.Users.FirstOrDefault(u => u.Email == model.Email);

            if (existingUser != null)
                return BadRequest("The user already exists.");


            byte[] passwordHash, passwordSalt;

            PasswordHasher.CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);

            var user = new User
            {
                Name = model.Name,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Email = model.Email,
            };

            _db.Users.Add(user);
            _db.SaveChanges();

            return Ok(user);



        }




        [HttpPost("login")]
        public IActionResult Login([FromForm] LoginDTO model)
        {
            var newUser = _db.Users.FirstOrDefault(x => x.Email == model.Email);

            var token = _tokenGenerator.GenerateToken(newUser.Name);

            if (!PasswordHasher.VerifyPasswordHash(model.Password, newUser.PasswordHash, newUser.PasswordSalt))
            {
                return Unauthorized("Invalid username or password.");
            }
            else if (newUser == null)
            {
                return BadRequest("user doesn't exist. please sign up.");
            }
            else
            {
                return Ok(new { Token = token, newUser.Id });
            }
        }



    }
}
