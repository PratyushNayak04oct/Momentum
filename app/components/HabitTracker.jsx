'use client';

import React, { useState } from 'react';
import { Plus, Target } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const HabitTracker = () => {
  const { habits, updateHabit, addHabit } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  const toggleHabit = (habitId) => {
    const habit = habits.find(h => h.id === habitId);
    updateHabit(habitId, { 
      completedToday: !habit.completedToday,
      streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1)
    });
  };

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      addHabit({ name: newHabitName.trim() });
      setNewHabitName('');
      setShowAddForm(false);
    }
  };

  return (
    <div className = "habits-container">
      <div className = "habits-header">
        <h2>Daily Habits</h2>
        <button 
          className = "add-habit-btn"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={20} />
          Add Habit
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddHabit} className = "add-habit-form">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Enter habit name"
            autoFocus
          />
          <div className = "form-actions">
            <button type="submit" className = "btn-primary">Add</button>
            <button 
              type="button" 
              className = "btn-secondary"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className = "habits-list">
        {habits.map(habit => (
          <div key={habit.id} className = "habit-item">
            <div className = "habit-info">
              <div className = "habit-name">{habit.name}</div>
              <div className = "habit-streak">
                <Target size={16} />
                {habit.streak} day streak
              </div>
            </div>
            <button
              className = {`habit-toggle ${habit.completedToday ? 'completed' : ''}`}
              onClick={() => toggleHabit(habit.id)}
            >
              {habit.completedToday ? '✓' : '○'}
            </button>
          </div>
        ))}
      </div>

      {habits.length === 0 && !showAddForm && (
        <div className = "empty-state">
          <Target size={48} />
          <h3>No habits yet</h3>
          <p>Start building positive habits by adding your first one.</p>
        </div>
      )}
    </div>
  );
};

export default HabitTracker;