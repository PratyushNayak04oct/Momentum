'use client';

import { Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ activeView }) => {
  const { isDark, toggleTheme } = useTheme();

  const getTitle = () => {
    switch (activeView) {
      case 'todo': 
        return 'Today';
      case 'pomodoro': 
        return 'Timer';
      case 'calendar': 
        return 'Past';
      case 'summary': 
        return "Today's Summary";
      case 'habits': 
        return 'Habits';
      case 'mood': 
        return 'Mood Journal';
      case 'about': 
        return 'About';
      default: 
        return 'Momentum';
    }
  };

  const getNavItems = () => {
    switch (activeView) {
      case 'todo':
        return ['Today', 'Upcoming', 'Inbox', 'Projects'];
      case 'summary':
      case 'pomodoro':
        return ['Home', 'Tasks', 'Calendar', 'Reports'];
      case 'calendar':
        return ['Today', 'Calendar', 'Focus'];
      case 'about':
        return ['Overview', 'Features', 'Developer'];
      default:
        return [];
    }
  };

  const getSubtitle = () => {
    const today = new Date();
    
    if (activeView === 'todo') {
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      return today.toLocaleDateString('en-US', options);
    }
    
    if (activeView === 'summary') {
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      return today.toLocaleDateString('en-US', options);
    }
    
    return null;
  };

  const handleNotificationClick = () => {
    // Handle notification click - could open a notification panel
    console.log('Notifications clicked');
  };

  const handleNavItemClick = (item) => {
    // Handle navigation item click
    console.log(`Navigation item clicked: ${item}`);
  };

  const navItems = getNavItems();
  const subtitle = getSubtitle();

  return (
    <div className = "header">
      <div className = "header-left">
        <h1 className = "page-title">{getTitle()}</h1>
        {subtitle && (
          <span className = "page-subtitle">{subtitle}</span>
        )}
      </div>
      
      <div className = "header-right">
        {navItems.length > 0 && (
          <nav className = "header-nav" role="navigation" aria-label="Page navigation">
            {navItems.map((item, index) => (
              <button 
                key={`nav-${item}-${index}`} 
                type="button"
                className = "nav-link"
                onClick={() => handleNavItemClick(item)}
                aria-label={`Navigate to ${item}`}
              >
                {item}
              </button>
            ))}
          </nav>
        )}
        
        <div className = "header-actions">
          <button 
            type="button"
            className = "action-btn"
            onClick={handleNotificationClick}
            aria-label="View notifications"
          >
            <Bell size={18} aria-hidden="true" />
          </button>
          
          <button 
            type="button"
            className = "action-btn" 
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            {isDark ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
          </button>
          
          <div className = "user-avatar">
            <img 
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
              alt="User profile avatar"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;