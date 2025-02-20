import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = ({ seconds, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  // Calculate percentage for the progress bar
  const percentage = (timeLeft / seconds) * 100;

  // Determine the color based on remaining time
  let timerColor = '#2ecc71'; // Green
  if (timeLeft <= seconds * 0.25) {
    timerColor = '#e74c3c'; // Red
  } else if (timeLeft <= seconds * 0.5) {
    timerColor = '#f39c12'; // Orange
  }

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          if (onTimeout) onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout]);

  return (
    <div className="timer-container">
      <div className="timer-display">
        <div className="timer-icon">⏱️</div>
        <div className="timer-text">{timeLeft} seconds</div>
      </div>
      <div className="timer-progress-container">
        <div 
          className="timer-progress-bar"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: timerColor
          }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;