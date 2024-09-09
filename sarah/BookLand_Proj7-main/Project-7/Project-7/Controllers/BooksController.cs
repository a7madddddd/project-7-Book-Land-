using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.DTO;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly MyDbContext _db;

        public BooksController(MyDbContext dbContext)
        {
            _db = dbContext;
        }

        [HttpGet("GetAllBooks")]
        public IActionResult GetAllBooks()
        {
            var books = _db.Books.Select(b => new BooksDTO
            {
                Id = b.Id,
                Title = b.Title,
                Author = b.Author,
                Publisher = b.Publisher,
                YearPublished = b.YearPublished,
                Description = b.Description,
                Price = b.Price,
                DiscountPercentage = b.DiscountPercentage,
                ImageUrl = b.ImageUrl,
                Rating = b.Rating,


                CommentReviews = b.CommentsReviews.Select(cr => new CommentReviewDTO
                {
                    Id = cr.Id,
                    CommentText = cr.CommentText,
                    UserId = cr.UserId,
                    Rating = cr.Rating
                }).ToList()
            }).ToList();

            return Ok(books);
        }

        [HttpGet("GetBookById/{id:int}")]
        public IActionResult GetBookById(int id)
        {
            var book = _db.Books.Where(b => b.Id == id)
                .Select(b => new BooksDTO
                {
                    Id = b.Id,
                    Title = b.Title,
                    Author = b.Author,
                    Publisher = b.Publisher,
                    YearPublished = b.YearPublished,
                    Description = b.Description,
                    Price = b.Price,
                    DiscountPercentage = b.DiscountPercentage,
                    ImageUrl = b.ImageUrl,
                    Rating = b.Rating,


                    CommentReviews = b.CommentsReviews.Select(cr => new CommentReviewDTO
                    {
                        Id = cr.Id,
                        CommentText = cr.CommentText,
                        UserId = cr.UserId,
                        Rating = cr.Rating
                    }).ToList()
                }).FirstOrDefault();

            if (book == null)
            {
                return NotFound("Book not found.");
            }

            return Ok(book);
        }

        [HttpGet("GetBook/Category/{id}")]
        public IActionResult GetBookByCat(int id)
        {
            var products = _db.Books.Where(b => b.Categories.Any(c => c.Id == id)).ToList();



            return Ok(products);
        }

        // Get Book by name
        [HttpGet("GetBook/Name/{name}")]
        public IActionResult GetBookByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Book name is required.");
            }

            var book = _db.Books
                          .Include(b => b.CommentsReviews) // Include CommentReviews related to the book
                          .FirstOrDefault(b => b.Title == name);

            if (book == null)
            {
                return NotFound("Book not found.");
            }

            // Map to BooksDTO
            var bookDTO = new BooksDTO
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Publisher = book.Publisher,
                YearPublished = book.YearPublished,
                Description = book.Description,
                Price = book.Price,
                DiscountPercentage = book.DiscountPercentage,
                ImageUrl = book.ImageUrl,
                Rating = book.Rating,
                CommentReviews = book.CommentsReviews.Select(c => new CommentReviewDTO
                {
                    Id = c.Id,
                    CommentText = c.CommentText,
                    UserId = c.UserId,
                    Rating = c.Rating
                }).ToList()
            };

            return Ok(bookDTO);
        }


        // Add new Book
        [HttpPost("AddNewBook")]
        public IActionResult AddNewBook([FromForm] BooksActionDTO bookactionDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var book = new Book
            {
                Title = bookactionDTO.Title,
                Author = bookactionDTO.Author,
                Publisher = bookactionDTO.Publisher,
                YearPublished = bookactionDTO.YearPublished,
                Description = bookactionDTO.Description,
                Price = bookactionDTO.Price,
                DiscountPercentage = bookactionDTO.DiscountPercentage,
                ImageUrl = bookactionDTO.ImageUrl,
            };

            _db.Books.Add(book);
            _db.SaveChanges();
            return Ok("Book added successfully.");
        }

        // Update Book
        [HttpPut("UpdateBook/{id:int}")]
        public IActionResult UpdateBook(int id, [FromForm] BooksActionDTO bookactionDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var book = _db.Books.Find(id);
            if (book == null)
            {
                return NotFound("Book not found.");
            }

            book.Title = bookactionDTO.Title;
            book.Author = bookactionDTO.Author;
            book.Publisher = bookactionDTO.Publisher;
            book.YearPublished = bookactionDTO.YearPublished;
            book.Description = bookactionDTO.Description;
            book.Price = bookactionDTO.Price;
            book.DiscountPercentage = bookactionDTO.DiscountPercentage;
            book.ImageUrl = bookactionDTO.ImageUrl;

            _db.Books.Update(book);
            _db.SaveChanges();

            return Ok("Book updated successfully.");
        }


        // Delete Book
        [HttpDelete("DeleteBook/{id:int}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _db.Books.Find(id);
            if (book == null)
            {
                return NotFound("Book not found.");
            }

            _db.Books.Remove(book);
            _db.SaveChanges();

            return NoContent();
        }

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
        
        }
    }
