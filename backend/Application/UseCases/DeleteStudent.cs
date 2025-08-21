using student_registration.Core.Interfaces;
using System.Threading.Tasks;

namespace student_registration.Application.UseCases
{
    public class DeleteStudent
    {
        private readonly IStudentRepository _repository;

        public DeleteStudent(IStudentRepository repository)
        {
            _repository = repository;
        }

        public async Task ExecuteAsync(int id)
        {
            await _repository.DeleteStudentAsync(id);
        }
    }
}
