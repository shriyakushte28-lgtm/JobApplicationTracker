import { useState } from "react";
import Applications from "./pages/Applications";
import AddJob from "./pages/AddJob";
import Dashboard from "./pages/Dashboard";

function App() {

  const [page, setPage] = useState("applications");
  const [selectedJob, setSelectedJob] = useState(null);

  return (
  <div className="app-container">

    <div className="sidebar">

      <h2>Job Tracker</h2>

      <button onClick={() => setPage("dashboard")}>
        Dashboard
      </button>

      <button onClick={() => setPage("applications")}>
        Applications
      </button>

      <button onClick={() => setPage("addjob")}>
        Add Job
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

    </div>

  </div>
);
}

export default App;