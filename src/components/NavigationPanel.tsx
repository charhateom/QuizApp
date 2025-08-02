import React from 'react';
import { QuizQuestion } from '../types/quiz';
import { Check, Eye, Circle } from 'lucide-react';

interface NavigationPanelProps {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  questions,
  currentQuestionIndex,
  onQuestionSelect,
}) => {
  const getQuestionStatus = (question: QuizQuestion, index: number) => {
    if (question.userAnswer) {
      return { icon: Check, color: 'bg-green-500 text-white', label: 'Answered' };
    }
    if (question.isVisited) {
      return { icon: Eye, color: 'bg-yellow-500 text-white', label: 'Visited' };
    }
    return { icon: Circle, color: 'bg-gray-300 text-gray-600', label: 'Not visited' };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Question Overview
      </h3>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {questions.map((question, index) => {
          const { icon: Icon, color } = getQuestionStatus(question, index);
          const isActive = index === currentQuestionIndex;
          
          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                isActive 
                  ? 'ring-2 ring-blue-500 ring-offset-2' 
                  : 'hover:scale-105'
              } ${color}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded flex items-center justify-center">
            <Eye className="w-3 h-3 text-white" />
          </div>
          <span>Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded flex items-center justify-center">
            <Circle className="w-3 h-3 text-gray-600" />
          </div>
          <span>Not visited</span>
        </div>
      </div>
    </div>
  );
};