import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiPlus } from 'react-icons/fi';
import './App.css';
import Task from './components/Task';

function App() {
  const [tasks, setTasks] = useState(() => {
    // Load initial tasks from localStorage
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Add a new task
  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { id: Date.now(), text: taskInput, isCompleted: false }]);
      setTaskInput('');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-500`}>
      <div className="glassmorphic-container max-w-lg w-full p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">To-Do List</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md focus:outline-none text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 p-3 rounded-lg bg-transparent text-lg placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none"
          />
          <button
            onClick={addTask}
            className="ml-3 p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors"
          >
            <FiPlus size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {tasks.map(task => (
            <Task
              key={task.id}
              task={task}
              setTasks={setTasks}
              tasks={tasks}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
