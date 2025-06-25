'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [moods, setMoods] = useState([]);
  const [pomodoroSessions, setPomodoroSessions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize with sample data
  useEffect(() => {
    const sampleTasks = [
      {
        id: '1',
        title: 'Morning workout',
        category: 'Personal',
        priority: 'Medium',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Prepare presentation for team meeting',
        category: 'Work',
        priority: 'High',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Review project proposal',
        category: 'Work',
        priority: 'Medium',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Grocery shopping',
        category: 'Personal',
        priority: 'Low',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Follow up with clients',
        category: 'Work',
        priority: 'High',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '6',
        title: 'Read a book',
        category: 'Personal',
        priority: 'Low',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '7',
        title: 'Plan next week\'s tasks',
        category: 'Work',
        priority: 'Medium',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '8',
        title: 'Call family',
        category: 'Personal',
        priority: 'Medium',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '9',
        title: 'Respond to emails',
        category: 'Work',
        priority: 'Medium',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '10',
        title: 'Meditate',
        category: 'Personal',
        priority: 'Low',
        completed: false,
        createdAt: new Date().toISOString()
      }
    ];

    const sampleHabits = [
      {
        id: '1',
        name: 'Exercise',
        streak: 5,
        completedToday: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Meditation',
        streak: 3,
        completedToday: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Read for 30 minutes',
        streak: 7,
        completedToday: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Drink 8 glasses of water',
        streak: 2,
        completedToday: false,
        createdAt: new Date().toISOString()
      }
    ];

    const sampleMoods = [
      {
        id: '1',
        rating: 4,
        mood: { emoji: '😊', label: 'Happy', value: 4 },
        note: 'Great day at work, feeling productive',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        rating: 3,
        mood: { emoji: '😐', label: 'Neutral', value: 3 },
        note: 'Normal day, nothing special',
        timestamp: new Date(Date.now() - 86400000).toISOString() // Yesterday
      }
    ];

    setTasks(sampleTasks);
    setHabits(sampleHabits);
    setMoods(sampleMoods);
  }, []);

  // Task management functions
  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      ...task,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Habit management functions
  const addHabit = (habit) => {
    const newHabit = {
      id: Date.now().toString(),
      ...habit,
      streak: 0,
      completedToday: false,
      createdAt: new Date().toISOString()
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (habitId, updates) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId ? { ...habit, ...updates } : habit
    ));
  };

  const deleteHabit = (habitId) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  const toggleHabitComplete = (habitId) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newCompletedToday = !habit.completedToday;
        return {
          ...habit,
          completedToday: newCompletedToday,
          streak: newCompletedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      }
      return habit;
    }));
  };

  // Mood management functions
  const addMood = (mood) => {
    const newMood = {
      id: Date.now().toString(),
      ...mood,
      timestamp: new Date().toISOString()
    };
    setMoods(prev => [...prev, newMood]);
  };

  const updateMood = (moodId, updates) => {
    setMoods(prev => prev.map(mood => 
      mood.id === moodId ? { ...mood, ...updates } : mood
    ));
  };

  const deleteMood = (moodId) => {
    setMoods(prev => prev.filter(mood => mood.id !== moodId));
  };

  // Pomodoro session management
  const addPomodoroSession = (session) => {
    setPomodoroSessions(prev => [...prev, {
      id: Date.now().toString(),
      ...session,
      timestamp: new Date().toISOString()
    }]);
  };

  const clearPomodoroSessions = () => {
    setPomodoroSessions([]);
  };

  // Analytics and statistics
  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, pending, completionRate };
  };

  const getHabitStats = () => {
    const totalHabits = habits.length;
    const completedToday = habits.filter(habit => habit.completedToday).length;
    const averageStreak = habits.length > 0 
      ? Math.round(habits.reduce((sum, habit) => sum + habit.streak, 0) / habits.length)
      : 0;
    
    return { totalHabits, completedToday, averageStreak };
  };

  const contextValue = {
    // State
    tasks,
    habits,
    moods,
    pomodoroSessions,
    currentUser,
    
    // Task functions
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    
    // Habit functions
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitComplete,
    
    // Mood functions
    addMood,
    updateMood,
    deleteMood,
    
    // Pomodoro functions
    addPomodoroSession,
    clearPomodoroSessions,
    
    // User functions
    setCurrentUser,
    
    // Analytics functions
    getTaskStats,
    getHabitStats
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};