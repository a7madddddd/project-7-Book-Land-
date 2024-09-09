using BookLand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly MyDbContext _myDbContext;

        public WishlistController(MyDbContext myDbContext)
        {
            _myDbContext = myDbContext;
        }
        [HttpGet]
        public IActionResult GetAllWishlist()
        {
            var Wishlist = _myDbContext.Wishlists.ToList();
            return Ok(Wishlist);
        }

        [HttpGet("byIDWishlist/{id}")]
        public IActionResult GetWishlistById(int id)
        {
            var Wishlist = _myDbContext.Wishlists.FirstOrDefault(a => a.Id == id);
            if (Wishlist == null)
            {
                return NotFound();
            }
            return Ok(Wishlist);
        }
        [HttpGet("byUserIdone/{userId}")]
        public IActionResult GetWishlistByUserId(int userId)
        {
            var wishlist = _myDbContext.Wishlists.FirstOrDefault(a => a.UserId == userId);
            if (wishlist == null)
            {
                return NotFound();
            }
            return Ok(wishlist);
        }
        [HttpGet("byUserId/{userId}")]
        public IActionResult GetWishlistByUserIdall(int userId)
        {
            var wishlist = _myDbContext.Wishlists
                                        .Where(a => a.UserId == userId).
                                        Take(3)
                                        .ToList();

            if (wishlist == null || !wishlist.Any())
            {
                return NotFound();
            }

            return Ok(wishlist);
        }

        [HttpGet("byUserIdTotalPrice/{userId}")]
        public IActionResult GetWishlistByUserIdall1(int userId)
        {
            var wishlist = _myDbContext.Wishlists
                                        .Where(a => a.UserId == userId).
                                        Take(3)
                                        .ToList();

            if (wishlist == null || !wishlist.Any())
            {
                return NotFound();
            }

            return Ok(wishlist);
        }





        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var wishlist = _myDbContext.Wishlists.Find(id);
            if (wishlist == null)
            {
                return NotFound();
            }
            _myDbContext.Wishlists.Remove(wishlist);
            _myDbContext.SaveChanges();
            return Ok();
        }
        [HttpGet("wishlistItemCount/{userId}")]
        public IActionResult GetWishlistItemCountByUserId(int userId)
        {
            var itemCount = _myDbContext.Wishlists
                                        .Count(a => a.UserId == userId);

            if (itemCount == 0)
            {
                return NotFound();
            }

            return Ok(new { Count = itemCount });
        }

    }
}
