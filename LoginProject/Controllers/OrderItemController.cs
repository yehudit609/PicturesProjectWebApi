//using Microsoft.AspNetCore.Mvc;
//using Repositories;
//using Services;

//namespace LoginProject.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class OrderItemController : ControllerBase
//    {
        

//        private IOrderItemService _IOrderItemService;

//        public OrderItemController(IOrderItemService IOrderItemService)
//        {
//            _IOrderItemService = IOrderItemService;
//        }


//        // GET api/<UserController>/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<OrderItem>> GetById(int id)
//        {
//            OrderItem orderItem = await _IOrderItemService.getOrderItemById(id);
//            if (orderItem != null)
//                return Ok(orderItem);
//            return NotFound();
//        }
//        // GET: api/<UserController>





//        // POST api/<UserController>
//        [HttpPost]
//        public async Task<ActionResult<OrderItem>> Post([FromBody] OrderItem orderItem)
//        {
//            OrderItem newOrderItem = await _IOrderItemService.addOrderItem(orderItem);
//            if (newOrderItem != null)
//                return Ok(newOrderItem);
//            return BadRequest();
//        }






//        // PUT api/<UserController>/5
//        [HttpPut("{id}")]
//        public async Task<ActionResult<OrderItem>> Put(int id, [FromBody] OrderItem orderItem)
//        {
//            return await _IOrderItemService.updateOrderItem(id, orderItem);
//        }


//    }
//}

