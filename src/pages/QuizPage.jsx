import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import Question from '../components/Question';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import Results from '../components/Results';
import './QuizPage.css';

const QuizPage = () => {
  const { 
    quizData, 
    currentQuestion, 
    quizStarted, 
    quizFinished,
    score,
    timeLeft,
    startQuiz,
    submitAnswer,
  } = useQuiz();
  
  const navigate = useNavigate();
  
  // Redirect to home if quiz hasn't started and isn't finished
  useEffect(() => {
    if (!quizStarted && !quizFinished) {
      navigate('/');
    }
  }, [quizStarted, quizFinished, navigate]);
  
  if (quizFinished) {
    return (
      <Results 
        score={score} 
        totalQuestions={quizData.questions.length}
        onRetry={startQuiz}
      />
    );
  }
  
  const currentQuestionData = quizData.questions[currentQuestion];
  
  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1>{quizData.title}</h1>
      </div>
      
      <div className="quiz-container">
        <Timer 
          seconds={timeLeft}
        />
        
        <ProgressBar
          currentQuestion={currentQuestion}
          totalQuestions={quizData.questions.length}
        />
        
        <div className="question-wrapper">
          {currentQuestionData && (
            <Question
              question={currentQuestionData}
              onSubmitAnswer={submitAnswer}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;