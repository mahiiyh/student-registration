using Microsoft.EntityFrameworkCore;
using student_registration.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// In-memory DB
builder.Services.AddDbContext<StudentDbContext>(opt =>
    opt.UseInMemoryDatabase("StudentDb"));

// Enable CORS so React frontend can call backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Register use cases
builder.Services.AddScoped<student_registration.Application.UseCases.RegisterStudent>();
builder.Services.AddScoped<student_registration.Application.UseCases.GetAllStudents>();
builder.Services.AddScoped<student_registration.Application.UseCases.GetStudentByTelephone>();
builder.Services.AddScoped<student_registration.Application.UseCases.UpdateStudent>();
builder.Services.AddScoped<student_registration.Application.UseCases.DeleteStudent>();
builder.Services.AddScoped<student_registration.Core.Interfaces.IStudentRepository, student_registration.Infrastructure.Persistence.StudentRepository>();

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();