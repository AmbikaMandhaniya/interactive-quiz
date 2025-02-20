# QuizMaster

A modern, interactive quiz application built with React that allows users to test their knowledge across various subjects.

## 📋 Features

- **Multiple question types**: Supports both multiple-choice and integer answer questions
- **Timed quizzes**: Each question has a time limit to keep users engaged
- **Progress tracking**: Visual progress bar to show quiz completion status
- **Score history**: Track and review past quiz attempts
- **Responsive design**: Works on desktop and mobile devices
- **Instant feedback**: Users receive immediate feedback on their answers
- **Persistent storage**: Quiz history saved using IndexedDB

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/quizmaster.git
cd quizmaster
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## 🧱 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── AttemptHistory.js
│   ├── Navbar.js
│   ├── ProgressBar.js
│   ├── Question.js
│   ├── QuestionCard.js
│   ├── Results.js
│   └── Timer.js
├── contexts/           # React context providers
│   └── QuizContext.jsx
├── data/               # Static data files
│   └── quizData.js
├── pages/              # Page components
│   ├── HistoryPage.js
│   ├── Home.js
│   └── QuizPage.js
├── styles/             # CSS files
│   └── (component-specific CSS files)
├── utils/              # Utility functions and constants
│   ├── constants.js
│   └── helpers.js
├── App.js              # Main app component
└── index.js            # Entry point
```

## 📱 Core Components

### QuizContext (src/contexts/QuizContext.jsx)
- Central state management for the quiz application
- Handles quiz flow, timing, answer submission, and score calculation
- Manages quiz history persistence using IndexedDB

### QuestionCard (src/components/QuestionCard.js)
- Displays individual quiz questions
- Handles user interaction for both multiple-choice and integer questions
- Provides immediate feedback on answer correctness

### Timer (src/components/Timer.js)
- Displays countdown timer for each question
- Changes color as time decreases
- Triggers automatic progression when time expires

## 🔧 Technologies Used

- **React**: UI library
- **React Router**: Navigation and routing
- **IndexedDB (idb)**: Client-side storage for quiz history
- **CSS3**: Styling and animations

## 🧪 Adding New Quizzes

To add new quizzes, modify the `quizData.js` file in the `src/data` directory:

```javascript
export const quizData = {
  title: "Your New Quiz Title",
  timePerQuestion: 30, // in seconds
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "Your question text here?",
      options: [
        { id: 'A', text: 'Option A' },
        { id: 'B', text: 'Option B' },
        { id: 'C', text: 'Option C' },
        { id: 'D', text: 'Option D' }
      ],
      correctAnswer: 'A'
    },
    {
      id: 2,
      type: "integer",
      question: "Your numerical question here?",
      correctAnswer: 42
    }
    // Add more questions...
  ]
};
```

## 📦 Building for Production

To build the app for production:

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.