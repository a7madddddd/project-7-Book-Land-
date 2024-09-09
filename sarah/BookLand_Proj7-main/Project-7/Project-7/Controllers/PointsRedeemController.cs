using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTO;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointsRedeemController : ControllerBase
    {
        private readonly MyDbContext _db;

        public PointsRedeemController(MyDbContext dbContext)
        {
            _db = dbContext;
        }

        [HttpGet("GetALLRedeem")]
        public IActionResult GetALLRedeem()
        {
            var points = _db.PointsRedeems.ToList();
            return Ok(points);
        }

        [HttpGet("GetAllRedeem/id/{id:int}")]
        public IActionResult GetAllRedeemByID(int id)
        {
            if (id < 0)
            {
                return BadRequest("Invalid point ID.");
            }

            var points = _db.PointsRedeems.Find(id);
            if (points == null)
            {
                return NotFound("Point not found.");
            }

            return Ok(points);
        }

        [HttpPut("UpdateRedeem/{id:int}")]
        public IActionResult UpdateRedeem(int id, [FromForm] PointsRedeemDTO pointsRedeemDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var point = _db.PointsRedeems.Find(id);
            if (point == null)
            {
                return NotFound("Point not found.");
            }

            point.PointsAmount = pointsRedeemDTO.PointsAmount;
            point.DiscountPercentage = pointsRedeemDTO.DiscountPercentage;
            point.SpinningWheel = pointsRedeemDTO.SpinningWheel;



            _db.PointsRedeems.Update(point);
            _db.SaveChanges();

            return Ok("Point updated successfully.");
        }
    }
}
