using Microsoft.EntityFrameworkCore;
using student_registration.Models;

namespace student_registration.Data
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options) { }
        public DbSet<Student> Students { get; set; }
    }
}