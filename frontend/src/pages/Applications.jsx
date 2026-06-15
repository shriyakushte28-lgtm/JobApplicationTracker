import React, { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { deleteJob } from "../services/jobService";

function Applications({ setPage, setSelectedJob }) {
  const [jobs, setJobs] = useState([]);
  const handleEdit = (job) => {
  setSelectedJob(job);
  setPage("addjob");
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await getAllJobs();
    setJobs(data);
  };

  const handleDelete = async (id) => {

    await deleteJob(id);

    loadJobs();
  };

  return (
    <div>
        <h1>Job Applications</h1>

        <table border="1" cellPadding="10">
            <thead>
                <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {jobs.map((job) => (
                <tr key={job.id}>
                    <td>{job.id}</td>
                    <td>{job.companyName}</td>
                    <td>{job.jobRole}</td>
                    <td>{job.status}</td>
                    <td>
                      <span className={`status ${job.status.toLowerCase()}`}>
                        {job.status}
                        </span>
                    </td>

                    <td>
                      <button onClick={() => handleEdit(job)}>
                        Edit
                      </button>

                      <button onClick={() => handleDelete(job.id)}>
                        Delete
                      </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default Applications;