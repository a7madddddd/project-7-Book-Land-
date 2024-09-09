using BookLand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly MyDbContext _myDbContext;

        public CategoryController(MyDbContext myDbContext)
        {
            _myDbContext = myDbContext;
        }
        // Get all categories
        [HttpGet]
        public IActionResult GetAllCategories()
        {
            var categories = _myDbContext.Categories.ToList();
            return Ok(categories);
        }

        // Get category by ID
        [HttpGet("byIDCategory/{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _myDbContext.Categories.FirstOrDefault(a => a.Id == id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // Get category by name
        [HttpGet("bynameCategory/{name}")]

        public IActionResult GetCategoryByName(string name)
        {
            var category = _myDbContext.Categories.FirstOrDefault(a => a.Name == name);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var category = _myDbContext.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }
            _myDbContext.Categories.Remove(category);
            _myDbContext.SaveChanges();
            return Ok();
        }

    }
}
