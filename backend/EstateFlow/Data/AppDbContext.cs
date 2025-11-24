using EstateFlow.Entities;
using Microsoft.EntityFrameworkCore;

namespace EstateFlow.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<Offer> Offers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Use a static (pre-generated) password hash — do NOT hash it dynamically
            // Fix cascade issues
            //modelBuilder.Entity<Favorite>()
            //    .HasOne(f => f.Property)
            //    .WithMany()
            //    .HasForeignKey(f => f.PropertyId)
            //    .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Property>()
                .HasOne(p => p.Agent)
                .WithMany()
                .HasForeignKey(p => p.AgentId)
                .OnDelete(DeleteBehavior.Restrict); // <-- Important

            // Decimal precision
            modelBuilder.Entity<Property>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Offer>()
                .Property(o => o.Amount)
                .HasPrecision(18, 2);

        }
    }
}




