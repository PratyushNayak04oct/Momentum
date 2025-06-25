'use client';

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';

const MoodJournal = () => {
  const { addMood, moods } = useApp();
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');

  const moodOptions = [
    { emoji: '😄', label: 'Very Happy', value: 5 },
    { emoji: '😊', label: 'Happy', value: 4 },
    { emoji: '😐', label: 'Neutral', value: 3 },
    { emoji: '😔', label: 'Sad', value: 2 },
    { emoji: '😢', label: 'Very Sad', value: 1 }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMood) {
      addMood({
        mood: selectedMood,
        note: note.trim()
      });
      setSelectedMood(null);
      setNote('');
    }
  };

  const todaysMoods = moods.filter(mood => {
    const today = new Date().toDateString();
    const moodDate = new Date(mood.timestamp).toDateString();
    return today === moodDate;
  });

  return (
    <div className = "mood-container">
      <div className = "mood-entry">
        <h2>How are you feeling today?</h2>
        
        <form onSubmit={handleSubmit} className = "mood-form">
          <div className = "mood-options">
            {moodOptions.map(option => (
              <button
                key={option.value}
                type="button"
                className={`mood-option ${selectedMood?.value === option.value ? 'selected' : ''}`}
                onClick={() => setSelectedMood(option)}
              >
                <span className = "mood-emoji">{option.emoji}</span>
                <span className = "mood-label">{option.label}</span>
              </button>
            ))}
          </div>
          
          <div className = "note-section">
            <label>Optional note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
            />
          </div>
          
          <button 
            type="submit" 
            className = "save-mood-btn"
            disabled={!selectedMood}
          >
            Save Mood
          </button>
        </form>
      </div>

      {todaysMoods.length > 0 && (
        <div className = "mood-history">
          <h3>Today's Mood Entries</h3>
          <div className = "mood-entries">
            {todaysMoods.map(mood => (
              <div key={mood.id} className = "mood-entry-item">
                <span className = "mood-time">
                  {new Date(mood.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className = "mood-emoji">{mood.mood.emoji}</span>
                <span className = "mood-text">{mood.mood.label}</span>
                {mood.note && <p className = "mood-note">{mood.note}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodJournal;