import React, { useState, useEffect } from 'react';
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";
import { FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Load tasks from local storage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Update local storage with tasks
  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Add a new task
  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      if (editingIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = { text: taskInput, checked: tasks[editingIndex].checked };
        setTasks(updatedTasks);
        updateLocalStorage(updatedTasks);
        setTaskInput('');
        setEditingIndex(null);
      } else {
        const updatedTasks = [...tasks, { text: taskInput, checked: false }];
        setTasks(updatedTasks);
        updateLocalStorage(updatedTasks);
        setTaskInput('');
      }
    }
  };

  // Edit an existing task
  const handleEditTask = (index) => {
    setTaskInput(tasks[index].text);
    setEditingIndex(index);
  };

  // Delete an existing task
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  // To check or uncheck a task
  const handleToggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], checked: !updatedTasks[index].checked };
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  return (
    <div className='container'>
        <h1 className='label'>
            To-Do List
        </h1>
        <div className='task-input-field'>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter a task..."
            />
            <button onClick={handleAddTask}>
                {editingIndex !== null ? 'Update' : 'Add'}
            </button>
        </div>
        <ul>
            {tasks.map((task, index) => (
            <li key={index} className={task.checked ? 'checked-task' : ''}>
                <div className='task-content'>
                    {/* Render empty or checked circle icon based on task's checked state */}
                    {task.checked ? (
                    <FaRegCircleCheck onClick={() => handleToggleTask(index)} />
                    ) : (
                    <FaRegCircle onClick={() => handleToggleTask(index)} />
                    )}
                    <span>{task.text}</span>
                </div>
                <div className='task-buttons'>
                    <button className='edit-button' onClick={() => handleEditTask(index)}>
                        <FaEdit />
                    </button>
                    <button className='delete-button' onClick={() => handleDeleteTask(index)}>
                        <FaTrash />
                    </button>
                </div>
            </li>
            ))}
        </ul>
    </div>
  );
}

export default App;
