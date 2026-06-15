import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await getAllJobs();
    setJobs(data);
  };

  const totalJobs = jobs.length;
  const applied = jobs.filter(job => job.status === "Applied").length;
  const interview = jobs.filter(job => job.status === "Interview").length;
  const selected = jobs.filter(job => job.status === "Selected").length;
  const rejected = jobs.filter(job => job.status === "Rejected").length;

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Jobs</h3>
          <p>{totalJobs}</p>
        </div>

        <div className="card">
          <h3>Applied</h3>
          <p>{applied}</p>
        </div>

        <div className="card">
          <h3>Interview</h3>
          <p>{interview}</p>
        </div>

        <div className="card">
          <h3>Selected</h3>
          <p>{selected}</p>
        </div>

        <div className="card">
          <h3>Rejected</h3>
          <p>{rejected}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;