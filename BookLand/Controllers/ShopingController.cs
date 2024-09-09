using BookLand.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopingController : ControllerBase
    {
        private readonly MyDbContext _db;
        public ShopingController(MyDbContext db)
        {
            _db = db;
        }

        // return all categories :
        [HttpGet("categories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _db.Categories.ToListAsync();
            return Ok(categories);
        }

        //fetch all books, including their categories and other related data:
        [HttpGet("books")]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _db.Books.ToListAsync();
            return Ok(books);
        }


        // return books that belong to a specific category :
        
        [HttpGet("categories/books")]
        public async Task<IActionResult> GetBooksByCategories([FromQuery] List<int> categoryIds)
        {
            if (categoryIds == null || !categoryIds.Any())
            {
                return BadRequest("No categories specified.");
            }
          
            var books = await _db.Books
                .Where(b => b.Categories.Any(c => categoryIds.Contains(c.Id)))
                .Select(b => new
                {
                    b.Id,
                    b.Title,
                    b.Author,
                    b.Publisher,
                    b.YearPublished,
                    b.Description,
                    b.Price,
                    b.DiscountPercentage,
                    b.ImageUrl,
                    b.Rating,
                    CommentsCount = b.CommentsReviews.Count,
                    Categories = b.Categories.Select(c => new { c.Id, c.Name }).ToList()
                })
                .ToListAsync();

            return Ok(books);
        }



        // Get a book by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _db.Books
                .Where(b => b.Id == id)
                .Select(b => new
                {
                    b.Id,
                    b.Title,
                    b.Author,
                    b.Publisher,
                    b.YearPublished,
                    b.Description,
                    b.Price,
                    b.DiscountPercentage,
                    b.ImageUrl,
                    b.Rating,
                    CommentsCount = b.CommentsReviews.Count,
                    Categories = b.Categories.Select(c => new { c.Id, c.Name }).ToList()
                })
                .FirstOrDefaultAsync();

            if (book == null)
            {
                return NotFound($"No book found with ID {id}.");
            }

            return Ok(book);
        }

        [HttpGet("{id}/comments")]
        public async Task<IActionResult> GetCommentsForBook(int id)
        {
            var comments = await _db.CommentsReviews
                                    .Include(c => c.User)  // Ensure the User related to each comment is included
                                    .Where(c => c.BookId == id)
                                    .Select(c => new
                                    {
                                        c.Id,
                                        UserName = c.User.Name,
                                        UserImage = c.User.Image,  // Getting the image URL from the User entity
                                        c.CommentText,
                                         c.Rating
                                    })
                                    .ToListAsync();

            if (comments == null || !comments.Any())
            {
                return NotFound(new { Message = "No comments found for this book." });
            }

            return Ok(comments);
        }


 
        // GET api/carts/5/items
        [HttpGet("{userId}/items")]
        public async Task<ActionResult> GetCartItems(int userId)
        {
            var cart = await _db.Carts
                                     .Include(c => c.CartItems)
                                     .ThenInclude(ci => ci.Book)  // Optional, remove if you do not need book details
                                     .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("No cart found for the given user.");
            }

            return Ok(cart.CartItems.Select(ci => new
            {
                CartItemId = ci.Id,
                image = ci.Book.ImageUrl,
                CartId = ci.CartId,
                BookId = ci.BookId,
                BookTitle = ci.Book?.Title,  // Assuming the Book model has a Title property
                Quantity = ci.Quantity,
                Price = ci.Price,
                Format = ci.Format
            }));
        }

        [HttpPost("validate")]
        public ActionResult<Coupon> ValidateCoupon([FromBody] string couponCode)
        {
            var coupon = _db.Coupons
                .Where(c => c.Name == couponCode && c.ExpirationDate > DateOnly.FromDateTime(DateTime.Now) && c.Status == "Active")
                .FirstOrDefault();

            if (coupon == null)
                return NotFound("Coupon not valid or expired.");

            return Ok(coupon);
        }

    }


}

