'use client';

import { useApp } from '../contexts/AppContext';

const TaskItem = ({ task }) => {
  const { updateTask } = useApp();

  const toggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
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
      <button 
        type="button"
        className = {`task-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={toggleComplete}
        aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      >
        {task.completed && '✓'}
      </button>
    </div>
  );
};

export default TaskItem;