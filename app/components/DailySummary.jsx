'use client';

import React from 'react';
import { useApp } from '../contexts/AppContext';

const DailySummary = () => {
  const { tasks, habits, pomodoroSessions } = useApp();
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const focusTime = pomodoroSessions.reduce((total, session) => 
    session.type === 'work' ? total + session.duration : total, 0
  );
  
  const moodData = [
    { time: '8AM', value: 7 },
    { time: '10AM', value: 8 },
    { time: '12PM', value: 6 },
    { time: '2PM', value: 7 },
    { time: '4PM', value: 9 },
    { time: '6PM', value: 8 },
    { time: '8PM', value: 7 }
  ];
  
  const completedHabits = habits.filter(habit => habit.completedToday).length;

  return (
    <div className = "summary-container">
      <div className = "summary-grid">
        <div className = "summary-section">
          <h2>Tasks</h2>
          <div className = "stats-grid">
            <div className = "stat-card">
              <h3>Tasks Completed</h3>
              <div className = "stat-value">{completedTasks}/{totalTasks}</div>
            </div>
            <div className = "stat-card">
              <h3>Focus Time</h3>
              <div className = "stat-value">{Math.floor(focusTime / 60)}h {focusTime % 60}m</div>
            </div>
          </div>
        </div>
        
        <div className = "summary-section">
          <h2>Mood</h2>
          <div className = "mood-section">
            <h3>Mood</h3>
            <div className = "mood-chart">
              <svg viewBox="0 0 800 200" className = "mood-graph">
                <path
                  d="M 50 150 Q 150 100 200 120 T 350 130 T 500 80 T 650 100 T 750 120"
                  stroke="var(--primary-color)"
                  strokeWidth="3"
                  fill="none"
                />
                {moodData.map((point, index) => (
                  <circle
                    key={index}
                    cx={50 + (index * 100)}
                    cy={200 - (point.value * 15)}
                    r="4"
                    fill="var(--primary-color)"
                  />
                ))}
              </svg>
              <div className = "mood-labels">
                {moodData.map((point, index) => (
                  <span key={index} className = "mood-label">{point.time}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className = "summary-section">
          <h2>Habits</h2>
          <div className = "habits-grid">
            {habits.map(habit => (
              <div key={habit.id} className = "habit-card">
                <h3>{habit.name}</h3>
                <div className = "habit-status">
                  {habit.completedToday ? 'Completed' : 'Skipped'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;