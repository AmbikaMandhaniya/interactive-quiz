import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  
  return (
    <div className="quiz-progress">
      <div className="progress-text">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;