import React, { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { deleteJob } from "../services/jobService";

function Applications({ setPage, setSelectedJob }) {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
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

  const filteredJobs = jobs.filter((job) => {

    const matchesSearch =
      job.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.jobRole
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {

    if (sortOrder === "newest") {
      return new Date(b.applicationDate) - new Date(a.applicationDate);
    }

    return new Date(a.applicationDate) - new Date(b.applicationDate);
  });

  return (
    <div>
        <h1>Job Applications</h1>

        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <br /><br />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>

        <br /><br />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <table border="1" cellPadding="10">
            <thead>
                <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Role</th>
                <th>Application Date</th>
                <th>Interview Date</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {sortedJobs.map((job) => (
                <tr key={job.id}>
                    <td>{job.id}</td>
                    <td>{job.companyName}</td>
                    <td>{job.jobRole}</td>
                    <td>{job.applicationDate}</td>
                    <td>{job.interviewDate || "-"}</td>
                    <td>{job.status}</td>
                    <td>
                      <span className={`priority ${job.priority?.toLowerCase()}`}>
                        {job.priority}
                      </span>
                    </td>
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