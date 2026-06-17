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

export const registerUser = async (user) => {
  const response = await fetch(
    "http://localhost:8080/api/users/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  return response.text();
};

export const loginUser = async (user) => {
  const response = await fetch(
    "http://localhost:8080/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  return response.text();
};