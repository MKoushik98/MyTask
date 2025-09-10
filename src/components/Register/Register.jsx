import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./register.css"; 

export default function Register({ switchToLogin }) {
  const { register, error } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateAndSubmit = () => {
    if (!form.name || !form.phone || !form.email || !form.username || !form.password) {
      return alert("All fields are required");
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return alert("Invalid email format");
    }
    if (form.password.length < 4) {
      return alert("Password must be at least 4 characters");
    }
    register(form);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create an Account</h2>
      <input
        className="register-input"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />
      <input
        className="register-input"
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
      />
      <input
        className="register-input"
        name="email"
        placeholder="Email Address"
        onChange={handleChange}
      />
      <input
        className="register-input"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        className="register-input"
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <button className="register-btn" onClick={validateAndSubmit}>
        Register
      </button>
      <p className="switch-link">
        Already registered?{" "}
        <button className="switch-btn" onClick={switchToLogin}>
          Login here
        </button>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
