import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onEdit, onToggle }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TaskList;
