// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let tasks = {}; // { username: [ {id, title, description} ] }

// 📌 Email validation function
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 🔹 Register
app.post("/register", (req, res) => {
  const { name, phone, email, password, username } = req.body;

  if (!name || !phone || !email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (password.length < 4) {
    return res.status(400).json({ message: "Password must be at least 4 characters" });
  }
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  users.push({ name, phone, email, password, username });
  tasks[username] = [];
  res.json({ message: "User registered successfully" });
});

// 🔹 Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ message: "Login successful", username });
});

// 🔹 Get tasks
app.get("/tasks/:username", (req, res) => {
  const { username } = req.params;
  res.json(tasks[username] || []);
});

// 🔹 Add task
app.post("/tasks/:username", (req, res) => {
  const { username } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description required" });
  }

  const newTask = { id: Date.now(), title, description };
  tasks[username].push(newTask);
  res.json(newTask);
});

// 🔹 Update task
app.put("/tasks/:username/:id", (req, res) => {
  const { username, id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description required" });
  }

  let userTasks = tasks[username];
  let task = userTasks.find((t) => t.id == id);
  if (task) {
    task.title = title;
    task.description = description;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// 🔹 Delete task
app.delete("/tasks/:username/:id", (req, res) => {
  const { username, id } = req.params;
  tasks[username] = tasks[username].filter((t) => t.id != id);
  res.json({ message: "Task deleted" });
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
