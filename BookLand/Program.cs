using BookLand.Models;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BookLand.Models;
using BookLand;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("app.log", rollingInterval: RollingInterval.Day)// Default file path);
    .CreateLogger();



var builder = WebApplication.CreateBuilder(args);


builder.Host.UseSerilog();


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Add services to the container.
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionString")));



// Register TokenGenerator as a singleton or transient service
builder.Services.AddSingleton<TokenGenerator>(); // or .AddTransient<TokenGenerator>()



// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});


// Retrieve JWT settings from configuration
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = jwtSettings.GetValue<string>("Key");
var issuer = jwtSettings.GetValue<string>("Issuer");
var audience = jwtSettings.GetValue<string>("Audience");

// Ensure values are not null
    //if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
    //{
    //    throw new InvalidOperationException("JWT settings are not properly configured.");
    //}


    ////// Add JWT Authentication
    //builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    //    .AddJwtBearer(options =>
    //    {
    //        var jwtSettings = builder.Configuration.GetSection("Jwt");
    //        options.TokenValidationParameters = new TokenValidationParameters
    //        {
    //            ValidateIssuer = true,
    //            ValidateAudience = true,
    //            ValidateLifetime = true,
    //            ValidateIssuerSigningKey = true,
    //            ValidIssuer = jwtSettings["Issuer"],
    //            ValidAudience = jwtSettings["Audience"],
    //            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]))
    //        };
    //    });


builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
});

    

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

// Configure the HTTP request pipeline.
app.UseCors("AllowAllOrigins"); // use Cors must be after useRouting

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
