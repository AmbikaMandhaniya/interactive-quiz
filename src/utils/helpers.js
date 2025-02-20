import { RESULT_STATUS } from "./constants";

/**
 * Calculate the user's score based on their answers.
 * @param {Object} userAnswers - User's answers (key: questionId, value: answer).
 * @param {Array} quizData - The quiz questions and correct answers.
 * @returns {Object} - Score and percentage.
 */
export const calculateScore = (userAnswers, questions) => {
  let score = 0;
  questions.forEach((question) => {
    const userAnswer = userAnswers[question.id];
    if (userAnswer !== undefined && String(userAnswer) === String(question.correctAnswer)) {
      score++;
    }
  });
  const percentage = Math.round((score / questions.length) * 100);
  return { score, percentage };
};

/**
 * Determine the result status based on the percentage score.
 * @param {number} percentage - The user's score percentage.
 * @returns {Object} - Result status, message, icon, and color.
 */
export const getResultStatus = (percentage) => {
  if (percentage >= RESULT_STATUS.EXCELLENT.threshold) {
    return RESULT_STATUS.EXCELLENT;
  } else if (percentage >= RESULT_STATUS.GOOD.threshold) {
    return RESULT_STATUS.GOOD;
  } else {
    return RESULT_STATUS.NEEDS_IMPROVEMENT;
  }
};

/**
 * Format the date and time for display.
 * @param {string} dateString - The date string to format.
 * @returns {string} - Formatted date and time.
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

/**
 * Validate user input for integer-type questions.
 * @param {string} input - The user's input.
 * @returns {Object} - { isValid: boolean, errorMessage: string | null }
 */
export const validateIntegerInput = (input) => {
  if (!input.trim()) {
    return { isValid: false, errorMessage: "Please enter a value" };
  }
  
  const numValue = parseInt(input);
  if (isNaN(numValue)) {
    return { isValid: false, errorMessage: "Please enter a valid number" };
  }
  
  return { isValid: true, errorMessage: null };
};

/**
 * Generate a unique attempt ID based on timestamp
 * @returns {string} - Unique ID for quiz attempt
 */
export const generateAttemptId = () => {
  return `attempt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};