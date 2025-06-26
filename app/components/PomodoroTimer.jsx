'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Settings, Volume2, VolumeX } from 'lucide-react';

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
    alerts: true
  });
  const [tempSettings, setTempSettings] = useState({
    workTime: 25,
    breakTime: 5,
    rounds: 4,
    autoStart: false,
    alerts: true
  });
  const [currentRound, setCurrentRound] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  // Audio-related states
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [showAudioControls, setShowAudioControls] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);
  const progressInterval = useRef(null);

  // Initialize audio with better error handling
  useEffect(() => {
    const audioUrl = 'https://wef9gsahj69gkmq3.public.blob.vercel-storage.com/Pomodoro/Pomodoo%20end%20sound-A87lPjkF3ptBGomuMmpvqZmirC4gDx.mp3';
    audioRef.current = new Audio();
    audioRef.current.crossOrigin = "anonymous";
    audioRef.current.preload = "auto";
    
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
      setAudioLoaded(true);
      setAudioError(null);
      console.log('Audio loaded successfully, duration:', audio.duration);
    };
    
    const handleCanPlayThrough = () => {
      console.log('Audio can play through');
      setAudioLoaded(true);
    };
    
    const handleEnded = () => {
      setIsAudioPlaying(false);
      setAudioProgress(0);
      setShowAudioControls(false);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };

    const handleError = (e) => {
      console.error('Audio loading error:', e);
      console.error('Audio error details:', {
        error: audio.error,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
      setAudioError(`Audio failed to load: ${audio.error?.message || 'Unknown error'}`);
      setAudioLoaded(false);
    };

    const handleLoadStart = () => {
      console.log('Audio load started');
    };

    const handleProgress = () => {
      console.log('Audio loading progress');
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('progress', handleProgress);

    // Set the source after adding event listeners
    audio.src = audioUrl;

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('progress', handleProgress);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Audio progress tracking
  useEffect(() => {
    if (isAudioPlaying && audioRef.current) {
      progressInterval.current = setInterval(() => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        if (duration > 0) {
          setAudioProgress((currentTime / duration) * 100);
        }
      }, 100);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isAudioPlaying]);

  const playNotificationSound = async () => {
    console.log('Attempting to play notification sound', {
      audioLoaded: audioLoaded,
      audioError: audioError
    });

    if (audioRef.current && audioLoaded) {
      try {
        audioRef.current.currentTime = 0;
        setAudioProgress(0);
        setShowAudioControls(true);
        
        // Try to play the audio
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsAudioPlaying(true);
          console.log('Audio playback started successfully');
        }
      } catch (error) {
        console.error('Audio playback failed:', error);
        setAudioError(`Playback failed: ${error.message}`);
        setShowAudioControls(false);
        
        // If autoplay failed, show controls anyway so user can manually play
        if (error.name === 'NotAllowedError') {
          setShowAudioControls(true);
          setAudioError('Click play to hear notification (autoplay blocked)');
        }
      }
    } else {
      console.log('Audio not played because:', {
        hasAudio: !!audioRef.current,
        audioLoaded: audioLoaded,
        audioError: audioError
      });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const resumeAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsAudioPlaying(true);
      } catch (error) {
        console.error('Audio resume failed:', error);
        setAudioError(`Resume failed: ${error.message}`);
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudioPlaying(false);
      setAudioProgress(0);
      setShowAudioControls(false);
    }
  };

  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed - play notification sound automatically
      console.log('Timer completed, playing notification');
      playNotificationSound();
      
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
    // Stop any playing audio when resetting
    stopAudio();
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
    // Stop any playing audio when saving settings
    stopAudio();
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
        alerts: true
      };
      setSettings(defaultSettings);
      setTempSettings(defaultSettings);
      setTimeLeft(25 * 60);
      setIsRunning(false);
      setIsBreak(false);
      setCurrentRound(1);
      // Stop any playing audio when switching presets
      stopAudio();
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

      {/* Audio Controls Panel */}
      {showAudioControls && (
        <div className = "audio-controls-panel">
          <div className = "audio-progress-container">
            <div className = "circular-progress">
              <svg className = "progress-ring" width="60" height="60">
                <circle
                  className = "progress-ring-circle-bg"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  r="26"
                  cx="30"
                  cy="30"
                  style={{ color: '#e5e7eb' }}
                />
                <circle
                  className = "progress-ring-circle"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  r="26"
                  cx="30"
                  cy="30"
                  style={{
                    color: '#3b82f6',
                    strokeDasharray: `${2 * Math.PI * 26}`,
                    strokeDashoffset: `${2 * Math.PI * 26 * (1 - audioProgress / 100)}`,
                  }}
                />
              </svg>
              <div className = "progress-icon">
                <Volume2 size={20} />
              </div>
            </div>
          </div>
          
          <div className = "audio-controls">
            <button 
              className = "audio-btn"
              onClick={isAudioPlaying ? pauseAudio : resumeAudio}
              title={isAudioPlaying ? "Pause" : "Resume"}
            >
              {isAudioPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button 
              className = "audio-btn stop-btn"
              onClick={stopAudio}
              title="Stop"
            >
              <Square size={16} />
            </button>
          </div>
          
          <div className = "audio-info">
            <span className = "audio-text">
              {audioError || "Notification Playing"}
            </span>
          </div>
        </div>
      )}

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