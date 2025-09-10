import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TaskItem from "./TaskItem";
import "./taskmanager.css";

export default function TaskManager() {
  const { user, tasks, addTask, error, logout } = useContext(AuthContext);
  const [taskForm, setTaskForm] = useState({ title: "", description: "" });

  if (!user) return null;

  const handleChange = (e) =>
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });

  const handleAddTask = () => {
    if (!taskForm.title.trim() || !taskForm.description.trim()) {
      return alert("Both title and description required");
    }
    addTask(taskForm.title, taskForm.description);
    setTaskForm({ title: "", description: "" });
  };

  return (
    <div className="task-manager">
      <div className="task-header">
        <h2 className="task-heading">Welcome, {user}</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="task-form">
        <input
          className="task-input"
          name="title"
          value={taskForm.title}
          onChange={handleChange}
          placeholder="Task Title"
        />
        <input
          className="task-input"
          name="description"
          value={taskForm.description}
          onChange={handleChange}
          placeholder="Task Description"
        />
        <button className="add-btn" onClick={handleAddTask}>
          + Add Task
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
