import React from 'react';
import { useQuiz } from '../contexts/QuizContext';
import AttemptHistory from '../components/AttemptHistory';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';

const HistoryPage = () => {
  const { quizHistory, startQuiz } = useQuiz();
  const navigate = useNavigate();
  
  const handleStartNewQuiz = () => {
    startQuiz();
    navigate('/quiz');
  };
  
  return (
    <div className="history-page">
      <div className="history-header">
        <h1>Quiz History</h1>
        <p>Track your progress and improvements over time</p>
      </div>
      
      <div className="history-content">
        <AttemptHistory history={quizHistory} />
        
        <div className="history-actions">
          <button 
            className="btn btn-primary"
            onClick={handleStartNewQuiz}
          >
            Start New Quiz
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;