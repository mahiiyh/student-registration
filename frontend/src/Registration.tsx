import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5282/api/students";

function Registration() {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    gender: "Male",
    email: "",
    telephone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      alert("Student added successfully!");
      setForm({
        fullName: "",
        address: "",
        dateOfBirth: "",
        gender: "Male",
        email: "",
        telephone: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error saving student");
    }
  };

  return (
    <div className="registration-outer">
      <div className="registration-card-container">
        <div className="registration-card">
          <h2 className="registration-title">Student Registration</h2>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="registration-row">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
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
                value={form.address}
                onChange={handleChange}
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
                  value={form.dateOfBirth}
                  onChange={handleChange}
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
                      checked={form.gender === "Male"}
                      onChange={handleChange}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={form.gender === "Female"}
                      onChange={handleChange}
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
                value={form.email}
                onChange={handleChange}
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
                value={form.telephone}
                onChange={handleChange}
                className="registration-input"
                autoComplete="off"
                required
                type="tel"
              />
            </div>
            <div className="registration-btn-row">
              <button className="registration-submit-btn" type="submit">Submit</button>
            </div>
          </form>
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