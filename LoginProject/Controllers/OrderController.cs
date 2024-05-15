//using Microsoft.AspNetCore.Mvc;
//using Repositories;
//using Services;

//namespace LoginProject.Controllers
//{    
//    [Route("api/[controller]")]
//    [ApiController]
//    public class OrderController : ControllerBase
//    {
       
            

//            private IOrderService _IOrderService;

//            public OrderController(IOrderService IOrderService)
//            {
//            _IOrderService = IOrderService;
//            }


//            // GET api/<UserController>/5
//            [HttpGet("{id}")]
//            public async Task<ActionResult<Order>> GetById(int id)
//            {
//                Order order = await _IOrderService.getOrderById(id);
//                if (order != null)
//                    return Ok(order);
//                return NotFound();
//            }
//            // GET: api/<UserController>





//            // POST api/<UserController>
//            [HttpPost]
//            public async Task<ActionResult<Order>> Post([FromBody] Order order)
//            {
//            Order newOrder = await _IOrderService.addOrder(order);
//                if (newOrder != null)
//                    return Ok(newOrder);
//                return BadRequest();
//            }






//            // PUT api/<UserController>/5
//            [HttpPut("{id}")]
//            public async Task<ActionResult<Order>> Put(int id, [FromBody] Order order)
//            {
//                return await _IOrderService.updateOrder(id, order);
//            }


//        }
//    }