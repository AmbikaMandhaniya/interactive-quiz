export const QUIZ_CONFIG = {
    TIME_PER_QUESTION: 30, // Time in seconds for each question
    PASSING_SCORE: 70, // Percentage required to pass the quiz
  };
  
  export const RESULT_STATUS = {
    EXCELLENT: {
      threshold: 70,
      message: "Excellent! You have a strong understanding of the material.",
      icon: "🏆",
      color: "#2ecc71",
    },
    GOOD: {
      threshold: 40,
      message: "Good work! You're on the right track, but there's room for improvement.",
      icon: "👍",
      color: "#f39c12",
    },
    NEEDS_IMPROVEMENT: {
      threshold: 0,
      message: "Keep studying! You'll get better with practice.",
      icon: "📚",
      color: "#e74c3c",
    },
  };
  
  export const LOCAL_STORAGE_KEYS = {
    QUIZ_HISTORY: "quizHistory", // Key for storing quiz history in localStorage
  };
  
  export const ERROR_MESSAGES = {
    INVALID_INPUT: "Please enter a valid number.",
    EMPTY_INPUT: "Please enter a value.",
  };
  
  export const DB_CONFIG = {
    NAME: 'quizApp',
    VERSION: 1,
    STORES: {
      ATTEMPTS: 'attempts'
    }
  };