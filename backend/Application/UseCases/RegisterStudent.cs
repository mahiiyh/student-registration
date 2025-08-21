using student_registration.Core.Entities;
using student_registration.Core.Interfaces;
using System.Threading.Tasks;

namespace student_registration.Application.UseCases
{
    public class RegisterStudent
    {
        private readonly IStudentRepository _repository;

        public RegisterStudent(IStudentRepository repository)
        {
            _repository = repository;
        }

        public async Task ExecuteAsync(Student student)
        {
            await _repository.AddStudentAsync(student);
        }
    }
}
