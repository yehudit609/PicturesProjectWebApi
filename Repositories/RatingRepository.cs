using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace Repositories

{
    public class RatingRepository : IRatingRepository
    {
        private PicturesStore_326058609Context _picturesStoreContext;
        public IConfiguration _configuration { get; }
        
        public RatingRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task addRating(Rating raiting)
        {
            string query = "INSERT INTO Rating(HOST, METHOD, PATH, REFERER, USER_AGENT,RECORD_DATE)" +
                "VALUES (@host, @method, @path, @referer, @user_agent,@record_date)";

            using (SqlConnection cn = new SqlConnection(_configuration.GetConnectionString("school")))
            using (SqlCommand cmd = new SqlCommand(query, cn))
            {
                cmd.Parameters.AddWithValue("@host", raiting.Host);
                cmd.Parameters.AddWithValue("@method", raiting.Method);
                cmd.Parameters.AddWithValue("@path", raiting.Path);
                cmd.Parameters.AddWithValue("@referer", raiting.Referer);
                cmd.Parameters.AddWithValue("@user_agent", raiting.UserAgent);
                cmd.Parameters.AddWithValue("@record_date", raiting.RecordDate);

                cn.Open();
                await cmd.ExecuteNonQueryAsync();
                cn.Close();
            }

        }

        
    }
}