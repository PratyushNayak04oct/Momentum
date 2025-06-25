'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendar = (date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className = "calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 5 && date.getMonth() === 9; // Highlighting day 5 as shown in image
      days.push(
        <button
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''}`}
          onClick={() => setSelectedDate(day)}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const productivityData = [
    { date: 'Oct 28, 2024', score: 85, note: 'Completed all tasks, felt very productive.' },
    { date: 'Oct 27, 2024', score: 70, note: 'Some distractions, but overall a good day.' },
    { date: 'Oct 26, 2024', score: 90, note: 'Focused and efficient, achieved a lot.' },
    { date: 'Oct 25, 2024', score: 60, note: 'Low energy, struggled to concentrate.' },
    { date: 'Oct 24, 2024', score: 75, note: 'Steady progress, good work-life balance.' }
  ];

  return (
    <div className = "calendar-container">
      <div className = "calendar-grid">
        {/* October 2024 Calendar */}
        <div className = "calendar-month">
          <div className = "calendar-header">
            <button onClick={() => navigateMonth(-1)} className = "nav-btn">
              <ChevronLeft size={20} />
            </button>
            <h3>October 2024</h3>
            <div></div>
          </div>
          <div className = "calendar-weekdays">
            {dayNames.map((day, index) => (
              <div key={`oct-${index}`} className = "weekday">{day}</div>
            ))}
          </div>
          <div className = "calendar-days">
            {renderCalendar(new Date(2024, 9, 1))}
          </div>
        </div>

        {/* November 2024 Calendar */}
        <div className = "calendar-month">
          <div className = "calendar-header">
            <div></div>
            <h3>November 2024</h3>
            <button onClick={() => navigateMonth(1)} className = "nav-btn">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className = "calendar-weekdays">
            {dayNames.map((day, index) => (
              <div key={`nov-${index}`} className = "weekday">{day}</div>
            ))}
          </div>
          <div className = "calendar-days">
            {renderCalendar(new Date(2024, 10, 1))}
          </div>
        </div>
      </div>

      <div className = "productivity-history">
        <h2>October 2024</h2>
        <div className = "productivity-table">
          <div className = "table-header">
            <div className = "col-date">Date</div>
            <div className = "col-score">Productivity Score</div>
            <div className = "col-notes">Notes</div>
          </div>
          {productivityData.map((entry, index) => (
            <div key={index} className = "table-row">
              <div className = "col-date">{entry.date}</div>
              <div className = "col-score">
                <div className = "score-bar">
                  <div 
                    className = "score-fill" 
                    style={{ width: `${entry.score}%` }}
                  ></div>
                </div>
                <span className = "score-number">{entry.score}</span>
              </div>
              <div className = "col-notes">{entry.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;