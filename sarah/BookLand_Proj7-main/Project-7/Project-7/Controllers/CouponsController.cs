using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTO;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CouponsController(MyDbContext dbContext)
        {
            _db = dbContext;
        }

        // Get all coupons
        [HttpGet("GetAllCoupons")]
        public IActionResult GetAllCoupons()
        {
            var coupons = _db.Coupons.ToList();
            return Ok(coupons);
        }

        // Get coupon by ID
        [HttpGet("GetCouponById/{id:int}")]
        public IActionResult GetCouponById(int id)
        {
            var coupon = _db.Coupons.Find(id);
            if (coupon == null)
            {
                return NotFound("Coupon not found.");
            }

            return Ok(coupon);
        }

        // Create a new coupon
        [HttpPost("CreateCoupon")]
        public IActionResult CreateCoupon([FromBody] CouponDTO couponDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var coupon = new Coupon
            {
                Name = couponDTO.Name,
                DiscountAmount = couponDTO.DiscountAmount,
                ExpirationDate = couponDTO.ExpirationDate,
                Status = couponDTO.Status
            };

            _db.Coupons.Add(coupon);
            _db.SaveChanges();

            return Ok(coupon);
        }

        // Update an existing coupon
        [HttpPut("UpdateCoupon/{id:int}")]
        public IActionResult UpdateCoupon(int id, [FromForm] CouponDTO couponDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var coupon = _db.Coupons.Find(id);
            if (coupon == null)
            {
                return NotFound("Coupon not found.");
            }

            coupon.Name = couponDTO.Name;
            coupon.DiscountAmount = couponDTO.DiscountAmount;
            coupon.ExpirationDate = couponDTO.ExpirationDate; 
            coupon.Status = couponDTO.Status;

            _db.Coupons.Update(coupon);
            _db.SaveChanges();

            return Ok(coupon);
        }

        // Delete a coupon
        [HttpDelete("DeleteCoupon/{id:int}")]
        public IActionResult DeleteCoupon(int id)
        {
            var coupon = _db.Coupons.Find(id);
            if (coupon == null)
            {
                return NotFound("Coupon not found.");
            }

            _db.Coupons.Remove(coupon);
            _db.SaveChanges();

            return NoContent();
        }

    }
}
