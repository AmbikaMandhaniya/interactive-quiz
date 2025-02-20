import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Results.css';

const Results = ({ score, totalQuestions, onRetry }) => {
  const navigate = useNavigate();
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Determine result status
  let resultStatus = 'excellent';
  let resultIcon = '🏆';
  let resultColor = '#2ecc71';
  
  if (percentage < 40) {
    resultStatus = 'needs improvement';
    resultIcon = '📚';
    resultColor = '#e74c3c';
  } else if (percentage < 70) {
    resultStatus = 'good';
    resultIcon = '👍';
    resultColor = '#f39c12';
  }
  
  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Quiz Completed!</h2>
        <div className="result-icon" style={{ backgroundColor: resultColor }}>
          {resultIcon}
        </div>
      </div>
      
      <div className="score-display">
        <div className="score-circle" style={{ borderColor: resultColor }}>
          <div className="score-text">{score}</div>
          <div className="score-total">/ {totalQuestions}</div>
        </div>
        <div className="score-percentage" style={{ color: resultColor }}>
          {percentage}%
        </div>
      </div>
      
      <div className="result-message">
        <h3>Your performance is <span style={{ color: resultColor }}>{resultStatus}</span></h3>
        <p>
          {resultStatus === 'excellent' && 'Great job! You have a strong understanding of the material.'}
          {resultStatus === 'good' && 'Good work! You\'re on the right track, but there\'s room for improvement.'}
          {resultStatus === 'needs improvement' && 'Keep studying! You\'ll get better with practice.'}
        </p>
      </div>
      
      <div className="result-actions">
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/history')}>
          View History
        </button>
      </div>
    </div>
  );
};

export default Results;