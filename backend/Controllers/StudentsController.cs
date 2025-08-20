using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using student_registration.Data;
using student_registration.Models;

namespace student_registration.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly StudentDbContext _context;

        public StudentsController(StudentDbContext context)
        {
            _context = context;
        }

        // POST: api/students
        [HttpPost]
        public async Task<ActionResult<Student>> AddStudent(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return Ok(student);
        }

        // GET: api/students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudents()
        {
            var students = await _context.Students.ToListAsync();
            return Ok(students);
        }

        // GET: api/students/{telephone}
        [HttpGet("{telephone}")]
        public async Task<ActionResult<Student>> GetByTelephone(string telephone)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s => s.Telephone == telephone);
            if (student == null) return NotFound();
            return Ok(student);
        }

        // PUT: api/students/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Student>> UpdateStudent(int id, Student updatedStudent)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound();

            student.FullName = updatedStudent.FullName;
            student.Address = updatedStudent.Address;
            student.DateOfBirth = updatedStudent.DateOfBirth;
            student.Gender = updatedStudent.Gender;
            student.Email = updatedStudent.Email;
            student.Telephone = updatedStudent.Telephone;

            await _context.SaveChangesAsync();
            return Ok(student);
        }

        // DELETE: api/students/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound();

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}