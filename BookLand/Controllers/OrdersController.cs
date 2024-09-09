using BookLand.DTOs;
using BookLand.Models;
using BookLand;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using System.Net;

namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class OrdersController : ControllerBase
    {
        private readonly MyDbContext _db;

        private readonly TokenGenerator _tokenGenerator;

        public OrdersController(MyDbContext db, TokenGenerator tokenGenerator)
        {
            _db = db;
            _tokenGenerator = tokenGenerator;
        }



        // move items to order and orderItems tables
        [HttpPost("MoveItemsToOrder/{userId}")]
        public IActionResult MoveItemsToOrder(List<OrderItemsDTO> order, int userId)
        {
            // check if cart items are empty
            if (order == null || order.Count == 0)
            {
                return BadRequest("The cart is empty");
            }


            // find total
            decimal? total = 0;
            foreach (var Item in order)
            {
                if (Item.Format.Contains("Hard Copy"))
                {
                    total += (Item.Price * Item.Quantity);
                }
                if (Item.Format.Contains("PDF"))
                {
                    total += (Item.Price * 50 / 100);
                }
                if (Item.Format.Contains("Audio"))
                {
                    total += (Item.Price * 60 / 100);
                }

            }


            // add new order
            var newOrder = new Order
            {
                UserId = userId,
                TotalAmount = total,
                Status = "Pending",
            };
            _db.Orders.Add(newOrder);
            _db.SaveChanges();


            // add order items
            foreach (var Item in order)
            {
                var newItem = new OrderItem
                {
                    OrderId = newOrder.Id,
                    BookId = Item.BookId,
                    Quantity = Item.Quantity,
                    Price = Item.Price,
                    Format = Item.Format,
                };
                _db.OrderItems.Add(newItem);
            }
            _db.SaveChanges();


            return Ok(new { newOrder.Id});
        }


        // get user info for the billing info
        [HttpGet("getUserInfo/{userID}")]
        public IActionResult getUserInfo(int userID)
        {
            var user = _db.Users
                .Where(a => a.Id == userID)
                .Select(x => new CheckoutUserInfoDTO
                {
                    Name = x.Name,
                    Email = x.Email,
                    PhoneNumber = x.PhoneNumber,
                });

            if (user == null)
            {
                return NotFound("there's no user with this id");
            }
            else if (userID <= 0)
            {
                return BadRequest("invalid user id");
            }
            else
            {
                return Ok(user);
            }
        }


        // get the order Items for the table
        [HttpGet("getFinalOrderItemsInfo/{orderID}")]
        public IActionResult getFianlOrderInfo(int orderID)
        {
            var orderList = _db.OrderItems
                .Where(a => a.OrderId == orderID)
                .Select(a => new FinalOrderTableDTO
                {
                    Price = a.Price,
                    Quantity = a.Quantity,
                    Format = a.Format,
                    pi = new BookInfo
                    {
                        Title = a.Book.Title,
                        ImageUrl = a.Book.ImageUrl,
                    }
                })
                .ToList();

            if (orderList == null)
            {
                return NotFound($"there's no orders with this id: {orderID}");
            }
            else if (orderID <= 0)
            {
                return BadRequest($"invalid order id: {orderID}");
            }
            else
            {
                return Ok(orderList);
            }
        }



        [HttpGet("OrderTotal/{orderID}/{couponsPercentage}")]
        public IActionResult OrderTotal(int orderID, int couponsPercentage)
        {

            var orderValue = _db.Orders
                .Where(a => a.Id == orderID)
                .Select(a => new CheckoutTotalPriceDTO
                {
                    TotalAmount = a.TotalAmount,
                    CouponDiscount = (a.TotalAmount * couponsPercentage / 100),
                    FinalPrice = a.TotalAmount - (a.TotalAmount * couponsPercentage / 100),
                }).ToList();

            if (orderValue == null)
            {
                return NotFound($"there's no orders with this id: {orderID}");
            }
            else if (orderID <= 0)
            {
                return BadRequest($"invalid order id: {orderID}");
            }
            else
            {
                return Ok(orderValue);
            }

        }



        [HttpPut("FinishOrder/{orderID}")]
        public IActionResult FinishOrder(int orderID)
        {
            var order = _db.Orders.FirstOrDefault(a => a.Id == orderID);

            if (order == null)
            {
                return NotFound($"there's no orders with this id: {orderID}");
            }
            else if (orderID <= 0)
            {
                return BadRequest($"invalid order id: {orderID}");
            }
            else
            {
                order.Status = "Paid";
                order.TransactionId = $"TXN10{orderID}";

                _db.Orders.Update(order);
                _db.SaveChanges();

                return Ok();
            }
        }



        [HttpPost("sendBooksToLibrary/{userID}-{orderID}")]
        public IActionResult sendBooksToLibrary(int orderID, int userID)
        {
            //var orderInfo = _db.Orders.Where(a => a.UserId == userID);

            var orderItems = _db.OrderItems
                .Where(a => a.OrderId == orderID)
                .ToList();


            var userLibrary = new sendBooksToLibraryDTO();

            if (orderItems == null)
            {
                return NotFound($"there's no orders with this id: {orderID}");
            }
            else if (orderID <= 0)
            {
                return BadRequest($"invalid order id: {orderID}");
            }
            else if (userID <= 0)
            {
                return BadRequest($"invalid user id: {userID}");
            }
            else
            {
                foreach (var item in orderItems)
                {
                    var addToLibrary = new Library
                    {
                        UserId = userID,
                        BookId = item.BookId,
                        Format = item.Format,
                    };

                    _db.Libraries.Add(addToLibrary);
                    _db.SaveChanges();
                };

                return Ok();
            }

        }







    }
}
