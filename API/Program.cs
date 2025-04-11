using API.Data;
using Microsoft.EntityFrameworkCore;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, configuration) =>
{
    configuration.WriteTo.Console();
    configuration.ReadFrom.Configuration(context.Configuration);
});

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
    Log.Fatal(e, "An error occured during seeding database");
}
finally
{
    Log.CloseAndFlush();
}

app.Run();
