import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // 🔹 Register
  const register = async (formData) => {
    try {
      setError(null);
      await axios.post("http://localhost:5000/register", formData);
      alert("Registration successful! Please login.");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  // 🔹 Login
  const login = async (username, password) => {
    try {
      setError(null);
      const res = await axios.post("http://localhost:5000/login", { username, password });
      setUser(res.data.username);
      fetchTasks(res.data.username);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
    setTasks([]);
  };

  // 🔹 Fetch tasks
  const fetchTasks = async (username) => {
    try {
      const res = await axios.get(`http://localhost:5000/tasks/${username}`);
      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    }
  };

  // 🔹 Add task
  const addTask = async (title, description) => {
    try {
      setError(null);
      const res = await axios.post(`http://localhost:5000/tasks/${user}`, {
        title,
        description,
      });
      setTasks([...tasks, res.data]);
    } catch (err) {
      setError(err.response?.data?.message || "Task creation failed");
    }
  };

  // 🔹 Update task
  const updateTask = async (id, title, description) => {
    try {
      setError(null);
      const res = await axios.put(`http://localhost:5000/tasks/${user}/${id}`, {
        title,
        description,
      });
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      setError(err.response?.data?.message || "Task update failed");
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    try {
      setError(null);
      await axios.delete(`http://localhost:5000/tasks/${user}/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Task deletion failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
        tasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
