using AutoMapper;
using DTOs;
using Repositories;

namespace LoginProject
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<UserLoginDto, User>();
            CreateMap<UserRegister, User>();
            CreateMap<OrderDto, Order>();
        }
    }
}
