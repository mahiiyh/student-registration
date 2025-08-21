using Microsoft.AspNetCore.Mvc;
using student_registration.Application.UseCases;
using student_registration.Core.Entities;
using student_registration.Core.Interfaces;

namespace student_registration.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly RegisterStudent _registerStudent;
        private readonly GetAllStudents _getAllStudents;
        private readonly GetStudentByTelephone _getStudentByTelephone;
        private readonly UpdateStudent _updateStudent;
        private readonly DeleteStudent _deleteStudent;

        public StudentsController(
            RegisterStudent registerStudent,
            GetAllStudents getAllStudents,
            GetStudentByTelephone getStudentByTelephone,
            UpdateStudent updateStudent,
            DeleteStudent deleteStudent)
        {
            _registerStudent = registerStudent;
            _getAllStudents = getAllStudents;
            _getStudentByTelephone = getStudentByTelephone;
            _updateStudent = updateStudent;
            _deleteStudent = deleteStudent;
        }

        // POST: api/students
        [HttpPost]
        public async Task<ActionResult<Student>> AddStudent(Student student)
        {
            await _registerStudent.ExecuteAsync(student);
            return Ok(student);
        }

        // GET: api/students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudents()
        {
            var students = await _getAllStudents.ExecuteAsync();
            return Ok(students);
        }

        // GET: api/students/{telephone}
        [HttpGet("{telephone}")]
        public async Task<ActionResult<Student>> GetByTelephone(string telephone)
        {
            var student = await _getStudentByTelephone.ExecuteAsync(telephone);
            if (student == null) return NotFound();
            return Ok(student);
        }

        // PUT: api/students/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student updatedStudent)
        {
            await _updateStudent.ExecuteAsync(id, updatedStudent);
            return NoContent();
        }

        // DELETE: api/students/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            await _deleteStudent.ExecuteAsync(id);
            return NoContent();
        }
    }
}