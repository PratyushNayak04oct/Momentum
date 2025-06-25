'use client';

import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    category: task.category,
    priority: task.priority
  });

  const toggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editData.title.trim()) {
      updateTask(task.id, editData);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      title: task.title,
      category: task.category,
      priority: task.priority
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': 
        return 'priority-high';
      case 'Medium': 
        return 'priority-medium';
      case 'Low': 
        return 'priority-low';
      default: 
        return 'priority-low';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'High': 
        return 'Urgent';
      case 'Medium': 
        return 'Medium';
      case 'Low': 
        return 'Low';
      default: 
        return 'Low';
    }
  };

  if (isEditing) {
    return (
      <div className = "task-item editing">
        <div className = "task-edit-form">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            className = "edit-input"
            autoFocus
          />
          <div className = "edit-selects">
            <select
              value={editData.category}
              onChange={(e) => setEditData({...editData, category: e.target.value})}
              className = "edit-select"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
            </select>
            <select
              value={editData.priority}
              onChange={(e) => setEditData({...editData, priority: e.target.value})}
              className = "edit-select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className = "edit-actions">
            <button onClick={handleSaveEdit} className = "btn-save">
              Save
            </button>
            <button onClick={handleCancelEdit} className = "btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className = {`task-item ${task.completed ? 'completed' : ''}`}>
      <div className = "task-content">
        <div className = "task-main">
          <h3 className = "task-title">{task.title}</h3>
          <div className = "task-tags">
            <span 
              className = {`task-category ${
                task.category === 'Work' ? 'category-work' : 'category-personal'
              }`}
            >
              {task.category}
            </span>
            <span className = {`task-priority ${getPriorityColor(task.priority)}`}>
              {getPriorityLabel(task.priority)}
            </span>
          </div>
        </div>
      </div>
      
      <div className = "task-actions">
        <button 
          className = "task-action-btn edit-btn"
          onClick={handleEdit}
          aria-label={`Edit task "${task.title}"`}
        >
          <Edit2 size={16} />
        </button>
        <button 
          className = "task-action-btn delete-btn"
          onClick={handleDelete}
          aria-label={`Delete task "${task.title}"`}
        >
          <Trash2 size={16} />
        </button>
        <button 
          type="button"
          className = {`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={toggleComplete}
          aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        >
          {task.completed && '✓'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;