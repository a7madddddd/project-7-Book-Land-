using BookLand.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class CartsController : ControllerBase
    {
        private readonly MyDbContext _db;

        private readonly TokenGenerator _tokenGenerator;

        public CartsController(MyDbContext db, TokenGenerator tokenGenerator)
        {
            _db = db;
            _tokenGenerator = tokenGenerator;
        }


        // delete cart and it's items from DB using it's id
        [HttpDelete("deleteCart/{cartID}")]
        public IActionResult deleteCart(int cartID)
        {
            var x = _db.Carts.FirstOrDefault(a => a.Id == cartID);

            if (x == null)
            {
                return NotFound();
            }
            else if (cartID <= 0)
            {
                return BadRequest();
            }
            else
            {
                _db.Carts.Remove(x);
                _db.SaveChanges();
                return NoContent();
            }
        }











    }
}
