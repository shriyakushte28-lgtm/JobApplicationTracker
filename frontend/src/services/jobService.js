const API_URL = "http://localhost:8080/api/jobs";

export const getAllJobs = async () => {
  const response = await fetch(API_URL);
  return response.json();
};