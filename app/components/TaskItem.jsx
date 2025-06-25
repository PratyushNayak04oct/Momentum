'use client';

import React from 'react';

const TaskItem = ({ task, onUpdateTask }) => {
  const toggleComplete = () => {
    if (onUpdateTask) {
      onUpdateTask(task.id, { completed: !task.completed });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return 'priority-low';
    }
  };

  const getCategoryClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'work': return 'category-work';
      case 'personal': return 'category-personal';
      default: return 'category-default';
    }
  };

  return (
    <div className = {`task-item ${task.completed ? 'completed' : ''}`}>
      <div className = "task-content">
        <div className = "task-main">
          <h3 className = "task-title">{task.title}</h3>
          {task.category && (
            <span className = {`task-category ${getCategoryClass(task.category)}`}>
              {task.category}
            </span>
          )}
          {task.priority && (
            <span className = {`task-priority ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          )}
        </div>
        {task.description && (
          <p className = "task-description">{task.description}</p>
        )}
        {task.dueDate && (
          <span className = "task-due-date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      <button 
        className = {`task-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={toggleComplete}
        aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        aria-pressed={task.completed}
      >
        {task.completed && (
          <span aria-hidden="true">✓</span>
        )}
      </button>
    </div>
  );
};

export default TaskItem;