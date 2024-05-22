using Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Repositories;
using DTOs;
using AutoMapper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LoginProject.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _IUserService;
        private IMapper _mapper;

        public UsersController(IUserService IUserService, IMapper mapper)
        {
            _IUserService = IUserService;
            _mapper = mapper;
        }


        // GET api/<UserController>/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetById(int id)
        //{
        //    User user = await _IUserService.getUserById(id);
        //    if (user != null)
        //        return Ok(user);
        //    return NotFound();
        //}
        // GET: api/<UserController>
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<User>> GetByEmailAndPassword([FromBody] UserLoginDto userLogin)
        {
            User user1 = _mapper.Map<UserLoginDto, User>(userLogin);
            User user = await _IUserService.GetUserByEmailAndPassword(user1);
            if (user != null)
            {
                return Ok(user);
            }
            return NotFound();
        }

        [HttpPost]
        [Route("evalutePassword")]
        public int EvalutePassword([FromBody] string password)
        {
            return _IUserService.evalutePassword(password);
        }
        //POST api/<UserController>
        
        
        [HttpPost]
        public async Task<ActionResult<User>> AddNewUser([FromBody] UserRegister user)
        {
            
            try { 
            User user1 = _mapper.Map<UserRegister, User>(user);
            User newUser = await _IUserService.addUser(user1);
            if (newUser != null)
                return Ok(newUser);
            return BadRequest();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> Put(int id, [FromBody] UserRegister userToUpdate)
        {
            User user1 = _mapper.Map<UserRegister, User>(userToUpdate);
            return await _IUserService.updateUser(id, user1);
        }


    }



}