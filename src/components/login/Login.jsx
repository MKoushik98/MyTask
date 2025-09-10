import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./login.css"; 

export default function Login({ switchToRegister }) {
  const { login, error } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateAndSubmit = () => {
    if (!form.username || !form.password) {
      return alert("All fields are required");
    }
    login(form.username, form.password);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <input
        className="login-input"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        className="login-input"
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <button className="login-btn" onClick={validateAndSubmit}>
        Login
      </button>
      <p className="switch-link">
        New user?{" "}
        <button className="switch-btn" onClick={switchToRegister}>
          Register here
        </button>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
