using BookLand.DTOs;
using BookLand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly MyDbContext _db;
        public UserProfileController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _db.Users.ToList();
            return Ok(users);
        }


        /// //////////////////////////////////////////////
        ///
        //[HttpGet("{userId}")]
        //public async Task<ActionResult<UserRequestDTOs>> GetUserProfile(int userId)
        //{
        //    var user = await _db.Users
        //        .Where(u => u.Id == userId)
        //        .Select(u => new UserRequestDTOs
        //        {
        //            Name = u.Name,
        //            Email = u.Email,
        //            PhoneNumber = u.PhoneNumber,
        //            Address = u.Address,
        //        })
        //        .FirstOrDefaultAsync();

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(user);
        //}
        /////////////////////////////////////////////////////

        ///// ///////////////////////////////////////////////
        //[HttpPut("{id}")]
        //public IActionResult EditUser([FromForm] UserRequestDTOs userRequestDTOs, int id)
        //{

        //    //var UsersImages = Path.Combine(Directory.GetCurrentDirectory(), "UsersImages");

        //    //if (!Directory.Exists(UsersImages))
        //    //{
        //    //    Directory.CreateDirectory(UsersImages);
        //    //}

        //    //if (userRequestDTOs.Image != null) { 

        //    //    var UserImageFile = Path.Combine(UsersImages, userRequestDTOs.Image);

        //    //    using (var stream = new FileStream(UserImageFile, FileMode.Create)) {


        //    //        userRequestDTOs.Image.CopyTo(stream);
        //    //    }

        //    //}

        //    var editUserById = _db.Users.Where(u => u.Id == id).FirstOrDefault();

        //    if (editUserById == null)
        //    {
        //        return BadRequest("User not found.");
        //    }

        //    editUserById.Name = userRequestDTOs.Name;
        //    editUserById.Address = userRequestDTOs.Address;
        //    editUserById.Email = userRequestDTOs.Email;
        //    editUserById.PhoneNumber = userRequestDTOs.PhoneNumber;

        //    _db.Update(editUserById);
        //    _db.SaveChanges();

        //    return Ok(editUserById);
        //}
        ///////////////////////////////////////////////////////////////
        [HttpPost]
        public IActionResult PostContactDetails([FromForm] ContactUsDTO contactUsDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(string.Join(", ", errors));  // Return validation errors for debugging
            }

            // Log the incoming data
            Console.WriteLine("Contact received: " + contactUsDto.Name + ", " + contactUsDto.Email);

            var newContact = new ContactU
            {
                Name = contactUsDto.Name,
                Email = contactUsDto.Email,
                Subject = contactUsDto.Subject,
                Message = contactUsDto.Message,
                Id = contactUsDto.Id ?? 0
            };

            _db.ContactUs.Add(newContact);
            _db.SaveChanges();

            return Ok("Contact details have been saved.");
        }



        /// /////////////////////////////////////////////////////////////////////

        //[HttpPost("wishlist")]
        //public IActionResult AddToWishlist([FromForm] Wishlist wishlistItem)
        //{
        //    if (wishlistItem.UserId == null || wishlistItem.BookId == null)
        //    {
        //        return BadRequest("Invalid data.");
        //    }

        //    var existingItem = _db.Wishlists
        //        .FirstOrDefault(w => w.UserId == wishlistItem.UserId && w.BookId == wishlistItem.BookId);

        //    if (existingItem != null)
        //    {
        //        return Conflict("This item is already in your wishlist.");
        //    }

        //    _db.Wishlists.Add(wishlistItem);
        //    _db.SaveChanges();

        //    return Ok("Item added to wishlist.");
        //}

        //////////////////////////////////////////


        [HttpGet("byUserId/{userId}")]
        public IActionResult GetWishlistByUserIdall(int userId)
        {
            var wishlist = _db.Wishlists
                                        .Where(a => a.UserId == userId)
                                        .ToList();

            if (wishlist == null || !wishlist.Any())
            {
                return NotFound();
            }

            return Ok(wishlist);
        }

        [HttpDelete("remove/{userId}/{bookId}")]
        public IActionResult RemoveFromWishlist(int userId, int bookId)
        {
            var wishlistItem = _db.Wishlists.FirstOrDefault(w => w.UserId == userId && w.BookId == bookId);

            if (wishlistItem == null)
            {
                return NotFound();
            }

            _db.Wishlists.Remove(wishlistItem);
            _db.SaveChanges();

            return Ok(new { message = "Item removed from wishlist" });
        }

        [HttpGet("wishlist/{userId}")]
        public IActionResult GetWishlistForUser(int userId)
        {
            var wishlistItems = _db.Wishlists
                .Where(w => w.UserId == userId)
                .Include(w => w.Book)  // Ensure you have a relationship set to include Book details
                .ToList();

            if (!wishlistItems.Any())
            {
                return NotFound("No items found in the wishlist for the specified user.");
            }

            var result = wishlistItems.Select(w => new
            {
                ProductId = w.Book.Id,
                ProductName = w.Book.Title,
                UnitPrice = w.Book.Price,
                ProductImage = w.Book.ImageUrl
            }).ToList();

            return Ok(result);
        }

        /// //////////////////////////
        /// 


        [HttpGet("{userId}")]
        public async Task<ActionResult<UserRequestDTOs>> GetUserProfile(int userId)
        {
            var user = await _db.Users
                .Where(u => u.Id == userId)
                .Select(u => new UserRequestDTOs
                {
                    Name = u.Name,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    Address = u.Address,
                    Image = u.Image // Assuming Image column contains the image file name or URL
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }





    }
}

