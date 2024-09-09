using BookLand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookLand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class commentsreviewsController : ControllerBase
    {

        private readonly MyDbContext _myDbContext;

        public commentsreviewsController(MyDbContext myDbContext)
        {
            _myDbContext = myDbContext;
        }
        // Get all commentsreviews
        [HttpGet]
        public IActionResult GetAllcommentsreviews()
        {
            var commentsreviews = _myDbContext.CommentsReviews.ToList();
            return Ok(commentsreviews);
        }

        // Get commentsreviews by ID
        [HttpGet("byIDcommentsreviews/{id}")]
        public IActionResult GetcommentsreviewsById(int id)
        {
            var commentsreviews = _myDbContext.CommentsReviews.FirstOrDefault(a => a.Id == id);
            if (commentsreviews == null)
            {
                return NotFound();
            }
            return Ok(commentsreviews);
        }
        [HttpGet("topRatedcommentsreviews")]
        public IActionResult GetTopRatedCommentsReviews()
        {
            var CommentsReview = _myDbContext.CommentsReviews
                .Take(6)
                .ToList();

            if (CommentsReview == null || CommentsReview.Count == 0)
            {
                return NotFound("No comments or reviews found.");
            }

            return Ok(CommentsReview);
        }



        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var commentsreviews = _myDbContext.CommentsReviews.Find(id);
            if (commentsreviews == null)
            {
                return NotFound();
            }
            _myDbContext.CommentsReviews.Remove(commentsreviews);
            _myDbContext.SaveChanges();
            return Ok();
        }

    }
}
