//using BookLand.Models;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using System.Threading.Tasks;
//using System.Collections.Generic;

//namespace BookLand.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class LatestNewsController : ControllerBase
//    {


//        private readonly MyDbContext _myDbContext;

//        public LatestNewsController(MyDbContext myDbContext)
//        {
//            _myDbContext = myDbContext;
//        }

//        [HttpGet]
//        public IActionResult LatestNews()
//        {
//            var latestNews = _myDbContext.LatestNews.ToList();
//            return Ok(latestNews);
//        }
//    }
//}
