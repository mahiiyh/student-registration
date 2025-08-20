import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} />
      </div>
      <div>
        <label>Address:</label>
        <input name="address" value={form.address} onChange={handleChange} />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={form.gender === "Male"}
          onChange={handleChange}
        />
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={form.gender === "Female"}
          onChange={handleChange}
        />
        Female
      </div>
      <div>
        <label>Email:</label>
        <input name="email" value={form.email} onChange={handleChange} />
      </div>
      <div>
        <label>Telephone:</label>
        <input name="telephone" value={form.telephone} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Registration;