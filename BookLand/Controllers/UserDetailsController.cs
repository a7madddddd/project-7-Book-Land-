using BookLand.DTOs;
using BookLand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly MyDbContext _db;


        public UserDetailsController(MyDbContext db) { 
            
            _db = db;

        }


        [HttpGet("{userInfoId}")]
        public async Task<ActionResult<UserDetailsDto>> GetUserDetails(int userInfoId)
        {
            var user = await _db.UserDetails
                .Select(u => new UserDetailsDto
                {
                    UserId = u.UserId, // Map from the `user_id` column
                    ProfessionalTitle = u.ProfessionalTitle,
                    Languages = u.Languages,
                    Age = u.Age,
                    Description = u.Description,
                    Country = u.Country,
                    City = u.City,
                    Postcode = u.Postcode
                })
                .FirstOrDefaultAsync(u => u.UserId == userInfoId); // Query by `user_id`

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }







    }
}
