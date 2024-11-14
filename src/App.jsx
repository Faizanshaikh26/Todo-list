import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiPlus, FiSearch } from 'react-icons/fi';
import './App.css';
import Task from './components/Task';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('Date');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskInput, isCompleted: false, priority, date: new Date() }
      ]);
      setTaskInput('');
    }
  };

  const filteredTasks = tasks
    .filter(task => task.text.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortCriteria === 'Priority') {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortCriteria === 'Alphabetical') {
        return a.text.localeCompare(b.text);
      } else if (sortCriteria === 'Completed') {
        return a.isCompleted - b.isCompleted;
      }
      return new Date(a.date) - new Date(b.date);
    });

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-500`}>
      <div className={`glassmorphic-container max-w-lg w-full p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">To-Do List</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md focus:outline-none text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task"
            className={`flex-1 p-3 rounded-lg text-lg placeholder-gray-500 dark:placeholder-gray-400 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} focus:outline-none`}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`ml-3 p-2 rounded-lg ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} transition-colors`}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button
            onClick={addTask}
            className="ml-3 p-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors"
          >
            <FiPlus size={20} />
          </button>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex-1 p-3 rounded-lg text-lg placeholder-gray-500 dark:placeholder-gray-400 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} focus:outline-none`}
          />
          <FiSearch size={20} className="ml-3 text-gray-500" />
        </div>

        <div className="flex justify-between mb-4">
          <span>Sort by:</span>
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className={`ml-3 p-2 rounded-lg border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
          >
            <option value="Date">Date Added</option>
            <option value="Priority">Priority</option>
            <option value="Completed">Completion Status</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredTasks.map(task => (
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
