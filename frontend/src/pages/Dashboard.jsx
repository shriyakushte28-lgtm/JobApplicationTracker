import { useEffect, useState } from "react";
import { getUserJobs } from "../services/jobService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {

    const email = localStorage.getItem("userEmail");

    const data = await getUserJobs(email);

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

  const highPriority = jobs.filter(
    job => job.priority === "High"
  ).length;

  const mediumPriority = jobs.filter(
    job => job.priority === "Medium"
  ).length;

  const lowPriority = jobs.filter(
    job => job.priority === "Low"
  ).length;

  const priorityData = [
    { name: "High", value: highPriority },
    { name: "Medium", value: mediumPriority },
    { name: "Low", value: lowPriority },
  ];

  const PRIORITY_COLORS = [
    "#ef4444",
    "#f59e0b",
    "#22c55e",
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

  const interviewsThisWeek = upcomingInterviewJobs.filter((job) => {

    const interviewDate = new Date(job.interviewDate);

    const diffDays =
      (interviewDate - today) / (1000 * 60 * 60 * 24);

    return diffDays >= 0 && diffDays <= 7;

  }).length;

  const applicationsThisWeek = jobs.filter((job) => {

    if (!job.applicationDate) return false;

    const appDate = new Date(job.applicationDate);

    const diffDays =
      (today - appDate) / (1000 * 60 * 60 * 24);

    return diffDays >= 0 && diffDays <= 7;

  }).length;

  const applicationsThisMonth = jobs.filter((job) => {

    if (!job.applicationDate) return false;

    const appDate = new Date(job.applicationDate);

    return (
      appDate.getMonth() === today.getMonth() &&
      appDate.getFullYear() === today.getFullYear()
    );

  }).length;

  const successRate =
    totalJobs > 0
      ? ((selected / totalJobs) * 100).toFixed(1)
      : 0;

  const interviewRate =
    totalJobs > 0
      ? ((interview / totalJobs) * 100).toFixed(1)
      : 0;

  const monthlyData = [
  { month: "Jan", count: 0 },
  { month: "Feb", count: 0 },
  { month: "Mar", count: 0 },
  { month: "Apr", count: 0 },
  { month: "May", count: 0 },
  { month: "Jun", count: 0 },
  { month: "Jul", count: 0 },
  { month: "Aug", count: 0 },
  { month: "Sep", count: 0 },
  { month: "Oct", count: 0 },
  { month: "Nov", count: 0 },
  { month: "Dec", count: 0 },
];

jobs.forEach((job) => {

  if (!job.applicationDate) return;

  const month =
    new Date(job.applicationDate).getMonth();

  monthlyData[month].count++;

});

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card interview-upcoming">
          <h2>{upcomingInterviews}</h2>
          <p>Upcoming Interviews</p>
        </div>

        <div className="card">
          <h3>Interviews This Week</h3>
          <p>{interviewsThisWeek}</p>
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

        <div className="card">
          <h3>Applications This Week</h3>
          <p>{applicationsThisWeek}</p>
        </div>

        <div className="card">
          <h3>Applications This Month</h3>
          <p>{applicationsThisMonth}</p>
        </div>

        <div className="card">
          <h3>Success Rate</h3>
          <p>{successRate}%</p>
        </div>

        <div className="card">
          <h3>Interview Rate</h3>
          <p>{interviewRate}%</p>
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

      <h2>Priority Distribution</h2>

      <PieChart width={500} height={300}>
        <Pie
          data={priorityData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {priorityData.map((entry, index) => (
            <Cell
              key={index}
              fill={
                PRIORITY_COLORS[
                  index % PRIORITY_COLORS.length
                ]
              }
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>

      <h2>Monthly Application Trend</h2>

<BarChart
  width={700}
  height={300}
  data={monthlyData}
>
  <CartesianGrid strokeDasharray="3 3" />

  <XAxis dataKey="month" />

  <YAxis />

  <Tooltip />

  <Legend />

  <Bar
    dataKey="count"
    name="Applications"
  />
</BarChart>

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