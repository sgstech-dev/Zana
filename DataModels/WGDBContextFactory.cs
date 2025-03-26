using Microsoft.EntityFrameworkCore;
using Server.models;

namespace Server.models
{
    public class WGDBContextFactory
    {
        private readonly DbContextOptions<WGDBContext> _options;

        public WGDBContextFactory(DbContextOptions<WGDBContext> options)
        {
            _options = options;
        }

        public WGDBContext CreateDbContext()
        {
            return new WGDBContext(_options);
        }
    }
}