'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Clock } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('event');
  const [eventTime, setEventTime] = useState('');

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
    setSelectedDate(null);
  };

  const isToday = (day, month, year) => {
    const today = new Date();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  const getDateKey = (day, month, year) => {
    return `${year}-${month}-${day}`;
  };

  const hasEvents = (day, month, year) => {
    const dateKey = getDateKey(day, month, year);
    return events[dateKey] && events[dateKey].length > 0;
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
  };

  const handleAddEvent = (day) => {
    setSelectedDate(day);
    setShowEventModal(true);
  };

  const saveEvent = () => {
    if (!eventTitle.trim()) return;

    const dateKey = getDateKey(selectedDate, currentDate.getMonth(), currentDate.getFullYear());
    const newEvent = {
      id: Date.now().toString(),
      title: eventTitle,
      type: eventType,
      time: eventTime,
      date: selectedDate
    };

    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent]
    }));

    setEventTitle('');
    setEventTime('');
    setShowEventModal(false);
  };

  const deleteEvent = (eventId) => {
    const dateKey = getDateKey(selectedDate, currentDate.getMonth(), currentDate.getFullYear());
    setEvents(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(event => event.id !== eventId)
    }));
  };

  const getSelectedDateEvents = () => {
    if (!selectedDate) return [];
    const dateKey = getDateKey(selectedDate, currentDate.getMonth(), currentDate.getFullYear());
    return events[dateKey] || [];
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
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
      const isTodayDate = isToday(day, currentDate.getMonth(), currentDate.getFullYear());
      const isSelected = selectedDate === day;
      const hasEventsOnDay = hasEvents(day, currentDate.getMonth(), currentDate.getFullYear());
      
      days.push(
        <div key={day} className = "calendar-day-container">
          <button
            type="button"
            className = {`calendar-day ${isTodayDate ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasEventsOnDay ? 'has-events' : ''}`}
            onClick={() => handleDateSelect(day)}
            aria-label={`Select ${monthNames[currentDate.getMonth()]} ${day}, ${currentDate.getFullYear()}`}
          >
            {day}
            {hasEventsOnDay && <div className = "event-dot" />}
          </button>
          {isSelected && (
            <button
              type="button"
              className = "add-event-btn"
              onClick={() => handleAddEvent(day)}
              aria-label={`Add event for ${monthNames[currentDate.getMonth()]} ${day}`}
            >
              <Plus size={12} />
            </button>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className = "calendar-container">
      {/* Single Month Calendar */}
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
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
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
            <div key={`day-${index}`} className = "weekday">
              {day}
            </div>
          ))}
        </div>
        
        <div className = "calendar-days">
          {renderCalendar()}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className = "selected-date-events">
          <div className = "events-header">
            <h3>
              {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
            </h3>
            <button
              type="button"
              className = "add-event-btn-header"
              onClick={() => handleAddEvent(selectedDate)}
            >
              <Plus size={16} />
              Add Event
            </button>
          </div>
          
          <div className = "events-list">
            {getSelectedDateEvents().length === 0 ? (
              <div className = "no-events">
                <div className = "no-events-icon">📅</div>
                <p>No events for this date</p>
              </div>
            ) : (
              getSelectedDateEvents().map(event => (
                <div key={event.id} className = "event-item">
                  <div className = "event-content">
                    <div className = "event-header">
                      <span className = {`event-type ${event.type}`}>
                        {event.type === 'task' ? 'Task' : 'Event'}
                      </span>
                      {event.time && (
                        <span className = "event-time">
                          <Clock size={12} />
                          {event.time}
                        </span>
                      )}
                    </div>
                    <h4 className = "event-title">{event.title}</h4>
                  </div>
                  <button
                    type="button"
                    className = "delete-event-btn"
                    onClick={() => deleteEvent(event.id)}
                    aria-label="Delete event"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className = "modal-overlay">
          <div className = "modal-content">
            <div className = "modal-header">
              <h3>Add Event for {monthNames[currentDate.getMonth()]} {selectedDate}</h3>
              <button
                type="button"
                className = "modal-close-btn"
                onClick={() => setShowEventModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className = "modal-body">
              <div className = "form-group">
                <label htmlFor="event-type">Type</label>
                <select
                  id="event-type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className = "form-select"
                >
                  <option value="event">Event</option>
                  <option value="task">Task</option>
                </select>
              </div>
              
              <div className = "form-group">
                <label htmlFor="event-title">Title</label>
                <input
                  id="event-title"
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Enter event title..."
                  className = "form-input"
                />
              </div>
              
              <div className = "form-group">
                <label htmlFor="event-time">Time (optional)</label>
                <input
                  id="event-time"
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className = "form-input"
                />
              </div>
            </div>
            
            <div className = "modal-footer">
              <button
                type="button"
                className = "btn-secondary"
                onClick={() => setShowEventModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className = "btn-primary"
                onClick={saveEvent}
                disabled={!eventTitle.trim()}
              >
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;