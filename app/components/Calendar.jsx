'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
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

  const isToday = (day, month, year) => {
    const today = new Date();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
  };

  const renderCalendar = (date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div 
          key={`empty-${i}`} 
          className = "calendar-day empty"
          aria-hidden="true"
        />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isTodayDate = isToday(day, date.getMonth(), date.getFullYear());
      const isSelected = selectedDate === day;
      
      days.push(
        <button
          key={day}
          type="button"
          className={`calendar-day ${isTodayDate ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateSelect(day)}
          aria-label={`Select ${monthNames[date.getMonth()]} ${day}, ${date.getFullYear()}`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const getCurrentMonth = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  };

  const getNextMonth = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  };

  // Sample productivity data - in a real app, this would come from props or context
  const productivityData = [
    { 
      date: `${monthNames[currentDate.getMonth()]} ${Math.max(1, currentDate.getDate() - 3)}, ${currentDate.getFullYear()}`, 
      score: 85, 
      note: 'Completed all tasks, felt very productive.' 
    },
    { 
      date: `${monthNames[currentDate.getMonth()]} ${Math.max(1, currentDate.getDate() - 2)}, ${currentDate.getFullYear()}`, 
      score: 70, 
      note: 'Some distractions, but overall a good day.' 
    },
    { 
      date: `${monthNames[currentDate.getMonth()]} ${Math.max(1, currentDate.getDate() - 1)}, ${currentDate.getFullYear()}`, 
      score: 90, 
      note: 'Focused and efficient, achieved a lot.' 
    },
    { 
      date: `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`, 
      score: 60, 
      note: 'Low energy, struggled to concentrate.' 
    },
    { 
      date: `${monthNames[currentDate.getMonth()]} ${Math.min(getDaysInMonth(currentDate), currentDate.getDate() + 1)}, ${currentDate.getFullYear()}`, 
      score: 75, 
      note: 'Steady progress, good work-life balance.' 
    }
  ];

  return (
    <div className = "calendar-container">
      <div className = "calendar-grid">
        {/* Current Month Calendar */}
        <div className = "calendar-month">
          <div className = "calendar-header">
            <button 
              type="button"
              onClick={() => navigateMonth(-1)} 
              className = "nav-btn"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            <h3>
              {monthNames[getCurrentMonth().getMonth()]} {getCurrentMonth().getFullYear()}
            </h3>
            <div aria-hidden="true" />
          </div>
          <div className = "calendar-weekdays">
            {dayNames.map((day, index) => (
              <div key={`current-${day}-${index}`} className = "weekday">
                {day}
              </div>
            ))}
          </div>
          <div className = "calendar-days">
            {renderCalendar(getCurrentMonth())}
          </div>
        </div>

        {/* Next Month Calendar */}
        <div className = "calendar-month">
          <div className = "calendar-header">
            <div aria-hidden="true" />
            <h3>
              {monthNames[getNextMonth().getMonth()]} {getNextMonth().getFullYear()}
            </h3>
            <button 
              type="button"
              onClick={() => navigateMonth(1)} 
              className = "nav-btn"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className = "calendar-weekdays">
            {dayNames.map((day, index) => (
              <div key={`next-${day}-${index}`} className = "weekday">
                {day}
              </div>
            ))}
          </div>
          <div className = "calendar-days">
            {renderCalendar(getNextMonth())}
          </div>
        </div>
      </div>

      <div className = "productivity-history">
        <h2>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className = "productivity-table">
          <div className = "table-header">
            <div className = "col-date">Date</div>
            <div className = "col-score">Productivity Score</div>
            <div className = "col-notes">Notes</div>
          </div>
          {productivityData.map((entry, index) => (
            <div key={`productivity-${index}`} className = "table-row">
              <div className = "col-date">{entry.date}</div>
              <div className = "col-score">
                <div className = "score-bar" role="progressbar" aria-valuenow={entry.score} aria-valuemin="0" aria-valuemax="100">
                  <div 
                    className = "score-fill" 
                    style={{ width: `${entry.score}%` }}
                  />
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