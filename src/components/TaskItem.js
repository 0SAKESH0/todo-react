import React from "react";

function TaskItem({ task, onDelete, onEdit, onToggle }) {
  return (
    <li className={`task-item ${task.completed ? "done" : ""}`}>
      <span onClick={() => onToggle(task.id)}>{task.text} {task.date && ` ${task.date}`}</span>
      <div>
        <button className="btn" onClick={() => onEdit(task.id)}> Edit ✏️</button><span> </span>
        <button className="btn" onClick={() => onDelete(task.id)}> Delete 🗑️</button>
      </div>
    </li>
  );
}

export default TaskItem;
