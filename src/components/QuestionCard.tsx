import React from 'react';
import { QuizQuestion } from '../types/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswerSelect: (answer: string) => void;
  showFeedback?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswerSelect,
  showFeedback = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {question.category}
          </span>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            question.difficulty === 'easy' 
              ? 'bg-green-100 text-green-800'
              : question.difficulty === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {question.choices.map((choice, index) => {
          const isSelected = question.userAnswer === choice;
          const isCorrect = choice === question.correct_answer;
          
          let buttonClass = 'w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500';
          
          if (showFeedback) {
            if (isCorrect) {
              buttonClass += ' border-green-500 bg-green-50 text-green-800';
            } else if (isSelected && !isCorrect) {
              buttonClass += ' border-red-500 bg-red-50 text-red-800';
            } else {
              buttonClass += ' border-gray-200 bg-gray-50 text-gray-600';
            }
          } else {
            if (isSelected) {
              buttonClass += ' border-blue-500 bg-blue-50 text-blue-800';
            } else {
              buttonClass += ' border-gray-200 hover:border-gray-300';
            }
          }

          return (
            <button
              key={index}
              onClick={() => !showFeedback && onAnswerSelect(choice)}
              disabled={showFeedback}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  showFeedback && isCorrect
                    ? 'border-green-500 bg-green-500'
                    : showFeedback && isSelected && !isCorrect
                      ? 'border-red-500 bg-red-500'
                      : isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                }`}>
                  {(isSelected || (showFeedback && isCorrect)) && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>
                <span className="font-medium">{choice}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};