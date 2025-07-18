import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import { exportToPDF } from "./exportPDF";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Apply theme to <body>
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const addTask = () => {
    if (!input.trim()) return alert("Task cannot be empty");
    const newTask = {
      id: Date.now(),
      text: input,
      date,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setInput("");
    setDate("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    const newText = prompt("Edit task:", task.text);
    if (newText && newText.trim()) {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const resetTasks = () => {
    if (window.confirm("Clear all tasks?")) setTasks([]);
  };

  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row">
        <h1>React To-Do List 📌</h1>
        <button className="btn" onClick={toggleTheme}>
          {theme === "light" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="row">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addTask} className="btn add">➕ Add </button>
        <button onClick={resetTasks} className="btn reset">🔄 Reset </button>
        <button onClick={() => exportToPDF(filteredTasks)} className="btn export">📄 Export</button>
      </div>

      <input
        type="text"
        className="search"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onEdit={editTask}
        onToggle={toggleComplete}
      />
    </div>
  );
}

export default App;
