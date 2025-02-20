export const quizData = {
    title: "General Knowledge Quiz",
    description: "Test your knowledge across various subjects with this 10-question quiz.",
    timePerQuestion: 30, // seconds
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which planet is closest to the Sun?",
        options: [
          { id: "A", text: "Venus" },
          { id: "B", text: "Mercury" },
          { id: "C", text: "Earth" },
          { id: "D", text: "Mars" }
        ],
        correctAnswer: "B",
        points: 10
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
        options: [
          { id: "A", text: "Stack" },
          { id: "B", text: "Queue" },
          { id: "C", text: "Tree" },
          { id: "D", text: "Graph" }
        ],
        correctAnswer: "B",
        points: 10
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Which of the following is primarily used for structuring web pages?",
        options: [
          { id: "A", text: "Python" },
          { id: "B", text: "Java" },
          { id: "C", text: "HTML" },
          { id: "D", text: "C++" }
        ],
        correctAnswer: "C",
        points: 10
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Which chemical symbol stands for Gold?",
        options: [
          { id: "A", text: "Au" },
          { id: "B", text: "Gd" },
          { id: "C", text: "Ag" },
          { id: "D", text: "Pt" }
        ],
        correctAnswer: "A",
        points: 10
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which of these processes is not typically involved in refining petroleum?",
        options: [
          { id: "A", text: "Fractional distillation" },
          { id: "B", text: "Cracking" },
          { id: "C", text: "Polymerization" },
          { id: "D", text: "Filtration" }
        ],
        correctAnswer: "D",
        points: 10
      },
      {
        id: 6,
        type: "integer",
        question: "What is the value of 12 + 28?",
        correctAnswer: 40,
        points: 10
      },
      {
        id: 7,
        type: "integer",
        question: "How many states are there in the United States?",
        correctAnswer: 50,
        points: 10
      },
      {
        id: 8,
        type: "integer",
        question: "In which year was the Declaration of Independence signed?",
        correctAnswer: 1776,
        points: 10
      },
      {
        id: 9,
        type: "integer",
        question: "What is the value of pi rounded to the nearest integer?",
        correctAnswer: 3,
        points: 10
      },
      {
        id: 10,
        type: "integer",
        question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
        correctAnswer: 120,
        points: 10
      }
    ]
  };