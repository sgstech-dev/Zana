using Microsoft.EntityFrameworkCore;
using Server.models;

namespace Server.models
{
    public class WGDBContext : DbContext
    {
        public WGDBContext(DbContextOptions<WGDBContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Field>().ToTable("Field");
            modelBuilder.Entity<GisObject>().ToTable("GisObject");
            modelBuilder.Entity<GisObjectMetaData>().ToTable("GisObjectMetaData");
            modelBuilder.Entity<LocalizationString>().ToTable("LocalizationString");
            modelBuilder.Entity<ObjectType>().ToTable("ObjectType");
            modelBuilder.Entity<ObjectTypeMetaData>().ToTable("ObjectTypeMetaData");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Target>().ToTable("Targets");
        }
        public DbSet<Field> Fields { get; set; }
        public DbSet<GisObject> GisObjects { get; set; }
        public DbSet<GisObjectMetaData> GisObjectMetaDatas { get; set; }
        public DbSet<LocalizationString> LocalizationStrings { get; set; }
        public DbSet<ObjectType> ObjectTypes { get; set; }
        public DbSet<ObjectTypeMetaData> ObjectTypeMetaDatas { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Scenario> Scenario { get; set; } = default!;
        public DbSet<ScenarioOfRole> ScenarioOfRole { get; set; } = default!;
        public DbSet<Scene> Scene { get; set; } = default!;
        public DbSet<Category> Category { get; set; } = default!;
        public DbSet<Server.models.MapAddress> MapAddress { get; set; } = default!;
         public DbSet<Server.models.Target> Targets { get; set; } = default!;
    }
}