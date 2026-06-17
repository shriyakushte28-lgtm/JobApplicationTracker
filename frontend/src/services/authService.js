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