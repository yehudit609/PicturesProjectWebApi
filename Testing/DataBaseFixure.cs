using Microsoft.EntityFrameworkCore;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testing
{
    public class DatabaseFixture : IDisposable
    {
        public PicturesStore_326058609Context Context { get; private set; }

        public DatabaseFixture()
        {
            // Set up the test database connection and initialize the context
            var options = new DbContextOptionsBuilder<PicturesStore_326058609Context>()
                .UseSqlServer("Server=srv2\\pupils;Database=Tests_326058609;Trusted_Connection=True;TrustServerCertificate=True")
                .Options;
            Context = new PicturesStore_326058609Context(options);
            Context.Database.EnsureCreated();// create the data base
        }

        
        public void Dispose()
        {
            // Clean up the test database after all tests are completed
            Context.Database.EnsureDeleted();
            Context.Dispose();
        }
    }
}