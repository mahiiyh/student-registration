using Microsoft.EntityFrameworkCore;
using student_registration.Core.Entities;

namespace student_registration.Infrastructure.Persistence
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options) { }
        public DbSet<Student> Students { get; set; }
    }
}