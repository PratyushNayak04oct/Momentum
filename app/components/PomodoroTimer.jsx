'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Settings } from 'lucide-react';

// Custom hook to replace useApp context
const usePomodoroSessions = () => {
  const [sessions, setSessions] = useState([]);

  const addPomodoroSession = (session) => {
    setSessions(prev => [...prev, { ...session, timestamp: new Date() }]);
  };

  return { sessions, addPomodoroSession };
};

const PomodoroTimer = () => {
  const { addPomodoroSession } = usePomodoroSessions();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [settings, setSettings] = useState({
    workTime: 25,
    breakTime: 5,
    rounds: 4,
    autoStart: false,
    alerts: false
  });
  const [tempSettings, setTempSettings] = useState({
    workTime: 25,
    breakTime: 5,
    rounds: 4,
    autoStart: false,
    alerts: false
  });
  const [currentRound, setCurrentRound] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed
      if (settings.alerts) {
        // Play notification sound
        try {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjuO2/LLc3gL');
          audio.play().catch(() => {
            console.log('Audio playback failed');
          });
        } catch (error) {
          console.log('Audio creation failed');
        }
      }
      
      // Add session to history
      addPomodoroSession({
        type: isBreak ? 'break' : 'work',
        duration: isBreak ? settings.breakTime : settings.workTime,
        completed: true
      });

      // Switch between work and break
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(settings.breakTime * 60);
        if (settings.autoStart) {
          setIsRunning(true);
        } else {
          setIsRunning(false);
        }
      } else {
        setIsBreak(false);
        setCurrentRound(prev => prev + 1);
        setTimeLeft(settings.workTime * 60);
        if (settings.autoStart) {
          setIsRunning(true);
        } else {
          setIsRunning(false);
        }
      }
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, isBreak, settings, addPomodoroSession]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setCurrentRound(1);
    setTimeLeft(settings.workTime * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleWorkTimeChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setTempSettings({ ...tempSettings, workTime: value });
  };

  const handleBreakTimeChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setTempSettings({ ...tempSettings, breakTime: value });
  };

  const handleRoundsChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setTempSettings({ ...tempSettings, rounds: value });
  };

  const handleAutoStartChange = (e) => {
    setTempSettings({ ...tempSettings, autoStart: e.target.checked });
  };

  const handleAlertsChange = (e) => {
    setTempSettings({ ...tempSettings, alerts: e.target.checked });
  };

  const saveSettings = () => {
    setSettings(tempSettings);
    setTimeLeft(tempSettings.workTime * 60);
    setIsRunning(false);
    setIsBreak(false);
    setCurrentRound(1);
  };

  const handlePresetClick = (isCustom) => {
    setShowSettings(isCustom);
    if (!isCustom) {
      // Reset to default 25/5 settings
      const defaultSettings = {
        workTime: 25,
        breakTime: 5,
        rounds: 4,
        autoStart: false,
        alerts: false
      };
      setSettings(defaultSettings);
      setTempSettings(defaultSettings);
      setTimeLeft(25 * 60);
      setIsRunning(false);
      setIsBreak(false);
      setCurrentRound(1);
    } else {
      // Set temp settings to current settings when opening custom mode
      setTempSettings(settings);
    }
  };

  return (
    <div className = "pomodoro-container">
      <div className = "timer-settings">
        <button 
          className={`preset-btn ${!showSettings ? 'active' : ''}`}
          onClick={() => handlePresetClick(false)}
        >
          25/5
        </button>
        <button 
          className={`preset-btn ${showSettings ? 'active' : ''}`}
          onClick={() => handlePresetClick(true)}
        >
          Custom
        </button>
      </div>

      <div className = "timer-display">
        <div className = "time-numbers">
          <div className = "time-unit">
            <span className = "time-value">{minutes.toString().padStart(2, '0')}</span>
            <span className = "time-label">Minutes</span>
          </div>
          <div className = "time-separator">:</div>
          <div className = "time-unit">
            <span className = "time-value">{seconds.toString().padStart(2, '0')}</span>
            <span className = "time-label">Seconds</span>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className = "timer-settings-panel">
          <div className = "settings-grid">
            <div className = "setting-group">
              <label htmlFor="work-time">Work</label>
              <input
                id="work-time"
                type="number"
                value={tempSettings.workTime}
                onChange={handleWorkTimeChange}
                min="1"
                max="60"
              />
            </div>
            
            <div className = "setting-group">
              <label htmlFor="break-time">Break</label>
              <input
                id="break-time"
                type="number"
                value={tempSettings.breakTime}
                onChange={handleBreakTimeChange}
                min="1"
                max="30"
              />
            </div>
            
            <div className = "setting-group">
              <label htmlFor="rounds">Rounds</label>
              <input
                id="rounds"
                type="number"
                value={tempSettings.rounds}
                onChange={handleRoundsChange}
                min="1"
                max="10"
              />
            </div>
          </div>
          
          <div className = "setting-checkboxes">
            <label className = "checkbox-label">
              <input
                type="checkbox"
                checked={tempSettings.autoStart}
                onChange={handleAutoStartChange}
              />
              <span>Auto-start</span>
            </label>
            
            <label className = "checkbox-label">
              <input
                type="checkbox"
                checked={tempSettings.alerts}
                onChange={handleAlertsChange}
              />
              <span>Alerts</span>
            </label>
          </div>
          
          <button className = "save-btn" onClick={saveSettings}>
            Save Settings
          </button>
        </div>
      )}

      <div className = "timer-controls">
        <button className = "start-btn" onClick={toggleTimer}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className = "reset-btn" onClick={resetTimer}>
          Reset
        </button>
      </div>

      <div className = "session-info">
        <div className = "session-type">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </div>
        <div className = "round-counter">
          Round {currentRound} of {settings.rounds}
        </div>
      </div>
      </div>
  );
};

export default PomodoroTimer;