import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

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

  const chartData = [
    { name: "Applied", value: applied },
    { name: "Interview", value: interview },
    { name: "Selected", value: selected },
    { name: "Rejected", value: rejected },
  ];

  const COLORS = [
    "#3b82f6",
    "#f59e0b",
    "#22c55e",
    "#ef4444",
  ];

  const upcomingInterviews = jobs.filter(
    (job) =>
      job.status === "Interview" &&
      job.interviewDate
  ).length;

  const today = new Date();

  const upcomingInterviewJobs = jobs.filter((job) => {
    if (!job.interviewDate) return false;

    const interviewDate = new Date(job.interviewDate);

    return (
      job.status === "Interview" &&
      interviewDate >= today
    );
  });

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card interview-upcoming">
          <h2>{upcomingInterviews}</h2>
          <p>Upcoming Interviews</p>
        </div>

        <div className="card total">
          <h3>Total Jobs</h3>
          <p>{totalJobs}</p>
        </div>

        <div className="card applied-card">
          <h3>Applied</h3>
          <p>{applied}</p>
        </div>

        <div className="card interview-card">
          <h3>Interview</h3>
          <p>{interview}</p>
        </div>

        <div className="card selected-card">
          <h3>Selected</h3>
          <p>{selected}</p>
        </div>

        <div className="card rejected-card">
          <h3>Rejected</h3>
          <p>{rejected}</p>
        </div>

      </div>

      <h2>Application Status Analytics</h2>

      <PieChart width={500} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>

      <h2>Upcoming Interviews</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Interview Date</th>
          </tr>
        </thead>

        <tbody>
          {upcomingInterviewJobs.length > 0 ? (
            upcomingInterviewJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.companyName}</td>
                <td>{job.jobRole}</td>
                <td>{job.interviewDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">
                No upcoming interviews
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default Dashboard;