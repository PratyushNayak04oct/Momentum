'use client';

import { CheckSquare, Timer, Calendar, BarChart3, Target, Smile, User, Code, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: CheckSquare,
      title: 'Smart To-Do List',
      description: 'Organize tasks with priority levels, categories, and drag-and-drop functionality. Mark tasks as urgent, medium, or low priority with color-coded tags.'
    },
    {
      icon: Timer,
      title: 'Pomodoro Timer',
      description: 'Boost productivity with customizable focus sessions. Choose between 25/5 minute intervals or create custom timers with auto-start and audio alerts.'
    },
    {
      icon: Calendar,
      title: 'Calendar View',
      description: 'Track your productivity over time with an intuitive calendar interface. View past performance and productivity scores for any date.'
    },
    {
      icon: Target,
      title: 'Habit Tracker',
      description: 'Build positive habits with daily tracking and streak counters. Monitor your consistency and celebrate your progress.'
    },
    {
      icon: Smile,
      title: 'Mood Journal',
      description: 'Track your emotional well-being with emoji-based mood logging and optional notes. Visualize mood trends over time.'
    },
    {
      icon: BarChart3,
      title: 'Daily Summary',
      description: 'Get comprehensive insights into your daily productivity with task completion rates, focus time, and mood analytics.'
    }
  ];

  return (
    <div className = "about-container">
      <div className = "about-header">
        <div className = "about-hero">
          <div className = "hero-icon">
            <div className = "logo-icon" aria-hidden="true">◆</div>
          </div>
          <h1>Momentum</h1>
          <p className = "hero-subtitle">Your Personal Productivity Dashboard</p>
        </div>
      </div>

      <div className = "about-content">
        <section className = "about-section">
          <h2>About Momentum</h2>
          <p className = "about-description">
            Momentum is a comprehensive productivity dashboard designed to help you plan, track, and reflect on your daily activities. 
            Built with modern web technologies, it combines essential productivity tools in one seamless interface to help you build 
            better habits, manage tasks effectively, and maintain a healthy work-life balance.
          </p>
        </section>

        <section className = "features-section">
          <h2>Key Features</h2>
          <div className = "features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={`feature-${index}`} className = "feature-card">
                  <div className = "feature-icon" aria-hidden="true">
                    <Icon size={24} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className = "developer-section">
          <div className = "developer-card">
            <div className = "developer-info">
              <div className = "developer-avatar" aria-hidden="true">
                <User size={32} />
              </div>
              <div className = "developer-details">
                <h3>Pratyush Nayak</h3>
                <p className = "developer-title">Full Stack Developer</p>
                <p className = "developer-description">
                  Passionate about creating intuitive and powerful web applications that help people be more productive. 
                  With expertise in modern JavaScript frameworks and a keen eye for user experience design, 
                  I strive to build tools that make a real difference in people&apos;s daily lives.
                </p>
                <div className = "developer-skills">
                  <span className = "skill-tag">
                    <Code size={14} aria-hidden="true" />
                    React
                  </span>
                  <span className = "skill-tag">
                    <Code size={14} aria-hidden="true" />
                    JavaScript
                  </span>
                  <span className = "skill-tag">
                    <Heart size={14} aria-hidden="true" />
                    UX Design
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className = "mission-section">
          <h2>Our Mission</h2>
          <p>
            To empower individuals with the tools they need to achieve their goals, build positive habits, 
            and maintain a balanced lifestyle. Momentum is more than just a productivity app – it&apos;s your 
            personal companion on the journey to becoming the best version of yourself.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;