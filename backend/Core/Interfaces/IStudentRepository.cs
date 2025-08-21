using student_registration.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace student_registration.Core.Interfaces
{
    public interface IStudentRepository
    {
        Task<Student> AddStudentAsync(Student student);
        Task<IEnumerable<Student>> GetStudentsAsync();
        Task<Student?> GetStudentByIdAsync(int id);
        Task UpdateStudentAsync(Student student);
        Task DeleteStudentAsync(int id);
    }
}
