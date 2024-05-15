//using Microsoft.AspNetCore.Mvc;
//using Repositories;
//using Services;

//namespace LoginProject.Controllers
//{

//    [Route("api/[controller]")]
//    [ApiController]
//    public class CategoryController : Controller
//    {
        
       
//            private ICategoryService _ICategoryService;

//            public CategoryController(ICategoryService ICategoryService)
//            {
//            _ICategoryService = ICategoryService;
//            }


//            // GET api/<CategoryController>/5
//            [HttpGet("{id}")]
//            public async Task<ActionResult<Category>> GetById(int id)
//            {
//                Category category = await _ICategoryService.getCategoryById(id);
//                if (category != null)
//                    return Ok(category);
//                return NotFound();
//            }
//            // GET: api/<CategoryController>
          
            



//            // POST api/<CategoryController>
//            [HttpPost]
//            public async Task<ActionResult<Category>> Post([FromBody] Category category)
//            {
//                Category newCategory = await _ICategoryService.addCategory(category);
//                if (newCategory != null)
//                    return Ok(newCategory);
//                return BadRequest();
//            }


//            // PUT api/<CategoryController>/5
//            [HttpPut("{id}")]
//            public async Task<ActionResult<Category>> Put(int id, [FromBody] Category category)
//            {
//                return await _ICategoryService.updateCategory(id, category);
//            }


//        }
//    }

