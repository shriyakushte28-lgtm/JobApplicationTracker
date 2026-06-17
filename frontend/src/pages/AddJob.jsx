import { useState, useEffect } from "react";
import { addJob, updateJob } from "../services/jobService";

function AddJob({ selectedJob, setSelectedJob }) {

  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [status, setStatus] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("");
  const [interviewDate, setInterviewDate] = useState("");

  useEffect(() => {
    if (selectedJob) {
      setCompanyName(selectedJob.companyName);
      setJobRole(selectedJob.jobRole);
      setApplicationDate(selectedJob.applicationDate);
      setStatus(selectedJob.status);
      setJobLink(selectedJob.jobLink);
      setNotes(selectedJob.notes);
    }
  }, [selectedJob]);

const handleSubmit = async () => {

  const job = {
    companyName,
    jobRole,
    applicationDate,
    interviewDate,
    status,
    priority,
    userEmail: localStorage.getItem("userEmail"),
    jobLink,
    notes,
  };

  if (selectedJob) {

    await updateJob(selectedJob.id, job);

    alert("Job Updated Successfully!");

    setSelectedJob(null);

  } else {

    await addJob(job);

    alert("Job Added Successfully!");
  }

  setCompanyName("");
  setJobRole("");
  setApplicationDate("");
  setStatus("");
  setJobLink("");
  setNotes("");
};

  return (
    <div className="form-container">
      <h1>
        {selectedJob ? "Edit Job" : "Add Job"}
      </h1>

      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Job Role"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={applicationDate}
        onChange={(e) => setApplicationDate(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={interviewDate}
        onChange={(e) => setInterviewDate(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <br /><br />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <br /><br />

      <input
        type="text"
        placeholder="Job Link"
        value={jobLink}
        onChange={(e) => setJobLink(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        {selectedJob ? "Update Job" : "Add Job"}
      </button>
    </div>
  );
}

export default AddJob;