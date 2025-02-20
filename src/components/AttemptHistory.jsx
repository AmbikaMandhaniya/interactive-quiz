import React from 'react';
import './AttemptHistory.css';
import { formatDate } from '../utils/helpers';

const AttemptHistory = ({ history }) => {
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="history-container">
      <h2>Your Quiz Attempts</h2>

      {sortedHistory.length === 0 ? (
        <div className="empty-history">
          <p>You haven't attempted any quizzes yet.</p>
        </div>
      ) : (
        <div className="history-list">
          {sortedHistory.map((attempt, index) => {
            const formattedDate = formatDate(attempt.date);
            const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);

            let statusColor = '#2ecc71'; // Green for good scores
            if (percentage < 40) {
              statusColor = '#e74c3c'; // Red for poor scores
            } else if (percentage < 70) {
              statusColor = '#f39c12'; // Orange for average scores
            }

            return (
              <div key={index} className="history-item">
                <div className="attempt-date">
                  <span className="date-label">Attempt #{history.length - index}</span>
                  <span className="date-value">{formattedDate}</span>
                </div>

                <div className="attempt-score">
                  <div className="score-bar-container">
                    <div 
                      className="score-bar" 
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: statusColor 
                      }}
                    ></div>
                  </div>
                  <div className="score-text">
                    <span style={{ color: statusColor }}>{attempt.score} / {attempt.totalQuestions}</span>
                    <span className="score-percentage">({percentage}%)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AttemptHistory;