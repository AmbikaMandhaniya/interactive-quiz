import React, { useState } from 'react';
import './Question.css';
import { validateIntegerInput } from '../utils/helpers';

const Question = ({ question, onSubmitAnswer }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
    // Submit the answer immediately for multiple choice
    onSubmitAnswer(question.id, optionId);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError('');
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();

    const validation = validateIntegerInput(inputValue);
    if (!validation.isValid) {
      setError(validation.errorMessage);
      return;
    }

    onSubmitAnswer(question.id, parseInt(inputValue));
  };

  return (
    <div className="question-container">
      <h2 className="question-text">{question.question}</h2>

      {question.type === 'multiple-choice' ? (
        <div className="options-container">
          {question.options.map((option) => (
            <div 
              key={option.id}
              className={`option ${selectedOption === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.id)}
            >
              <div className="option-id">{option.id}</div>
              <div className="option-text">{option.text}</div>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleInputSubmit} className="integer-form">
          <div className="input-container">
            <label htmlFor="integerAnswer">Enter your answer:</label>
            <input
              type="text"
              id="integerAnswer"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a number"
              className={error ? 'error-input' : ''}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          <button type="submit" className="btn btn-primary submit-btn">
            Submit Answer
          </button>
        </form>
      )}
    </div>
  );
};

export default Question;