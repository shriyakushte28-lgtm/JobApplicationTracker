import { useEffect, useState } from "react";
import {
  uploadResume,
  getAllResumes,
  deleteResume,
} from "../services/resumeService";

function ResumePage() {

  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    const data = await getAllResumes();
    setResumes(data);
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a PDF");
      return;
    }

    await uploadResume(file);

    alert("Resume uploaded successfully!");

    loadResumes();
  };

  const handleDelete = async (id) => {

    await deleteResume(id);

    loadResumes();
  };

  return (
    <div>

      <h1>Resume Management</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button onClick={handleUpload}>
        Upload Resume
      </button>

      <hr />

      <h2>Uploaded Resumes</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>File Name</th>
            <th>Upload Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {resumes.map((resume) => (
            <tr key={resume.id}>
              <td>{resume.id}</td>
              <td>{resume.fileName}</td>
              <td>{resume.uploadDate}</td>
              <td>
  <button
    onClick={() =>
      window.open(
        `http://localhost:8080/api/resume/download/${resume.id}`
      )
    }
  >
    Download
  </button>

  <button
    onClick={() => handleDelete(resume.id)}
  >
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

export default ResumePage;