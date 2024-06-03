using AutoMapper;
using DTOs;
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Services;

namespace LoginProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {



        private IOrderService _IOrderService;
        private IMapper _mapper;

        public OrderController(IOrderService IOrderService, IMapper mapper)
        {
            _IOrderService = IOrderService;
            _mapper = mapper;
        }


        
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetById(int id)
        {
            Order order = await _IOrderService.getOrderById(id);
            if (order != null)
                return Ok(order);
            return NotFound();
        }


        [HttpGet()]
        public async Task<ActionResult<Order>> GetAllOrder()
        {
            Order order = await _IOrderService.getAllOrders();
            if (order != null)
                return Ok(order);
            return NotFound();
        }






        //// POST api/<UserController>
        //[HttpPost]
        //public async Task<ActionResult<Order>> Post([FromBody] OrderDto order)
        //{
        //    Order orderDto = _mapper.Map<OrderDto, Order>(order);
        //    Order newOrder = await _IOrderService.addOrder(orderDto);
        //    if (newOrder != null)
        //        return Ok(newOrder);
        //    return BadRequest();
        //}

        [HttpPost]
        public async Task<ActionResult<Order>> Post([FromBody] OrderDto orderDto)
        {
            Order orders = _mapper.Map<OrderDto,Order>(orderDto);
            Order newOrder = await _IOrderService.addOrder(orders);
            OrderDto orderDto1 = _mapper.Map<Order, OrderDto>(newOrder);
            if (newOrder != null)
                return Ok(orderDto1);
            return BadRequest();
            
        }

            






        // PUT api/<UserController>/5
        //[HttpPut("{id}")]
        //public async Task<ActionResult<Order>> Put(int id, [FromBody] Order order)
        //{
        //    return await _IOrderService.updateOrder(id, order);
        //}


    }
}