// app/page.jsx
'use client';

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TodoList from './components/TodoList';
import PomodoroTimer from './components/PomodoroTimer';
import Calendar from './components/Calendar';
import DailySummary from './components/DailySummary';
import HabitTracker from './components/HabitTracker';
import MoodJournal from './components/MoodJournal';

export default function HomePage() {
  const [activeView, setActiveView] = useState('todo');

  const renderActiveView = () => {
    switch (activeView) {
      case 'todo':
        return <TodoList />;
      case 'pomodoro':
        return <PomodoroTimer />;
      case 'calendar':
        return <Calendar />;
      case 'summary':
        return <DailySummary />;
      case 'habits':
        return <HabitTracker />;
      case 'mood':
        return <MoodJournal />;
      default:
        return <TodoList />;
    }
  };

  return (
    <div className = "app">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className = "main-content">
        <Header activeView={activeView} />
        <div className = "content-area">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
}