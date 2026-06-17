import { useState } from "react";
import Applications from "./pages/Applications";
import AddJob from "./pages/AddJob";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";

function App() {

  const [page, setPage] = useState("applications");
  const [selectedJob, setSelectedJob] = useState(null);

  return (
  <div className="app-container">

    <div className="sidebar">

      <h2>Job Tracker</h2>

      <button
        className={page === "dashboard" ? "active" : ""}
        onClick={() => setPage("dashboard")}
      >
        Dashboard
      </button>

      <button
        className={page === "applications" ? "active" : ""}
        onClick={() => setPage("applications")}
      >
        Applications
      </button>

      <button
        className={page === "addjob" ? "active" : ""}
        onClick={() => setPage("addjob")}
      >
        Add Job
      </button>

      <button onClick={() => setPage("resume")}>
        Upload Resume
      </button>

    </div>

    <div className="content">

      {page === "dashboard" && <Dashboard />}

      {page === "applications" && (
        <Applications
          setPage={setPage}
          setSelectedJob={setSelectedJob}
        />
      )}

      {page === "addjob" && (
        <AddJob
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
        />
      )}

      {page === "resume" && <UploadResume />}

    </div>

  </div>
);
}

export default App;