using AutoMapper;
using DTOs;
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Services;

namespace LoginProject.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {


        private ICategoryService _ICategoryService;
        private IMapper _mapper;

        public CategoryController(ICategoryService ICategoryService, IMapper mapper)
        {
            _ICategoryService = ICategoryService;
            _mapper = mapper;
        }

        // GET api/<CategoryController>/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Category>> GetById(int id)
        //{
        //    Category category = await _ICategoryService.getCategoryById(id);
        //    if (category != null)
        //        return Ok(category);
        //    return NotFound();
        //}


        [HttpGet]
        public async Task<ActionResult<CategoryDto>> GetAll()
        {
            List<Category> categoriesFound = await _ICategoryService.getCategories();
            List<CategoryDto> categories = _mapper.Map<List<Category>, List<CategoryDto>>(categoriesFound);
            if (categories == null)
                return NotFound();
            return Ok(categories);
        }

        // POST api/<CategoryController>
        //[HttpPost]
        //public async Task<ActionResult<Category>> Post([FromBody] Category category)
        //{
        //    Category newCategory = await _ICategoryService.addCategory(category);
        //    if (newCategory != null)
        //        return Ok(newCategory);
        //    return BadRequest();
        //}


        // PUT api/<CategoryController>/5
        //[HttpPut("{id}")]
        //public async Task<ActionResult<Category>> Put(int id, [FromBody] Category category)
        //{
        //    return await _ICategoryService.updateCategory(id, category);
        //}


    }
}

