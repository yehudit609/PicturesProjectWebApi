using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Repositories;
using Services;
using System.Threading.Tasks;

namespace Project.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class RatingMiddleware
    {
        private readonly RequestDelegate _next;

        public RatingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext httpContext, IRatingService ratingService)
        {
            Rating? rating = new Rating();
            rating.Host = httpContext.Request.Host.Value;
            rating.Method = httpContext.Request.Method;
            rating.Path = httpContext.Request.Path;
            rating.Referer = httpContext.Request.Headers["Referer"];
            rating.UserAgent = httpContext.Request.Headers["User-Agent"];
            rating.RecordDate = DateTime.Now;
            ratingService.addRating(rating);
            return _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class RatingMiddlewareExtensions
    {
        public static IApplicationBuilder UseRatingMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RatingMiddleware>();
        }
    }
}
