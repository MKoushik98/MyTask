import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./taskitem.css";

export default function TaskItem({ task }) {
  const { updateTask, deleteTask } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description,
  });

  const handleChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!editForm.title.trim() || !editForm.description.trim()) {
      return alert("Both fields required");
    }
    updateTask(task.id, editForm.title, editForm.description);
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <div className="task-edit-form">
          <input
            className="task-input"
            name="title"
            value={editForm.title}
            onChange={handleChange}
            placeholder="Task title"
          />
          <input
            className="task-input"
            name="description"
            value={editForm.description}
            onChange={handleChange}
            placeholder="Task description"
          />
          <div className="task-actions">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="task-view">
          <div className="task-info">
            <h4 className="task-title">{task.title}</h4>
            <p className="task-desc">{task.description}</p>
          </div>
          <div className="task-actions">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              title="Edit"
            >
              ✏️
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
