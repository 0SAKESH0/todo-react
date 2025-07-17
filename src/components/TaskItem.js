import React from "react";

const TaskItem = ({ task, onDelete, onEdit, onToggle }) => {
  return (
    <div className="task-item">
      <span
        className={task.completed ? "text completed" : "text"}
        onClick={() => onToggle(task.id)}
      >
        {task.text} {task.date && `(${task.date})`}
      </span>
      <div className="actions">
        <button className="btn" onClick={() => onEdit(task.id)}>
          ✏️
        </button>
        <button className="btn" onClick={() => onDelete(task.id)}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
