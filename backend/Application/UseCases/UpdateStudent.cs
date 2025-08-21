using student_registration.Core.Entities;
using student_registration.Core.Interfaces;
using System.Threading.Tasks;

namespace student_registration.Application.UseCases
{
    public class UpdateStudent
    {
        private readonly IStudentRepository _repository;

        public UpdateStudent(IStudentRepository repository)
        {
            _repository = repository;
        }

        public async Task ExecuteAsync(int id, Student updatedStudent)
        {
            var student = await _repository.GetStudentByIdAsync(id);
            if (student == null) return;

            student.FullName = updatedStudent.FullName;
            student.Address = updatedStudent.Address;
            student.DateOfBirth = updatedStudent.DateOfBirth;
            student.Gender = updatedStudent.Gender;
            student.Email = updatedStudent.Email;
            student.Telephone = updatedStudent.Telephone;

            await _repository.UpdateStudentAsync(student);
        }
    }
}
