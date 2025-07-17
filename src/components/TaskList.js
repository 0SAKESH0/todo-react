import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete, onEdit, onToggle }) => {
  if (tasks.length === 0) return <p>No tasks found.</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TaskList;
