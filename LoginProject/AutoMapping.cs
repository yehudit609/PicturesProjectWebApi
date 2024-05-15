using AutoMapper;
using Repositories;

namespace LoginProject
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Product, ProductDto>();
        }
    }
}
