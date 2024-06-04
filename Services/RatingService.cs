using DTOs;
using Repositories;
using System.Data;
using System.Diagnostics;
using Zxcvbn;
namespace Services
{
    public class RatingService : IRatingService
    {
        private IRatingRepository _IRatingRepository;
        public RatingService(IRatingRepository RatingRepository)
        {
            _IRatingRepository = RatingRepository;
        }

        public async Task addRating(Rating rating)
        {
           await  _IRatingRepository.addRating(rating);
        }
    }
}
