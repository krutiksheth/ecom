using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

//
// Middleware
//
app.MapControllers();

try
{
    await DbInitializer.InitDbAsync(app);
}
catch (Exception e)
{
    Console.WriteLine(e);
}

app.Run();
