using BookLand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly MyDbContext _myDbContext;

        public BooksController(MyDbContext myDbContext)
        {
            _myDbContext = myDbContext;
        }
        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var Books = _myDbContext.Books.ToList();
            return Ok(Books);
        }
        [HttpGet("RandomBook")]
        public IActionResult GetAllBooks2()
        {
            int count = 8;
            var randomBooks = _myDbContext.Books
                                          .OrderBy(b => Guid.NewGuid())
                                          .Take(count)
                                          .ToList();
            return Ok(randomBooks);
        }

        [HttpGet("bynameBooksid/{id}")]
        public IActionResult GetBookTitleById(int id)
        {
            var book = _myDbContext.Books.FirstOrDefault(a => a.Id == id);
            if (book == null)
            {
                return NotFound("Book not found.");
            }
            return Ok(book.Title); // إرجاع اسم الكتاب فقط
        }


        [HttpGet("byIDBooks/{id}")]
        public IActionResult GetBooksById(int id)
        {
            var Books = _myDbContext.Books.FirstOrDefault(a => a.Id == id);
            if (Books == null)
            {
                return NotFound();
            }
            return Ok(Books);
        }
        [HttpGet("topRatedBooks")]
        public IActionResult GetTopRatedBooks()
        {
            var Books = _myDbContext.Books
                .OrderByDescending(a => a.Rating)
                .Take(6)
                .ToList();

            if (Books == null || Books.Count == 0)
            {
                return NotFound("No books found.");
            }

            return Ok(Books);
        }


        [HttpGet("bySaleBooks")]
        public IActionResult GetBooksBySale()
        {
            var Books = _myDbContext.Books
                .Where(a => a.DiscountPercentage > 0)
                .OrderBy(b => Guid.NewGuid())
                .ToList();

            if (Books == null || Books.Count == 0)
            {
                return NotFound();
            }

            Random random = new Random();
            int count = random.Next(4, Math.Min(10, Books.Count) + 1);

            var randomBooks = Books.Take(count).ToList();

            return Ok(randomBooks);
        }


        [HttpGet("categories/books")]
        public async Task<IActionResult> GetBooksByCategories([FromQuery] List<int> categoryIds)
        {
            if (categoryIds == null || !categoryIds.Any())
            {
                return BadRequest("No categories specified.");
            }

            var books = await _myDbContext.Books
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

        // Optional: Get categories by IDs
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategoriesByIds([FromQuery] List<int> categoryIds)
        {
            var categories = await _myDbContext.Categories
                .Where(c => categoryIds.Contains(c.Id))
                .Select(c => new { c.Id, c.Name })
                .ToListAsync();

            return Ok(categories);
        }


        [HttpGet("bynameBooks/{name}")]

        public IActionResult GetBooksByName(string name)
        {
            var Books = _myDbContext.Books.FirstOrDefault(a => a.Title == name);
            if (Books == null)
            {
                return NotFound();
            }
            return Ok(Books);
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var Books = _myDbContext.Books.Find(id);
            if (Books == null)
            {
                return NotFound();
            }
            _myDbContext.Books.Remove(Books);
            _myDbContext.SaveChanges();
            return Ok();
        }


    }
}
