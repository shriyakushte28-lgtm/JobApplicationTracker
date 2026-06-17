import { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const response = await loginUser({
      email,
      password,
    });

    if (response === "Login Successful!") {

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      window.location.reload();

    } else {

      alert(response);

    }
  };

  return (
    <div className="form-container">

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}

export default Login;