using DTOs;
using Repositories;

namespace Services
{
    public interface IRatingService
    {
        Task addRating(Rating rating);
    }
}