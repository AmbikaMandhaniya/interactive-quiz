import React, { createContext, useContext, useState, useEffect } from 'react';
import { quizData } from '../data/quizData';
import { openDB } from 'idb';
import { DB_CONFIG, RESULT_STATUS } from '../utils/constants';
import { calculateScore, getResultStatus } from '../utils/helpers';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData.timePerQuestion);
  const [quizHistory, setQuizHistory] = useState([]);
  const [db, setDb] = useState(null);

  // Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      try {
        const dbInstance = await openDB(DB_CONFIG.NAME, DB_CONFIG.VERSION, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(DB_CONFIG.STORES.ATTEMPTS)) {
              db.createObjectStore(DB_CONFIG.STORES.ATTEMPTS, { keyPath: 'id', autoIncrement: true });
            }
          },
        });
        setDb(dbInstance);
        
        // Load quiz history
        const tx = dbInstance.transaction(DB_CONFIG.STORES.ATTEMPTS, 'readonly');
        const store = tx.objectStore(DB_CONFIG.STORES.ATTEMPTS);
        const attempts = await store.getAll();
        setQuizHistory(attempts);
      } catch (error) {
        console.error('Error initializing IndexedDB:', error);
      }
    };

    initDB();
  }, []);

  // Manage timer
  useEffect(() => {
    let timer;
    if (quizStarted && !quizFinished) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [quizStarted, quizFinished, currentQuestion]);

  // Reset timer when moving to next question
  useEffect(() => {
    if (quizStarted && !quizFinished) {
      setTimeLeft(quizData.timePerQuestion);
    }
  }, [currentQuestion, quizStarted, quizFinished]);

  const handleTimeout = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const startQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setQuizStarted(true);
    setQuizFinished(false);
    setTimeLeft(quizData.timePerQuestion);
  };

  const submitAnswer = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
    
    // Check if the answer is correct
    const question = quizData.questions.find(q => q.id === questionId);
    const isCorrect = String(question.correctAnswer) === String(answer);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Move to the next question or finish quiz
    if (currentQuestion < quizData.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 1000); // Short delay to show feedback
    } else {
      setTimeout(() => {
        finishQuiz(updatedAnswers);
      }, 1000); // Short delay to show feedback
    }
  };

  const finishQuiz = async (finalAnswers = answers) => {
    setQuizFinished(true);
    setQuizStarted(false);
    
    const { score: finalScore } = calculateScore(finalAnswers, quizData.questions);
    setScore(finalScore);
    
    // Save to IndexedDB
    if (db) {
      try {
        const quizAttempt = {
          date: new Date().toISOString(),
          score: finalScore,
          totalQuestions: quizData.questions.length,
          answers: finalAnswers
        };
        
        const tx = db.transaction(DB_CONFIG.STORES.ATTEMPTS, 'readwrite');
        const store = tx.objectStore(DB_CONFIG.STORES.ATTEMPTS);
        await store.add(quizAttempt);
        
        // Refresh the history
        const newTx = db.transaction(DB_CONFIG.STORES.ATTEMPTS, 'readonly');
        const newStore = newTx.objectStore(DB_CONFIG.STORES.ATTEMPTS);
        const attempts = await newStore.getAll();
        setQuizHistory(attempts);
      } catch (error) {
        console.error('Error saving quiz attempt:', error);
      }
    }
  };

  const value = {
    quizData,
    currentQuestion,
    setCurrentQuestion,
    answers,
    setAnswers,
    score,
    quizStarted,
    quizFinished,
    timeLeft,
    quizHistory,
    startQuiz,
    submitAnswer,
    finishQuiz
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};