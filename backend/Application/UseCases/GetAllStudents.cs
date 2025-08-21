using student_registration.Core.Entities;
using student_registration.Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace student_registration.Application.UseCases
{
    public class GetAllStudents
    {
        private readonly IStudentRepository _repository;

        public GetAllStudents(IStudentRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Student>> ExecuteAsync()
        {
            return await _repository.GetStudentsAsync();
        }
    }
}
