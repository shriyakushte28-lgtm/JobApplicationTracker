import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Applications from "./pages/Applications";
import AddJob from "./pages/AddJob";
import Dashboard from "./pages/Dashboard";
import ResumePage from "./pages/ResumePage";

function App() {

  const [page, setPage] = useState("applications");

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {

    return (
      <div>

        <button onClick={() => setPage("login")}>
          Login
        </button>

        <button onClick={() => setPage("register")}>
          Register
        </button>

        <hr />

        {page === "login" && <Login />}
        {page === "register" && <Register />}

      </div>
    );
  }

  return (
    <div>

      <button onClick={() => setPage("applications")}>
        View Jobs
      </button>

      <button onClick={() => setPage("addjob")}>
        Add Job
      </button>

      <button onClick={() => setPage("dashboard")}>
        Dashboard
      </button>

      <button onClick={() => setPage("resume")}>
        Resumes
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userEmail");
          window.location.reload();
        }}
      >
        Logout
      </button>

      <hr />

      {page === "applications" && <Applications />}
      {page === "addjob" && <AddJob />}
      {page === "dashboard" && <Dashboard />}
      {page === "resume" && <ResumePage />}

    </div>
  );
}

export default App;