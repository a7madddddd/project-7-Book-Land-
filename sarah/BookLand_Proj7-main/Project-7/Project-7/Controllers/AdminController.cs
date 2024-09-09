using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.DTO;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly TokenGenerator _tokenGenerator;
        //private readonly IEmailService _emailService;

        public AdminController(MyDbContext dbContext, TokenGenerator tokenGenerator)
        {
            _db = dbContext;
            _tokenGenerator = tokenGenerator;
        }

        [HttpGet("GetAllAdmins")]
        public IActionResult GetAllAdmins()
        {
            var admin = _db.Admins.ToList();
            return Ok(admin);
        }

        // Get admin by ID
        [HttpGet("GetAdminById/{id:int}")]
        public IActionResult GetAdminById(int id)
        {
            if (id < 0)
            {
                return BadRequest("Invalid admin ID.");
            }

            var admin = _db.Admins.Find(id);
            if (admin == null)
            {
                return NotFound("Admin not found.");
            }

            return Ok(admin);
        }

        // Get admin by name
        [HttpGet("GetAdminByName/{name}")]
        public IActionResult GetAdminByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Admin name is required.");
            }

            var admin = _db.Admins.FirstOrDefault(c => c.Name == name);
            if (admin == null)
            {
                return NotFound("Admin not found.");
            }

            return Ok(admin);
        }

        [HttpPost("AddNewAdmin")]
        public IActionResult AddNewAdmin([FromForm] AdminActionDTO adminactionDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the email already exists
            if (_db.Admins.Any(a => a.Email == adminactionDTO.Email))
            {
                return BadRequest("Admin with this email already exists.");
            }

            // Create password hash and salt
            PasswordHasher.CreatePasswordHash(adminactionDTO.Password, out var hash, out var salt);

            var admin = new Admin
            {
                Name = adminactionDTO.Name,
                Email = adminactionDTO.Email,
                PasswordHash = hash,
                PasswordSalt = salt
            };

            _db.Admins.Add(admin);
            _db.SaveChanges();
            return Ok(admin);
        }


        [HttpPut("UpdateAdmin/{id:int}")]
        public IActionResult UpdateAdmin(int id, [FromForm] AdminUpdateDTO adminDTO)
        {
            if (id < 0 || !ModelState.IsValid)
            {
                return BadRequest("Invalid input.");
            }

            var admin = _db.Admins.Find(id);
            if (admin == null)
            {
                return NotFound("Admin not found.");
            }

            admin.Name = adminDTO.Name;
            admin.Email = adminDTO.Email;

            _db.Admins.Update(admin);
            _db.SaveChanges();

            return Ok("Admin updated successfully.");
        }


        // Delete admin
        [HttpDelete("DeleteAdmin/{id:int}")]
        public IActionResult DeleteAdmin(int id)
        {
            if (id < 0)
            {
                return BadRequest("Invalid admin ID.");
            }

            var admin = _db.Admins.Find(id);
            if (admin == null)
            {
                return NotFound("Admin not found.");
            }

            _db.Admins.Remove(admin);
            _db.SaveChanges();

            return NoContent();
        }


        [HttpPost("Login")]
        public IActionResult Login([FromForm] AdminDTO adminDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var admin = _db.Admins.FirstOrDefault(a => a.Email == adminDTO.Email);
            if (admin == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            // Verify password
            if (!PasswordHasher.VerifyPasswordHash(adminDTO.Password, admin.PasswordHash, admin.PasswordSalt))
            {
                return Unauthorized("Invalid credentials.");
            }

            var roles = new List<string> { "Admin" }; // Adjust roles as needed
            var token = _tokenGenerator.GenerateToken(adminDTO.Email, roles);

            return Ok(new { Token = token });
        }


    }
}

