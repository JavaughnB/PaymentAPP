using Microsoft.EntityFrameworkCore;
using PaymentAPI.Models;
using PaymentAPI.Data;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

//Add services to container

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<PaymentDetailContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));



var app = builder.Build();

if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(options =>
options.WithOrigins("http://localhost:4200")
.AllowAnyHeader()
.AllowAnyMethod());

app.UseAuthorization();
app.MapControllers();
app.Run();
