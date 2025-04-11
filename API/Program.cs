var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

//
// Middleware
//
app.MapControllers();

app.Run();
