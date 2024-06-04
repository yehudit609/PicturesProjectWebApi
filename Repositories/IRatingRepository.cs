//using Entities;
using DTOs;

namespace Repositories
{
    public interface IRatingRepository
    {
        Task addRating(Rating rating);
    }
}