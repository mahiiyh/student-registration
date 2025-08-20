import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

interface Student {
  id: number;
  fullName: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  telephone: string;
}

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTel, setSearchTel] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const searchStudent = async () => {
    if (!searchTel) return fetchStudents();
    try {
      const res = await axios.get(`${API_URL}/${searchTel}`);
      setStudents(res.data ? [res.data] : []);
    } catch (err) {
      console.error(err);
      setStudents([]);
    }
  };

  const deleteStudent = async (id: number) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <div>
        <input
          placeholder="Search by telephone"
          value={searchTel}
          onChange={(e) => setSearchTel(e.target.value)}
        />
        <button onClick={searchStudent}>Search</button>
      </div>

      <table border={1} style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.fullName}</td>
              <td>{s.dateOfBirth.split("T")[0]}</td>
              <td>{s.email}</td>
              <td>{s.telephone}</td>
              <td>
                {/* Update could be a form popup, keeping it simple now */}
                <button onClick={() => deleteStudent(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;