'use client';

import React from 'react';
import Image from 'next/image';
import { Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ activeView }) => {
  const { isDark, toggleTheme, mounted } = useTheme();

  // Show loading state while mounting to prevent hydration issues
  if (!mounted) {
    return (
      <div className = "header">
        <div className = "header-left">
          <h1 className = "page-title">Loading...</h1>
        </div>
        <div className = "header-right">
          <div className = "header-actions">
            <button className = "action-btn">
              <Bell size={18} />
            </button>
            <button className = "action-btn">
              <Moon size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getTitle = () => {
    switch (activeView) {
      case 'todo': return 'Today';
      case 'pomodoro': return 'Timer';
      case 'calendar': return 'Past';
      case 'summary': return "Today's Summary";
      case 'habits': return 'Habits';
      case 'mood': return 'Mood Journal';
      default: return 'Momentum';
    }
  };

  const getNavItems = () => {
    if (activeView === 'todo') {
      return ['Today', 'Upcoming', 'Inbox', 'Projects'];
    }
    if (activeView === 'summary') {
      return ['Home', 'Tasks', 'Calendar', 'Reports'];
    }
    if (activeView === 'pomodoro') {
      return ['Home', 'Tasks', 'Calendar', 'Reports'];
    }
    if (activeView === 'calendar') {
      return ['Today', 'Calendar', 'Focus'];
    }
    return [];
  };

  return (
    <div className = "header">
      <div className = "header-left">
        <h1 className = "page-title">{getTitle()}</h1>
        {activeView === 'todo' && (
          <span className = "page-subtitle">Tue, Oct 15</span>
        )}
        {activeView === 'summary' && (
          <span className = "page-subtitle">June 12, 2024</span>
        )}
      </div>
      
      <div className = "header-right">
        <nav className = "header-nav">
          {getNavItems().map((item, index) => (
            <button key={index} className = "nav-link">
              {item}
            </button>
          ))}
        </nav>
        
        <div className = "header-actions">
          <button className = "action-btn">
            <Bell size={18} />
          </button>
          <button className = "action-btn" onClick={toggleTheme}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className = "user-avatar">
            <Image 
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
              alt="User"
              width={40}
              height={40}
              className = "avatar-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;