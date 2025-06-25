'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const AddTaskModal = ({ onClose }) => {
  const { addTask } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Personal',
    priority: 'Medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      addTask(formData);
      onClose();
    }
  };

  return (
    <div className = "modal-overlay">
      <div className = "modal">
        <div className = "modal-header">
          <h3>Add New Task</h3>
          <button className = "close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className = "modal-form">
          <div className = "form-group">
            <label>Task Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter task title"
              autoFocus
            />
          </div>
          
          <div className = "form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
            </select>
          </div>
          
          <div className = "form-group">
            <label>Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div className = "modal-actions">
            <button type="button" className = "btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className = "btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;