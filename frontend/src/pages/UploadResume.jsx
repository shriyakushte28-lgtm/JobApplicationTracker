import { useState } from "react";

function UploadResume() {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a PDF file");
      return;
    }
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      "http://localhost:8080/api/resume/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const message = await response.text();

    alert(message);
  };

  return (
    <div className="form-container">
      <h1>Upload Resume</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload Resume
      </button>
    </div>
  );
}

export default UploadResume;