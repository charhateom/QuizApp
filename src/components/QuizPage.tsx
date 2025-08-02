import React from 'react';
import { QuizQuestion } from '../types/quiz';
import { Timer } from './Timer';
import { NavigationPanel } from './NavigationPanel';
import { QuestionCard } from './QuestionCard';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

interface QuizPageProps {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  timeRemaining: number;
  formatTime: string;
  userEmail: string;
  onAnswerSelect: (questionIndex: number, answer: string) => void;
  onQuestionNavigate: (index: number) => void;
  onPreviousQuestion: () => void;
  onNextQuestion: () => void;
  onSubmitQuiz: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  questions,
  currentQuestionIndex,
  timeRemaining,
  formatTime,
  userEmail,
  onAnswerSelect,
  onQuestionNavigate,
  onPreviousQuestion,
  onNextQuestion,
  onSubmitQuiz,
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = questions.filter(q => q.userAnswer).length;
  const progress = (answeredCount / questions.length) * 100;

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Knowledge Quiz</h1>
              <p className="text-sm text-gray-600">{userEmail}</p>
            </div>
            <Timer timeRemaining={timeRemaining} formatTime={formatTime} />
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress: {answeredCount} of {questions.length} questions</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Panel */}
          <div className="lg:col-span-1">
            <NavigationPanel
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              onQuestionSelect={onQuestionNavigate}
            />
          </div>

          {/* Question Area */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
              </div>
              
              <QuestionCard
                question={currentQuestion}
                onAnswerSelect={(answer) => onAnswerSelect(currentQuestionIndex, answer)}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={onPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex gap-3">
                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={onSubmitQuiz}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={onNextQuestion}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};