using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public DbSet<Product> Products { get; set; }

    public DbSet<Basket> Baskets { get; set; }

    public required DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(
            new IdentityRole { Id = "8b9f8636-c480-40ad-bdfa-a844109b3a69", Name = "Admin", NormalizedName = "ADMIN" },
            new IdentityRole { Id = "f36f9c48-95f7-4f0a-bc8a-60ad58abe512", Name = "Member", NormalizedName = "MEMBER" }
        );
    }
}