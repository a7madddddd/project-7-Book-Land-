using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTO;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EarningPointsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public EarningPointsController(MyDbContext dbContext)
        {
            _db = dbContext;
        }

        [HttpGet("GetALLPoints")]
        public IActionResult GetAllEarningRules()
        {
            var points = _db.EarningPoints.ToList();
            return Ok(points);
        }

        [HttpGet("GetAllEarningPoints/id/{id:int}")]
        public IActionResult GetAllEarningPointsByID(int id)
        {
            if (id < 0)
            {
                return BadRequest("Invalid point ID.");
            }

            var points = _db.EarningPoints.Find(id);
            if (points == null)
            {
                return NotFound("Point not found.");
            }

            return Ok(points);
        }

        [HttpPut("UpdateEarningPoints/{id:int}")]
        public IActionResult UpdateEarningPoints(int id, [FromForm] EarningPointsDTO earningpointsDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var point = _db.EarningPoints.Find(id);
            if (point == null)
            {
                return NotFound("Point not found.");
            }

            point.SocialMediaShare = earningpointsDTO.SocialMediaShare;
            point.BookPurchase = earningpointsDTO.BookPurchase;
            point.InviteFriend = earningpointsDTO.InviteFriend;



            _db.EarningPoints.Update(point);
            _db.SaveChanges();

            return Ok("Point updated successfully.");
        }
    }
}
