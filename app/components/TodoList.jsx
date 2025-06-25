'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';
import { useApp } from '../contexts/AppContext';

const TodoList = () => {
  const { tasks } = useApp(); // Use the context instead of local state
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleOpenModal = () => {
    setShowAddModal(true);
  };

  // Filter tasks for different views
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className = "todo-container">
      <div className = "todo-content">
        <div className = "todo-header">
          <h1 className = "page-title">Todo List</h1>
          <button 
            className = "add-task-btn primary"
            onClick={handleOpenModal}
            aria-label="Add new task"
          >
            <Plus size={18} aria-hidden="true" />
            Add Task
          </button>
        </div>

        <div className = "tasks-section">
          <div className = "section-header">
            <h2 className = "section-title">
              Active Tasks ({activeTasks.length})
            </h2>
          </div>
          
          <div className = "tasks-list">
            {activeTasks.length > 0 ? (
              activeTasks.map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task}
                />
              ))
            ) : (
              <div className = "empty-state">
                <p>No active tasks. Add a task to get started!</p>
              </div>
            )}
          </div>
        </div>

        {completedTasks.length > 0 && (
          <div className = "tasks-section">
            <div className = "section-header">
              <h2 className = "section-title">
                Completed Tasks ({completedTasks.length})
              </h2>
            </div>
            
            <div className = "tasks-list completed-tasks">
              {completedTasks.map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {showAddModal && (
        <AddTaskModal 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TodoList;