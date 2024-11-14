import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Task = ({ task, setTasks, tasks, darkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  const handleEdit = () => {
    if (isEditing) {
      setTasks(tasks.map(t => (t.id === task.id ? { ...t, text: newText } : t)));
    }
    setIsEditing(!isEditing);
  };

  const deleteTask = () => {
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-gray-200 text-gray-800'} transition-all`}
      >
        <div className="flex items-center space-x-3">
          <button
            onClick={() => toggleComplete(task.id)}
            className={`rounded-full p-1 ${task.isCompleted ? 'text-green-500' : 'text-gray-500'} hover:text-green-700 transition-all`}
          >
            <FiCheck size={20} />
          </button>

          {isEditing ? (
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="p-1 text-lg border-b bg-transparent focus:outline-none focus:ring focus:border-blue-400 transition-all"
            />
          ) : (
            <span className={`text-lg ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
              {task.text} - <span className={`font-semibold ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>{task.priority}</span>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <FiEdit2 size={20} />
          </button>
          <button
            onClick={deleteTask}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Task;
