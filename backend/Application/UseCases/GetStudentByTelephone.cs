using student_registration.Core.Entities;
using student_registration.Core.Interfaces;
using System.Threading.Tasks;

namespace student_registration.Application.UseCases
{
    public class GetStudentByTelephone
    {
        private readonly IStudentRepository _repository;

        public GetStudentByTelephone(IStudentRepository repository)
        {
            _repository = repository;
        }

        public async Task<Student?> ExecuteAsync(string telephone)
        {
            return await _repository.GetStudentsAsync().ContinueWith(task =>
                task.Result.FirstOrDefault(s => s.Telephone == telephone));
        }
    }
}
