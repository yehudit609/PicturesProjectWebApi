//using Services;
//using Microsoft.AspNetCore.Mvc;
//using System.Text.Json;
//using Microsoft.AspNetCore.Identity;
//using Repositories;
//using DTOs;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace LoginProject.Controllers
//{

//    [Route("api/[controller]")]
//    [ApiController]
//    public class UsersController : ControllerBase
//    {
//        private IUserService _IUserService;

//        public UsersController(IUserService IUserService)
//        {
//            _IUserService = IUserService;
//        }

        
//        // GET api/<UserController>/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<User>> GetById(int id)
//        {
//            User user = await _IUserService.getUserById(id);
//            if (user != null)
//                return Ok(user);
//            return NotFound();
//        }
//        // GET: api/<UserController>
//        [HttpPost]
//        [Route("login")]
//        public async Task<IActionResult> GetByEmailAndPassword([FromBody] UserLoginDto userLogin)
//        {
//            User user = await _IUserService.GetUserByEmailAndPassword(userLogin);
//            if (user != null)
//                return Ok(user);
//            return NotFound();
//        }
//        [Route("evalutePassword")]
//        public int EvalutePassword([FromBody] string password)
//        {
//            return _IUserService.evalutePassword(password);
//        }



//        // POST api/<UserController>
//        [HttpPost]
//        public async Task<ActionResult<User>> Post([FromBody] User user)
//        {
//            User newUser = await _IUserService.addUser(user);
//            if (newUser != null)
//                return Ok(newUser);
//            return BadRequest();
//        }






//        // PUT api/<UserController>/5
//        [HttpPut("{id}")]
//        public async Task<ActionResult<User>> Put(int id, [FromBody] User userToUpdate)
//        {
//            return await _IUserService.updateUser(id, userToUpdate);
//        }

        
//    }



//}