using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Services;

namespace LoginProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProductController : ControllerBase
    {        

        private IProductService _IProductService;
        private IMapper _mapper;

        public ProductController(IProductService IProductService, IMapper mapper)
        {
            _IProductService = IProductService;
            _mapper = mapper;
        }


        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            Product product = await _IProductService.getProductById(id);
            ProductDto productDto = _mapper.Map<Product, ProductDto>(product);
            if (product != null)
                return Ok(productDto);
            return NotFound();
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetAll()
        {
            List<Product> product = await _IProductService.getAllProducts();
            List<ProductDto> productDto = _mapper.Map<List<Product>, List<ProductDto>>(product);
            if (product != null)
                return Ok(productDto);
            return NotFound();
        }
        // GET: api/<UserController>





        // POST api/<UserController>
        //[HttpPost]
        //public async Task<ActionResult<Product>> Post([FromBody] Product product)
        //{
        //    Product newProduct = await _IProductService.addProduct(product);
        //    if (newProduct != null)
        //        return Ok(newProduct);
        //    return BadRequest();
        //}


        // PUT api/<UserController>/5
        //[HttpPut("{id}")]
        //public async Task<ActionResult<Product>> Put(int id, [FromBody] Product product)
        //{
        //    return await _IProductService.updateProduct(id, product);
        //}


    }
}

