using BookLand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemController : ControllerBase
    {

        private readonly MyDbContext _myDbContext;

        public CartItemController(MyDbContext myDbContext)
        {
            _myDbContext = myDbContext;
        }
        [HttpGet]
        public IActionResult GetAllCartItem()
        {
            var CartItem = _myDbContext.CartItems.ToList();
            return Ok(CartItem);
        }

        [HttpGet("byIDCartItem/{id}")]
        public IActionResult GetCartItemById(int id)
        {
            var CartItem = _myDbContext.CartItems.FirstOrDefault(a => a.Id == id);
            if (CartItem == null)
            {
                return NotFound();
            }
            return Ok(CartItem);
        }
        [HttpGet("byIDCartItemtTotal2/{user_id}")]
        public IActionResult GetCartTotalByCartId(int user_id)
        {
            var totalAmount = _myDbContext.CartItems
                .Where(a => a.Cart.UserId == user_id)
                .Sum(a => a.Price * a.Quantity);

            return Ok(new { TotalPrice = totalAmount });
        }

        [HttpGet("byIDCartItem3/{cart_id}")]
        public IActionResult GetCartItemCountByCartId(int cart_id)
        {
            var itemCount = _myDbContext.CartItems
                .Where(a => a.CartId == cart_id)
                .Count();

            if (itemCount == 0)
            {
                return NotFound("No items found for the specified cart ID.");
            }

            return Ok(new { ItemCount = itemCount });
        }

        [HttpGet("topPriceCartItems/{user_id}")]
        public IActionResult GetTopPriceCartItems(int user_id)
        {
            var cartItems = _myDbContext.CartItems
                .Where(a => a.Cart.UserId == user_id)
                .OrderByDescending(a => a.Price)
                .Take(3)
                .Select(a => new
                {
                    ItemId = a.Id,
                    a.Book.Title,
                    a.Price,
                    a.Quantity,
                    a.Cart.UserId,
                    UserProfilePicture = a.Book.ImageUrl
                })
                .ToList();

            if (cartItems == null || cartItems.Count == 0)
            {
                return NotFound("No item found.");
            }

            return Ok(cartItems);
        }


        [HttpGet("cartItemCount/{userId}")]
        public IActionResult GetcartItemCountByUserId(int userId)
        {
            var itemCount = _myDbContext.CartItems
                                        .Count(a => a.Cart.UserId == userId);

            if (itemCount == 0)
            {
                return NotFound();
            }

            return Ok(new { Count = itemCount });
        }
        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id, int user)
        //{
        //    try
        //    {
        //        // البحث عن العنصر باستخدام ID
        //        var cartItem = _myDbContext.CartItems.Find(id);
        //        if (cartItem == null)
        //        {
        //            return NotFound(new { message = "Item not found" });
        //        }

        //        // تحقق من أن العنصر ينتمي للمستخدم (إذا كان ذلك ضروريًا)
        //        if (cartItem.CartId != user)
        //        {
        //            return Unauthorized(new { message = "You do not have permission to delete this item" });
        //        }

        //        // حذف العنصر
        //        _myDbContext.CartItems.Remove(cartItem);
        //        _myDbContext.SaveChanges();

        //        return Ok(new { message = "Item deleted successfully", itemId = id });
        //    }
        //    catch (Exception ex)
        //    {
        //        // إدارة الأخطاء
        //        return StatusCode(500, new { message = "An error occurred", error = ex.Message });
        //    }
        //}

        [HttpDelete("{userid}/{idbook}")]
        public IActionResult Delete(int userid, int idbook)
        {
            try
            {
                var cartItem = _myDbContext.CartItems
                    .Include(ci => ci.Cart)
                    .FirstOrDefault(ci => ci.Cart.UserId == userid && ci.Book.Id == idbook);

                if (cartItem == null)
                {
                    return NotFound(new { message = "Item not found or does not belong to the user" });
                }

                _myDbContext.CartItems.Remove(cartItem);
                _myDbContext.SaveChanges();

                return Ok(new { message = "Item deleted successfully", itemId = idbook });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", error = ex.Message });
            }
        }


    }
}
