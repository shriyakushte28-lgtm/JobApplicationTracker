const API_URL = "http://localhost:8080/api/jobs";

export const getAllJobs = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addJob = async (job) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  return response.json();
}

export const deleteJob = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};

export const updateJob = async (id, job) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  return response.json();
};