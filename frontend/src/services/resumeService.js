const API_URL =
  "http://localhost:8080/api/resume";

export const uploadResume = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_URL}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.text();
};

export const getAllResumes = async () => {

  const response = await fetch(API_URL);

  return response.json();
};

export const deleteResume = async (id) => {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  return response.text();
};