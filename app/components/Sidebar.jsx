'use client';

import React from 'react';
import { CheckSquare, Timer, Calendar, BarChart3, Target, Smile } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'todo', label: 'To-Do List', icon: CheckSquare },
    { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'summary', label: 'Reports', icon: BarChart3 },
    { id: 'habits', label: 'Habits', icon: Target },
    { id: 'mood', label: 'Notes', icon: Smile }
  ];

  const handleNavClick = (itemId) => {
    setActiveView(itemId);
  };

  return (
    <div className = "sidebar">
      <div className = "sidebar-header">
        <div className = "logo">
          <div className = "logo-icon">◆</div>
          <span className = "logo-text">Momentum</span>
        </div>
      </div>
      
      <div className = "sidebar-section">
        <span className = "section-title">Momentum</span>
        <nav className = "nav-menu" role="navigation" aria-label="Main navigation">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                aria-pressed={activeView === item.id}
                aria-label={`Navigate to ${item.label}`}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;