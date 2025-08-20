import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5282/api/students";

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
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Student | null>(null);
  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEditForm({ ...students[idx] });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return;
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (editForm) {
      try {
        await axios.put(`${API_URL}/${editForm.id}`, editForm);
        const updated = [...students];
        updated[editIdx!] = editForm;
        setStudents(updated);
        setEditIdx(null);
        setEditForm(null);
        alert("Student updated successfully!");
      } catch (err) {
        console.error(err);
        alert("Error updating student");
      }
    }
  };

  const handleCancel = () => {
    setEditIdx(null);
    setEditForm(null);
  };

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
    <div className="studentlist-outer">
      <div className="studentlist-container">
        <div className="studentlist-card">
          <h2 className="studentlist-title">Student List</h2>
          <form className="studentlist-search" onSubmit={e => {e.preventDefault(); searchStudent();}}>
            <label htmlFor="searchTel">Telephone</label>
            <input
              id="searchTel"
              className="studentlist-input"
              placeholder="Search by telephone"
              value={searchTel}
              onChange={(e) => setSearchTel(e.target.value)}
              autoComplete="off"
            />
            <button className="studentlist-search-btn" type="submit">Search</button>
          </form>
          <div className="studentlist-table-wrapper">
            <table className="studentlist-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Email</th>
                  <th>Telephone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", color: "#888" }}>No students found.</td>
                  </tr>
                ) : (
                  students.map((s, idx) => (
                    editIdx === idx && editForm ? (
                      <tr key={s.id} style={{ background: "#e3f2fd" }}>
                        <td><input name="fullName" value={editForm.fullName} onChange={handleEditChange} className="studentlist-input" /></td>
                        <td><input name="dateOfBirth" type="date" value={editForm.dateOfBirth.split("T")[0]} onChange={handleEditChange} className="studentlist-input" /></td>
                        <td><input name="email" value={editForm.email} onChange={handleEditChange} className="studentlist-input" /></td>
                        <td><input name="telephone" value={editForm.telephone} onChange={handleEditChange} className="studentlist-input" /></td>
                        <td>
                          <button className="studentlist-action-btn edit" title="Update" type="button" onClick={handleUpdate}>✔️</button>
                          <button className="studentlist-action-btn" title="Cancel" type="button" onClick={handleCancel}>✖️</button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={s.id}>
                        <td>{s.fullName}</td>
                        <td>{s.dateOfBirth.split("T")[0]}</td>
                        <td>{s.email}</td>
                        <td>{s.telephone}</td>
                        <td>
                          <button className="studentlist-action-btn edit" title="Edit" onClick={() => handleEdit(idx)}>
                            ✏️
                          </button>
                          <button className="studentlist-action-btn delete" title="Delete" onClick={() => deleteStudent(s.id)}>
                            🗑️
                          </button>
                        </td>
                      </tr>
                    )
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>{`
        .studentlist-outer {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
        }
        .studentlist-container {
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .studentlist-card {
          background: #fff;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          max-width: 900px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .studentlist-title {
          color: #222;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
        }
        .studentlist-search {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .studentlist-search label {
          color: #222;
          font-weight: 500;
        }
        .studentlist-input {
          padding: 0.7rem;
          border-radius: 8px;
          border: 1px solid #bbb;
          background: #fff;
          color: #222;
          font-size: 1.08rem;
          min-width: 180px;
        }
        .studentlist-search-btn {
          padding: 0.7rem 1.5rem;
          background: #2196f3;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1.08rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .studentlist-search-btn:hover {
          background: #1769aa;
        }
        .studentlist-table-wrapper {
          overflow-x: auto;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .studentlist-table {
          width: 100%;
          max-width: 800px;
          border-collapse: collapse;
          margin-top: 1rem;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .studentlist-table th, .studentlist-table td {
          padding: 1rem 0.7rem;
          border-bottom: 1px solid #e0e0e0;
          text-align: center;
          color: #222;
          font-size: 1.08rem;
        }
        .studentlist-table th {
          background: #f1f1f1;
          color: #222;
          font-weight: 700;
        }
        .studentlist-table tr {
          transition: background 0.2s;
        }
        .studentlist-table tr:hover {
          background: #f5faff;
        }
        .studentlist-action-btn {
          background: none;
          border: none;
          font-size: 1.3rem;
          cursor: pointer;
          margin-right: 0.3rem;
        }
        .studentlist-action-btn.delete {
          color: #e53935;
        }
        @media (max-width: 900px) {
          .studentlist-card {
            padding: 1.2rem;
            max-width: 100%;
          }
          .studentlist-table th, .studentlist-table td {
            padding: 0.7rem 0.3rem;
            font-size: 0.98rem;
          }
        }
        @media (max-width: 700px) {
          .studentlist-table th, .studentlist-table td {
            padding: 0.5rem 0.2rem;
            font-size: 0.93rem;
          }
          .studentlist-search {
            flex-direction: column;
            align-items: stretch;
            gap: 0.7rem;
          }
        }
        @media (max-width: 500px) {
          .studentlist-title {
            font-size: 1.1rem;
          }
          .studentlist-table th, .studentlist-table td {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

export default StudentList;