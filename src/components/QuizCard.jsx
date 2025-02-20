import React, { useState, useEffect } from 'react';
import '../styles/QuestionCard.css';

const QuestionCard = ({ question, userAnswer, onAnswerSubmit, timeExpired }) => {
  const [selectedOption, setSelectedOption] = useState(userAnswer || '');
  const [integerAnswer, setIntegerAnswer] = useState(userAnswer || '');
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Reset selected option when moving to next question
  useEffect(() => {
    setSelectedOption(userAnswer || '');
    setIntegerAnswer(userAnswer || '');
    setShowFeedback(false);
  }, [question, userAnswer]);

  // Show feedback when time expires
  useEffect(() => {
    if (timeExpired) {
      setShowFeedback(true);
    }
  }, [timeExpired]);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    onAnswerSubmit(question.id, optionId);
    setShowFeedback(true);
  };

  const handleIntegerSubmit = (e) => {
    e.preventDefault();
    if (integerAnswer.trim() !== '') {
      onAnswerSubmit(question.id, integerAnswer);
      setShowFeedback(true);
    }
  };

  const handleIntegerChange = (e) => {
    // Only allow numeric input
    const value = e.target.value.replace(/[^0-9]/g, '');
    setIntegerAnswer(value);
  };

  const isCorrect = () => {
    if (question.type === 'multiple-choice') {
      return selectedOption === question.correctAnswer;
    } else if (question.type === 'integer') {
      return parseInt(integerAnswer) === question.correctAnswer;
    }
    return false;
  };

  return (
    <div className={`question-card ${timeExpired ? 'time-expired' : ''}`}>
      <h3 className="question-text">{question.question}</h3>
      
      {question.type === 'multiple-choice' && (
        <div className="options-container">
          {question.options.map(option => (
            <div 
              key={option.id}
              className={`option ${selectedOption === option.id ? 'selected' : ''} ${
                showFeedback ? (
                  option.id === question.correctAnswer ? 'correct' : 
                  selectedOption === option.id && option.id !== question.correctAnswer ? 'incorrect' : ''
                ) : ''
              }`}
              onClick={() => !showFeedback && handleOptionSelect(option.id)}
            >
              <span className="option-id">{option.id}</span>
              <span className="option-text">{option.text}</span>
            </div>
          ))}
        </div>
      )}

      {question.type === 'integer' && (
        <div className="integer-answer-container">
          <form onSubmit={handleIntegerSubmit}>
            <input
              type="text"
              value={integerAnswer}
              onChange={handleIntegerChange}
              placeholder="Enter your numerical answer"
              disabled={showFeedback}
              className={`integer-input ${
                showFeedback ? (isCorrect() ? 'correct-input' : 'incorrect-input') : ''
              }`}
            />
            {!showFeedback && (
              <button type="submit" className="submit-btn">Submit</button>
            )}
          </form>
          
          {showFeedback && (
            <div className="feedback-message">
              {isCorrect() ? (
                <p className="correct-feedback">Correct! The answer is {question.correctAnswer}.</p>
              ) : (
                <p className="incorrect-feedback">
                  {integerAnswer ? `Incorrect. You answered ${integerAnswer}.` : "Time expired."} 
                  The correct answer is {question.correctAnswer}.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {question.type === 'multiple-choice' && showFeedback && (
        <div className="feedback-message">
          {selectedOption ? (
            isCorrect() ? (
              <p className="correct-feedback">Correct! {question.options.find(o => o.id === question.correctAnswer)?.text} is the right answer.</p>
            ) : (
              <p className="incorrect-feedback">
                Incorrect. The correct answer is {question.correctAnswer}: {question.options.find(o => o.id === question.correctAnswer)?.text}.
              </p>
            )
          ) : (
            <p className="incorrect-feedback">Time expired. The correct answer is {question.correctAnswer}: {question.options.find(o => o.id === question.correctAnswer)?.text}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;