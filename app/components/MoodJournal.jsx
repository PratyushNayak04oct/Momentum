'use client';

import React, { useState } from 'react';
import { Calendar, Trash2, Edit3, TrendingUp } from 'lucide-react';

const MoodJournal = () => {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  const moodOptions = [
    { emoji: '😄', label: 'Very Happy', value: 5, color: '#10b981' },
    { emoji: '😊', label: 'Happy', value: 4, color: '#3b82f6' },
    { emoji: '😐', label: 'Neutral', value: 3, color: '#6b7280' },
    { emoji: '😔', label: 'Sad', value: 2, color: '#f59e0b' },
    { emoji: '😢', label: 'Very Sad', value: 1, color: '#ef4444' }
  ];

  const addMood = (moodData) => {
    const newMood = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      rating: moodData.rating,
      mood: moodData.mood,
      note: moodData.note || ''
    };
    
    setMoods(prev => [newMood, ...prev]);
  };

  const updateMood = (id, updatedData) => {
    setMoods(prev => prev.map(mood => 
      mood.id === id 
        ? { ...mood, ...updatedData, timestamp: mood.timestamp }
        : mood
    ));
  };

  const deleteMood = (id) => {
    setMoods(prev => prev.filter(mood => mood.id !== id));
  };

  const getMoodFromRating = (rating) => {
    return moodOptions.find(option => option.value === rating) || moodOptions[2];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMood) {
      if (editingEntry) {
        updateMood(editingEntry.id, {
          rating: selectedMood.value,
          mood: selectedMood,
          note: note.trim()
        });
        setEditingEntry(null);
      } else {
        addMood({
          rating: selectedMood.value,
          mood: selectedMood,
          note: note.trim()
        });
      }
      setSelectedMood(null);
      setNote('');
    }
  };

  const startEditing = (mood) => {
    setEditingEntry(mood);
    setSelectedMood(mood.mood || getMoodFromRating(mood.rating));
    setNote(mood.note || '');
  };

  const cancelEditing = () => {
    setEditingEntry(null);
    setSelectedMood(null);
    setNote('');
  };

  const todaysMoods = moods.filter(mood => {
    const today = new Date().toDateString();
    const moodDate = new Date(mood.timestamp).toDateString();
    return today === moodDate;
  });

  const getAverageMood = () => {
    if (todaysMoods.length === 0) return null;
    const sum = todaysMoods.reduce((acc, mood) => acc + mood.rating, 0);
    return (sum / todaysMoods.length).toFixed(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const moodDate = date.toDateString();
    
    if (moodDate === today) return 'Today';
    if (moodDate === yesterday) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const groupMoodsByDate = () => {
    const groups = {};
    moods.forEach(mood => {
      const date = new Date(mood.timestamp).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(mood);
    });
    return groups;
  };

  return (
    <div className = "mood-container">
      <div className = "mood-entry">
        <h2>{editingEntry ? 'Edit Mood Entry' : 'How are you feeling today?'}</h2>
        
        {todaysMoods.length > 0 && !editingEntry && (
          <div className = "mood-stats">
            <div className = "stat-item">
              <TrendingUp size={16} />
              <span>Today's Average: {getAverageMood()}/5.0</span>
            </div>
            <div className = "stat-item">
              <Calendar size={16} />
              <span>{todaysMoods.length} entries today</span>
            </div>
          </div>
        )}
        
        <div className = "mood-form">
          <div className = "mood-options">
            {moodOptions.map(option => (
              <button
                key={option.value}
                type="button"
                className = {`mood-option ${selectedMood?.value === option.value ? 'selected' : ''}`}
                onClick={() => setSelectedMood(option)}
                style={{ '--mood-color': option.color }}
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
          
          <div className = "form-actions">
            {editingEntry && (
              <button 
                type="button" 
                className = "btn-secondary"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            )}
            <button 
              type="button" 
              className = "save-mood-btn"
              disabled={!selectedMood}
              onClick={handleSubmit}
            >
              {editingEntry ? 'Update Mood' : 'Save Mood'}
            </button>
          </div>
        </div>
      </div>

      {moods.length > 0 && (
        <div className = "mood-history">
          <h3>Mood History</h3>
          <div className = "mood-timeline">
            {Object.entries(groupMoodsByDate())
              .sort(([a], [b]) => new Date(b) - new Date(a))
              .map(([date, dayMoods]) => (
                <div key={date} className = "mood-day-group">
                  <div className = "day-header">
                    <h4>{formatDate(date)}</h4>
                    <span className = "day-count">{dayMoods.length} entries</span>
                  </div>
                  <div className = "mood-entries">
                    {dayMoods
                      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                      .map(mood => {
                        const moodData = mood.mood || getMoodFromRating(mood.rating);
                        return (
                          <div key={mood.id} className = "mood-entry-item">
                            <div className = "mood-info">
                              <span className = "mood-time">
                                {new Date(mood.timestamp).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                              <span 
                                className = "mood-emoji"
                                style={{ color: moodData.color }}
                              >
                                {moodData.emoji}
                              </span>
                              <span className = "mood-text">{moodData.label}</span>
                            </div>
                            {mood.note && (
                              <p className = "mood-note">{mood.note}</p>
                            )}
                            <div className = "mood-actions">
                              <button
                                type="button"
                                className = "edit-btn"
                                onClick={() => startEditing(mood)}
                                title="Edit entry"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                type="button"
                                className = "delete-btn"
                                onClick={() => deleteMood(mood.id)}
                                title="Delete entry"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {moods.length === 0 && (
        <div className = "empty-state">
          <div className = "empty-state-icon">📝</div>
          <h3>Start Your Mood Journey</h3>
          <p>Track your daily emotions and discover patterns in your wellbeing.</p>
        </div>
      )}
    </div>
  );
};

export default MoodJournal;