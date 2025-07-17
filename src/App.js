import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [taskInput, setTaskInput] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  const addTask = () => {
    if (taskInput.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: taskInput,
      date: taskDate,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setTaskInput('');
    setTaskDate('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )));
  };

  const resetTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header>
        <h1>React To-Do List 📌</h1>
        <div className="theme-switcher">
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="default">Default</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </header>

      <div className="task-row">
        <input
          type="text"
          placeholder="Enter task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <button className="btn" onClick={addTask}>➕ Add</button>
        <button className="btn" onClick={resetTasks}>🧹 Reset</button>
      </div>

      <div className="top-controls">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="task-container">
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="task-row">
              <div
                className={`task-text ${task.completed ? 'completed' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.text} {task.date && `📅 ${task.date}`}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
