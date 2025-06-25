'use client';

import Image from 'next/image';
import { CheckSquare, Timer, Calendar, BarChart3, Target, Smile, Info } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'todo', label: 'To-Do List', icon: CheckSquare },
    { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'summary', label: 'Reports', icon: BarChart3 },
    { id: 'habits', label: 'Habits', icon: Target },
    { id: 'mood', label: 'Notes', icon: Smile },
    { id: 'about', label: 'About', icon: Info }
  ];

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
  };

  return (
    <div className = "sidebar">
      <div className = "sidebar-header">
        <div className = "logo">
          <Image 
            src="/logo.png" 
            height={100} 
            width={100} 
            alt="Momentum Logo" 
            className = "logo-image"
          />
          <span className = "logo-text">Momentum</span>
        </div>
      </div>
      
      <div className = "sidebar-section">
        <span className = "section-title">Momentum</span>
        <nav className = "nav-menu" role="navigation" aria-label="Main navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleViewChange(item.id)}
                aria-current={isActive ? 'page' : undefined}
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