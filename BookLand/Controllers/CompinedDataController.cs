using BookLand.DTOs;
using BookLand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Data.SqlClient;

namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompinedDataController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CompinedDataController(MyDbContext db)
        {
            _db = db;
        }

        // GET: api/CompinedData/{userId}/fullProfile
        [HttpGet("{userId}/fullProfile")]
        public async Task<IActionResult> GetUserFullProfile(int userId)
        {
            var userProfile = await _db.Users
                .Where(u => u.Id == userId)
                .Select(u => new UserFullProfileDto
                {
                    Name = u.Name,
                    Email = u.Email,
                    Image =u.Image,
                    PhoneNumber = u.PhoneNumber,
                    Address = u.Address,

                    ProfessionalTitle = u.UserDetail.ProfessionalTitle,
                    Languages = u.UserDetail.Languages,
                    Age = u.UserDetail.Age,
                    Description = u.UserDetail.Description,
                    Country = u.UserDetail.Country,
                    City = u.UserDetail.City,
                    Postcode = u.UserDetail.Postcode
                })
                .FirstOrDefaultAsync();

            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        // PUT: api/CompinedData/{userId}/fullProfile
        [HttpPut("{userId}/fullProfile")]
        public async Task<IActionResult> UpdateUserFullProfile(int userId, [FromBody] UserFullProfileDto updatedProfile)
        {
            var user = await _db.Users
                .Include(u => u.UserDetail)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound();
            }

            // Check for unique constraints before making changes
            if (await _db.Users.AnyAsync(u => u.Email == updatedProfile.Email && u.Id != userId))
            {
                return Conflict("A user with this email already exists.");
            }

            // Update user basic information
            user.Name = updatedProfile.Name;
            user.Email = updatedProfile.Email;
            user.Image = updatedProfile.Image;
            user.PhoneNumber = updatedProfile.PhoneNumber;
            user.Address = updatedProfile.Address;

            // If UserDetail doesn't exist, create a new UserDetail entity
            if (user.UserDetail == null)
            {
                user.UserDetail = new UserDetail
                {
                    ProfessionalTitle = updatedProfile.ProfessionalTitle,
                    Languages = updatedProfile.Languages,
                    Age = updatedProfile.Age,
                    Description = updatedProfile.Description,
                    Country = updatedProfile.Country,
                    City = updatedProfile.City,
                    Postcode = updatedProfile.Postcode,
                    UserId = userId // Set the foreign key
                };

                _db.UserDetails.Add(user.UserDetail); // Add the new UserDetail entity to the context
            }
            else
            {
                // Update user contact details from UserDetail
                user.UserDetail.ProfessionalTitle = updatedProfile.ProfessionalTitle ?? user.UserDetail.ProfessionalTitle;
                user.UserDetail.Languages = updatedProfile.Languages ?? user.UserDetail.Languages;
                user.UserDetail.Age = updatedProfile.Age ?? user.UserDetail.Age;
                user.UserDetail.Description = updatedProfile.Description ?? user.UserDetail.Description;
                user.UserDetail.Country = updatedProfile.Country ?? user.UserDetail.Country;
                user.UserDetail.City = updatedProfile.City ?? user.UserDetail.City;
                user.UserDetail.Postcode = updatedProfile.Postcode ?? user.UserDetail.Postcode;
            }

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx)
            {
                // Log the detailed error
                Console.WriteLine(sqlEx.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "Database update error.");
            }

            return NoContent(); // Return 204 to indicate successful update
        }

    }
}