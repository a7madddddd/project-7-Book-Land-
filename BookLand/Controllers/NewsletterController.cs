//using BookLand.Models;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore;
//using System.Threading.Tasks;
//using System.Linq;

//namespace BookLand.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class NewsletterController : ControllerBase
//    {
//        private readonly MyDbContext _myDbContext;

//        public NewsletterController(MyDbContext myDbContext)
//        {
//            _myDbContext = myDbContext;
//        }

//        // GET: api/Newsletter
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Newsletter>>> GetNewsletters()
//        {
//            return await _myDbContext.Newsletters.ToListAsync();
//        }

//        // GET: api/Newsletter/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Newsletter>> GetNewsletter(int id)
//        {
//            var newsletter = await _myDbContext.Newsletters.FindAsync(id);

//            if (newsletter == null)
//            {
//                return NotFound();
//            }

//            return newsletter;
//        }

//        // POST: api/Newsletter
//        [HttpPost]
//        public async Task<ActionResult<Newsletter>> PostNewsletter([FromForm] string email)
//        {
//            if (string.IsNullOrWhiteSpace(email) || !email.Contains("@"))
//            {
//                return BadRequest("Invalid email address");
//            }

//            var newsletter = new Newsletter
//            {
//                Email = email,
//                CreatedAt = DateTime.UtcNow
//            };

//            _myDbContext.Newsletters.Add(newsletter);
//            await _myDbContext.SaveChangesAsync();

//            return CreatedAtAction(nameof(GetNewsletter), new { id = newsletter.Id }, newsletter);
//        }

//        // PUT: api/Newsletter/5
//        [HttpPut("{id}")]
//        public async Task<IActionResult> PutNewsletter(int id, Newsletter newsletter)
//        {
//            if (id != newsletter.Id)
//            {
//                return BadRequest();
//            }

//            _myDbContext.Entry(newsletter).State = EntityState.Modified;
//            try
//            {
//                await _myDbContext.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!NewsletterExists(id))
//                {
//                    return NotFound();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return NoContent();
//        }

//        // DELETE: api/Newsletter/5
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteNewsletter(int id)
//        {
//            var newsletter = await _myDbContext.Newsletters.FindAsync(id);
//            if (newsletter == null)
//            {
//                return NotFound();
//            }

//            _myDbContext.Newsletters.Remove(newsletter);
//            await _myDbContext.SaveChangesAsync();

//            return NoContent();
//        }

//        private bool NewsletterExists(int id)
//        {
//            return _myDbContext.Newsletters.Any(e => e.Id == id);
//        }
//    }
//}
