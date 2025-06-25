'use client';

import Image from 'next/image';
import { CheckSquare, Timer, Calendar, BarChart3, Target, Smile, Info, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Sidebar = ({ activeView, setActiveView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { id: 'todo', label: 'To-Do List', icon: CheckSquare },
    { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'summary', label: 'Reports', icon: BarChart3 },
    { id: 'habits', label: 'Habits', icon: Target },
    { id: 'mood', label: 'Notes', icon: Smile },
    { id: 'about', label: 'About', icon: Info }
  ];

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
    // Close sidebar on mobile after selection
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Menu Button - Only visible on mobile */}
      {isMobile && (
        <button
          className = "hamburger-btn"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className = "sidebar-overlay" onClick={handleOverlayClick} />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isMobile ? (isOpen ? 'sidebar-mobile-open' : 'sidebar-mobile-closed') : ''}`}>
        <div className = "sidebar-header">
          <div className = "logo">
            <Image 
              src="/logo.png" 
              height={100} 
              width={100} 
              alt="Momentum Logo" 
              className = "logo-image"
            />
            {(!isMobile || isOpen) && (
              <span className = "logo-text">Momentum</span>
            )}
          </div>
        </div>
        
        <div className = "sidebar-section">
          {(!isMobile || isOpen) && (
            <span className = "section-title">Momentum</span>
          )}
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
                  title={isMobile && !isOpen ? item.label : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  {(!isMobile || isOpen) && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;