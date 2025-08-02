import React, { useState, useEffect, useCallback } from 'react';
import { StartPage } from './components/StartPage';
import { QuizPage } from './components/QuizPage';
import { ResultsPage } from './components/ResultsPage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useTimer } from './hooks/useTimer';
import { fetchQuizQuestions } from './services/quizApi';
import { prepareQuizQuestions, calculateResults, calculateScore, formatTimeElapsed } from './utils/quizHelpers';
import { QuizQuestion, QuizResult } from './types/quiz';

type AppState = 'start' | 'loading' | 'quiz' | 'results' | 'error';

function App() {
  const [appState, setAppState] = useState<AppState>('start');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleTimeUp = useCallback(() => {
    handleSubmitQuiz();
  }, []);

  const { timeRemaining, formatTime, start: startTimer, reset: resetTimer } = useTimer(1800, handleTimeUp); // 30 minutes

  const handleStartQuiz = async (email: string) => {
    setUserEmail(email);
    setAppState('loading');
    setError(null);

    try {
      const apiQuestions = await fetchQuizQuestions();
      const preparedQuestions = prepareQuizQuestions(apiQuestions);
      setQuestions(preparedQuestions);
      setStartTime(new Date());
      startTimer();
      setAppState('quiz');
    } catch (err) {
      setError('Failed to load quiz questions. Please try again.');
      setAppState('error');
    }
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setQuestions(prev => prev.map((q, index) => {
      if (index === questionIndex) {
        return {
          ...q,
          userAnswer: answer,
          isAttempted: true,
        };
      }
      return q;
    }));
  };

  const handleQuestionNavigate = (index: number) => {
    setCurrentQuestionIndex(index);
    setQuestions(prev => prev.map((q, i) => {
      if (i === index) {
        return { ...q, isVisited: true };
      }
      return q;
    }));
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      handleQuestionNavigate(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      handleQuestionNavigate(currentQuestionIndex + 1);
    }
  };

  function handleSubmitQuiz() {
    if (startTime) {
      const endTime = new Date();
      const timeElapsed = formatTimeElapsed(startTime, endTime);
      setTimeTaken(timeElapsed);
    }
    
    const quizResults = calculateResults(questions);
    const finalScore = calculateScore(questions);
    
    setResults(quizResults);
    setScore(finalScore);
    setAppState('results');
  }

  const handleRestart = () => {
    setAppState('start');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserEmail('');
    setStartTime(null);
    setResults([]);
    setScore(0);
    setTimeTaken('');
    setError(null);
    resetTimer();
  };

  // Mark first question as visited when quiz starts
  useEffect(() => {
    if (appState === 'quiz' && questions.length > 0 && !questions[0].isVisited) {
      setQuestions(prev => prev.map((q, index) => {
        if (index === 0) {
          return { ...q, isVisited: true };
        }
        return q;
      }));
    }
  }, [appState, questions]);

  if (appState === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (appState === 'loading') {
    return <LoadingSpinner />;
  }

  if (appState === 'results') {
    return (
      <ResultsPage
        results={results}
        userEmail={userEmail}
        score={score}
        totalQuestions={questions.length}
        timeTaken={timeTaken}
        onRestart={handleRestart}
      />
    );
  }

  if (appState === 'quiz') {
    return (
      <QuizPage
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        timeRemaining={timeRemaining}
        formatTime={formatTime}
        userEmail={userEmail}
        onAnswerSelect={handleAnswerSelect}
        onQuestionNavigate={handleQuestionNavigate}
        onPreviousQuestion={handlePreviousQuestion}
        onNextQuestion={handleNextQuestion}
        onSubmitQuiz={handleSubmitQuiz}
      />
    );
  }

  return (
    <StartPage
      onStart={handleStartQuiz}
      isLoading={appState === 'loading'}
    />
  );
}

export default App;