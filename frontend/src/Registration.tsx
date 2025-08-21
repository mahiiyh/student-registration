import { useState } from "react";
import type { Student } from "./core/entities/Student";
import { registerStudent } from "./application/useCases/RegisterStudent";

function Registration() {
  const [form, setForm] = useState<Student>({
    id: 0, // Temporary ID for local state
    fullName: "",
    address: "",
    dateOfBirth: "",
    gender: "Male",
    email: "",
    telephone: "",
  });
  const [localStudents, setLocalStudents] = useState<Student[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Student | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIdx !== null && editForm) {
      // Update existing
      const updated = [...localStudents];
      updated[editIdx] = editForm;
      setLocalStudents(updated);
      setEditIdx(null);
      setEditForm(null);
      resetForm();
      return;
    }
    setLocalStudents([...localStudents, form]);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      id: 0,
      fullName: "",
      address: "",
      dateOfBirth: "",
      gender: "Male",
      email: "",
      telephone: "",
    });
  };

  const handleSubmitAll = async () => {
    if (localStudents.length === 0) return;
    try {
      await Promise.all(localStudents.map(student => registerStudent(student)));
      alert("All students added successfully!");
      setLocalStudents([]);
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving students");
    }
  };

  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEditForm({ ...localStudents[idx] });
    setForm({ ...localStudents[idx] });
  };

  const handleRemove = (idx: number) => {
    const updated = [...localStudents];
    updated.splice(idx, 1);
    setLocalStudents(updated);
    if (editIdx === idx) {
      setEditIdx(null);
      setEditForm(null);
      resetForm();
    }
  };

  return (
    <div className="registration-outer">
      <div className="registration-card-container">
        <div className="registration-card">
          <h2 className="registration-title">Student Registration</h2>
          <form className="registration-form" onSubmit={handleAdd}>
            <div className="registration-row">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                value={editIdx !== null && editForm ? editForm.fullName : form.fullName}
                onChange={editIdx !== null ? handleChange : handleChange}
                className="registration-input"
                autoComplete="off"
                required
              />
            </div>
            <div className="registration-row">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                value={editIdx !== null && editForm ? editForm.address : form.address}
                onChange={editIdx !== null ? handleChange : handleChange}
                className="registration-input"
                autoComplete="off"
                required
              />
            </div>
            <div className="registration-row registration-row-flex">
              <div style={{ flex: 1 }}>
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={editIdx !== null && editForm ? editForm.dateOfBirth : form.dateOfBirth}
                  onChange={editIdx !== null ? handleChange : handleChange}
                  className="registration-input"
                  required
                />
              </div>
              <div style={{ flex: 1, marginLeft: '2rem' }}>
                <label>Gender</label>
                <div className="registration-gender-options">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={editIdx !== null && editForm ? editForm.gender === "Male" : form.gender === "Male"}
                      onChange={editIdx !== null ? handleChange : handleChange}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={editIdx !== null && editForm ? editForm.gender === "Female" : form.gender === "Female"}
                      onChange={editIdx !== null ? handleChange : handleChange}
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="registration-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                value={editIdx !== null && editForm ? editForm.email : form.email}
                onChange={editIdx !== null ? handleChange : handleChange}
                className="registration-input"
                autoComplete="off"
                required
                type="email"
              />
            </div>
            <div className="registration-row">
              <label htmlFor="telephone">Telephone</label>
              <input
                id="telephone"
                name="telephone"
                value={editIdx !== null && editForm ? editForm.telephone : form.telephone}
                onChange={editIdx !== null ? handleChange : handleChange}
                className="registration-input"
                autoComplete="off"
                required
                type="tel"
              />
            </div>
            <div className="registration-btn-row">
              <button className="registration-submit-btn" type="submit">{editIdx !== null ? "Update" : "Add"}</button>
            </div>
          </form>
          {/* Table of local students */}
          {localStudents.length > 0 && (
            <div style={{ marginTop: "2rem", width: "100%" }}>
              <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Entries to Submit</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "#f7f7f7", borderRadius: "8px" }}>
                <thead>
                  <tr style={{ background: "#e3f2fd" }}>
                    <th style={{ padding: "0.7rem" }}>Full Name</th>
                    <th style={{ padding: "0.7rem" }}>Address</th>
                    <th style={{ padding: "0.7rem" }}>DOB</th>
                    <th style={{ padding: "0.7rem" }}>Gender</th>
                    <th style={{ padding: "0.7rem" }}>Email</th>
                    <th style={{ padding: "0.7rem" }}>Telephone</th>
                    <th style={{ padding: "0.7rem" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {localStudents.map((s, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: "0.7rem" }}>{s.fullName}</td>
                      <td style={{ padding: "0.7rem" }}>{s.address}</td>
                      <td style={{ padding: "0.7rem" }}>{s.dateOfBirth}</td>
                      <td style={{ padding: "0.7rem" }}>{s.gender}</td>
                      <td style={{ padding: "0.7rem" }}>{s.email}</td>
                      <td style={{ padding: "0.7rem" }}>{s.telephone}</td>
                      <td style={{ padding: "0.7rem" }}>
                        <button style={{ marginRight: "0.5rem" }} onClick={() => handleEdit(idx)}>✏️ Edit</button>
                        <button onClick={() => handleRemove(idx)}>🗑️ Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="registration-btn-row" style={{ marginTop: "1.5rem" }}>
                <button className="registration-submit-btn" type="button" onClick={handleSubmitAll}>Submit All</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .registration-outer {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
        }
        .registration-card-container {
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .registration-card {
          background: #fff;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          max-width: 700px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .registration-title {
          color: #222;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
        }
        .registration-form {
          width: 100%;
        }
        .registration-row {
          display: flex;
          align-items: center;
          margin-bottom: 1.2rem;
          width: 100%;
          justify-content: center;
        }
        .registration-row label {
          flex: 0 0 160px;
          color: #222;
          font-weight: 500;
          margin-right: 1.5rem;
          text-align: right;
        }
        .registration-input {
          flex: 1;
          padding: 0.7rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          background: #f7f7f7;
          color: #222;
          font-size: 1.08rem;
        }
        .registration-row-flex {
          display: flex;
          gap: 2rem;
        }
        .registration-gender-options {
          display: flex;
          gap: 1.5rem;
          margin-top: 0.2rem;
        }
        .registration-gender-options label {
          color: #222;
          font-size: 1rem;
        }
        .registration-btn-row {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .registration-submit-btn {
          padding: 0.7rem 2rem;
          background: #2196f3;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.2s;
        }
        .registration-submit-btn:hover {
          background: #1769aa;
        }
        @media (max-width: 900px) {
          .registration-card {
            padding: 1.2rem;
            max-width: 100%;
          }
          .registration-row label {
            flex: 0 0 100px;
            margin-right: 0.7rem;
            font-size: 0.95rem;
          }
          .registration-input {
            font-size: 0.95rem;
          }
        }
        @media (max-width: 700px) {
          .registration-row-flex {
            flex-direction: column;
            gap: 0.7rem;
          }
        }
        @media (max-width: 500px) {
          .registration-title {
            font-size: 1.1rem;
          }
          .registration-row {
            flex-direction: column;
            align-items: stretch;
          }
          .registration-row label {
            margin-bottom: 0.3rem;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}

export default Registration;