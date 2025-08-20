import { useState } from "react";
import Registration from "./Registration";
import StudentList from "./StudentList";

function App() {
  const [page, setPage] = useState<"register" | "list">("register");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Registration System</h1>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("list")}>Student List</button>
      </div>

      {page === "register" && <Registration />}
      {page === "list" && <StudentList />}
    </div>
  );
}

export default App;