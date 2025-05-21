using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;
using StackExchange.Redis;

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
builder.Services.AddCors();

// AddScoped -> service will be available when request comes in and will be available for the entirity of the request
// AddTransient -> service will only be created for specific method where it is needed
// AddSingleton -> service will be instantiated when application starts and is disposed when application ends
builder.Services.AddScoped<PaymentService>();
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddSingleton<IConnectionMultiplexer>(config =>
{
    var connectionString = builder.Configuration.GetConnectionString("Redis");
    if (string.IsNullOrEmpty(connectionString)) throw new Exception("Redis connection string is empty");
    var configuration = ConfigurationOptions.Parse(connectionString, true);

    return ConnectionMultiplexer.Connect(configuration);
});
builder.Services.AddSingleton<IBasketService, BasketService>();
builder.Services.AddIdentityApiEndpoints<User>(opt => { opt.User.RequireUniqueEmail = true; })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<StoreContext>();

var app = builder.Build();

//
// Middleware (ordering is important)
//
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(options => options.WithOrigins("https://localhost:3000", "https://localhost:4200").AllowAnyMethod()
    .AllowCredentials().AllowAnyHeader());

//order is important
app.UseAuthentication();
app.UseAuthorization();
//
app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();

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