import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import './Home.css';

const Home = () => {
  const { quizData, startQuiz, quizHistory } = useQuiz();
  const navigate = useNavigate();
  
  const handleStartQuiz = () => {
    startQuiz();
    navigate('/quiz');
  };

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome to QuizMaster</h1>
        <p>Test your knowledge with our interactive quizzes</p>
        
        <div className="quiz-card">
          <div className="quiz-info">
            <h2>{quizData.title}</h2>
            <div className="quiz-meta">
              <div className="meta-item">
                <span className="meta-icon">❓</span>
                <span>{quizData.questions.length} Questions</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">⏱️</span>
                <span>{quizData.timePerQuestion} sec per question</span>
              </div>
              {quizHistory.length > 0 && (
                <div className="meta-item">
                  <span className="meta-icon">🔄</span>
                  <span>{quizHistory.length} Previous Attempts</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="quiz-actions">
            <button 
              className="btn btn-primary start-btn"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>
            {quizHistory.length > 0 && (
              <button 
                className="btn btn-secondary history-btn"
                onClick={() => navigate('/history')}
              >
                View History
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="home-instructions">
        <h2>Instructions</h2>
        <div className="instructions-card">
          <ol>
            <li>For multiple-choice questions, select the one best answer (A, B, C, or D).</li>
            <li>For integer-type questions, enter your numerical answer clearly.</li>
            <li>No calculators unless specified.</li>
            <li>You have 30 seconds per question to complete this quiz.</li>
            <li>The quiz consists of 5 multiple-choice and 5 integer questions.</li>
            <li>Your results will be saved for future reference.</li>
            <li>You can attempt the quiz multiple times to improve your score.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Home;