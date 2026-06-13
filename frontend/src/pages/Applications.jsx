import React, { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";

function Applications() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await getAllJobs();
    setJobs(data);
  };

  return (
    <div>
      <h1>Job Applications</h1>

      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.companyName}</h3>
          <p>{job.jobRole}</p>
          <p>{job.status}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Applications;