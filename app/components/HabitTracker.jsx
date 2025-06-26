'use client';

import { useState } from 'react';
import { Plus, Flame, Trash2, Check } from 'lucide-react';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  const addHabit = () => {
    if (!newHabitName.trim()) return;
    
    const newHabit = {
      id: Date.now().toString(),
      name: newHabitName.trim(),
      streak: 0,
      completedToday: false,
      lastCompleted: null,
      createdAt: new Date().toISOString()
    };
    
    setHabits(prev => [...prev, newHabit]);
    setNewHabitName('');
    setShowAddForm(false);
  };

  const deleteHabit = (habitId) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  const toggleHabit = (habitId) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const today = new Date().toDateString();
        const lastCompletedDate = habit.lastCompleted ? new Date(habit.lastCompleted).toDateString() : null;
        
        if (habit.completedToday) {
          // Uncompleting for today
          return {
            ...habit,
            completedToday: false,
            streak: Math.max(0, habit.streak - 1),
            lastCompleted: null
          };
        } else {
          // Completing for today
          let newStreak = habit.streak;
          
          if (lastCompletedDate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastCompletedDate === yesterday.toDateString()) {
              newStreak += 1;
            } else {
              newStreak = 1;
            }
          } else {
            newStreak = 1;
          }
          
          return {
            ...habit,
            completedToday: true,
            streak: newStreak,
            lastCompleted: new Date().toISOString()
          };
        }
      }
      return habit;
    }));
  };

  const handleAddHabit = () => {
    addHabit();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addHabit();
    }
  };

  return (
    <div className = "habits-container">
      <div className = "habits-header">
        <h2>Daily Habits</h2>
        <button
          type="button"
          className = "add-habit-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={16} />
          <span className = "add-habit-text">Add Habit</span>
        </button>
      </div>

      {showAddForm && (
        <div className = "add-habit-form">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter habit name..."
            autoFocus
          />
          <div className = "form-actions">
            <button
              type="button"
              className = "btn-secondary"
              onClick={() => {
                setShowAddForm(false);
                setNewHabitName('');
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className = "btn-primary"
              onClick={handleAddHabit}
              disabled={!newHabitName.trim()}
            >
              Add Habit
            </button>
          </div>
        </div>
      )}

      <div className = "habits-list">
        {habits.length === 0 ? (
          <div className = "empty-state">
            <div className = "empty-state-icon">🎯</div>
            <h3>No habits yet</h3>
            <p>Add your first habit to start building better routines!</p>
          </div>
        ) : (
          habits.map(habit => (
            <div key={habit.id} className = "habit-item">
              <div className = "habit-info">
                <div className = "habit-name">{habit.name}</div>
                <div className = "habit-streak">
                  <Flame size={14} />
                  <span>{habit.streak} day streak</span>
                </div>
              </div>
              <div className = "habit-actions">
                <button
                  type="button"
                  className = {`habit-toggle ${habit.completedToday ? 'completed' : ''}`}
                  onClick={() => toggleHabit(habit.id)}
                  title={habit.completedToday ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {habit.completedToday ? <Check size={16} /> : ''}
                </button>
                <button
                  type="button"
                  className = "delete-habit-btn"
                  onClick={() => deleteHabit(habit.id)}
                  title="Delete habit"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HabitTracker;