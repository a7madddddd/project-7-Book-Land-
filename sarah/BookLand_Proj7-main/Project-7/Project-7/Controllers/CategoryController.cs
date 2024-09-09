using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.DTO;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CategoryController(MyDbContext dbContext)
        {
            _db = dbContext;
        }

        // Get all categories
        [HttpGet("GetAllCategories")]
        public IActionResult GetAllCategories()
        {
            var categories = _db.Categories.ToList();
            return Ok(categories);
        }

        // Get category by ID
        [HttpGet("GetCategoryById/{id:int}")]
        public IActionResult GetCategoryById(int id)
        {
            if (id < 0)
            {
                return BadRequest("Invalid category ID.");
            }

            var category = _db.Categories.Find(id);
            if (category == null)
            {
                return NotFound("Category not found.");
            }

            return Ok(category);
        }

        // Get category by name
        [HttpGet("GetCategoryByName/{name}")]
        public IActionResult GetCategoryByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Category name is required.");
            }

            var category = _db.Categories.FirstOrDefault(c => c.Name == name);
            if (category == null)
            {
                return NotFound("Category not found.");
            }

            return Ok(category);
        }

        // Add new category
        [HttpPost("AddNewCategory")]
        public IActionResult AddNewCategory([FromForm] CategoryDTO categoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = new Category
            {
                Name = categoryDto.Name,
                Description = categoryDto.Description
            };

            _db.Categories.Add(category);
            _db.SaveChanges();

            return Ok();
        }

        // Update category
        [HttpPut("UpdateCategory/{id:int}")]
        public IActionResult UpdateCategory(int id, [FromForm] CategoryDTO categoryDto)
        {
            if (id < 0 || !ModelState.IsValid)
            {
                return BadRequest("Invalid input.");
            }

            var category = _db.Categories.Find(id);
            if (category == null)
            {
                return NotFound("Category not found.");
            }

            category.Name = categoryDto.Name;
            category.Description = categoryDto.Description;

            _db.Categories.Update(category);
            _db.SaveChanges();

            return Ok("Category updated successfully.");
        }

        // Delete category
        [HttpDelete("DeleteCategory/{id:int}")]
        public IActionResult DeleteCategory(int id)
        {
            if (id < 0)
            {
                return BadRequest("Invalid category ID.");
            }

            var category = _db.Categories.Find(id);
            if (category == null)
            {
                return NotFound("Category not found.");
            }

            var relatedProducts = _db.Books.Where(p => p.Id == id).ToList();
            if (relatedProducts.Any())
            {
                _db.Books.RemoveRange(relatedProducts);
            }

            _db.Categories.Remove(category);
            _db.SaveChanges();

            return NoContent(); 
        }
    }
}
