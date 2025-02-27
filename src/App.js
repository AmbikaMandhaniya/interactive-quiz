import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import HistoryPage from './pages/HistoryPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// src/data/quizData.js
export const quizData = {
  title: "General Knowledge Quiz",
  timePerQuestion: 30, // in seconds
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "Which planet is closest to the Sun?",
      options: [
        { id: 'A', text: 'Venus' },
        { id: 'B', text: 'Mercury' },
        { id: 'C', text: 'Earth' },
        { id: 'D', text: 'Mars' }
      ],
      correctAnswer: 'B'
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
      options: [
        { id: 'A', text: 'Stack' },
        { id: 'B', text: 'Queue' },
        { id: 'C', text: 'Tree' },
        { id: 'D', text: 'Graph' }
      ],
      correctAnswer: 'B'
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "Which of the following is primarily used for structuring web pages?",
      options: [
        { id: 'A', text: 'Python' },
        { id: 'B', text: 'Java' },
        { id: 'C', text: 'HTML' },
        { id: 'D', text: 'C++' }
      ],
      correctAnswer: 'C'
    },
    {
      id: 4,
      type: "multiple-choice",
      question: "Which chemical symbol stands for Gold?",
      options: [
        { id: 'A', text: 'Au' },
        { id: 'B', text: 'Gd' },
        { id: 'C', text: 'Ag' },
        { id: 'D', text: 'Pt' }
      ],
      correctAnswer: 'A'
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "Which of these processes is not typically involved in refining petroleum?",
      options: [
        { id: 'A', text: 'Fractional distillation' },
        { id: 'B', text: 'Cracking' },
        { id: 'C', text: 'Polymerization' },
        { id: 'D', text: 'Filtration' }
      ],
      correctAnswer: 'D'
    },
    {
      id: 6,
      type: "integer",
      question: "What is the value of 12 + 28?",
      correctAnswer: 40
    },
    {
      id: 7,
      type: "integer",
      question: "How many states are there in the United States?",
      correctAnswer: 50
    },
    {
      id: 8,
      type: "integer",
      question: "In which year was the Declaration of Independence signed?",
      correctAnswer: 1776
    },
    {
      id: 9,
      type: "integer",
      question: "What is the value of pi rounded to the nearest integer?",
      correctAnswer: 3
    },
    {
      id: 10,
      type: "integer",
      question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
      correctAnswer: 120
    }
  ]
};