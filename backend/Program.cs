
using Microsoft.EntityFrameworkCore;
using PersonalTaskTracker.Api.Data;

namespace PersonalTaskTracker.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            var builder = WebApplication.CreateBuilder(args);

            // CORS izin ver
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:3000", "https://localhost:3000") // React dev server
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });




            // Add services to the container.


            builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));



            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseCors("AllowReactApp");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            //app.UseHttpsRedirection();


     

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
