import React from 'react';
import { QuizResult } from '../types/quiz';
import { CheckCircle, XCircle, RotateCcw, Download } from 'lucide-react';

interface ResultsPageProps {
  results: QuizResult[];
  userEmail: string;
  score: number;
  totalQuestions: number;
  timeTaken: string;
  onRestart: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  results,
  userEmail,
  score,
  totalQuestions,
  timeTaken,
  onRestart,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Outstanding! 🎉';
    if (percentage >= 80) return 'Excellent work! 👏';
    if (percentage >= 70) return 'Good job! 👍';
    if (percentage >= 60) return 'Not bad! 🙂';
    return 'Keep practicing! 💪';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Quiz Completed! 🎯
            </h1>
            <div className="text-center mb-6">
              <p className="text-gray-600">{userEmail}</p>
              <p className="text-sm text-gray-500">
                Completed on {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} at {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
                <div className="text-3xl font-bold">{score}</div>
                <div className="text-sm opacity-90">Correct Answers</div>
              </div>
              <div className={`p-6 rounded-lg border-2 ${
                percentage >= 80 ? 'border-green-200 bg-green-50' :
                percentage >= 60 ? 'border-yellow-200 bg-yellow-50' :
                'border-red-200 bg-red-50'
              }`}>
                <div className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                  {percentage}%
                </div>
                <div className="text-sm text-gray-600">Final Score</div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="text-3xl font-bold text-gray-800">{timeTaken}</div>
                <div className="text-sm text-gray-600">Time Taken</div>
              </div>
            </div>
            
            <div className={`text-xl font-semibold mb-6 ${getScoreColor(percentage)}`}>
              {getScoreMessage(percentage)}
            </div>
            
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RotateCcw className="w-5 h-5" />
              Take Another Quiz
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Detailed Results
          </h2>
          
          {results.map((result, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {result.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                      Question {index + 1}
                    </span>
                    <span className={`px-2 py-1 text-sm font-medium rounded ${
                      result.isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {result.question}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Your Answer:</h4>
                      <div className={`p-3 rounded-lg border-2 ${
                        result.isCorrect 
                          ? 'border-green-200 bg-green-50 text-green-800'
                          : 'border-red-200 bg-red-50 text-red-800'
                      }`}>
                        {result.userAnswer || 'No answer selected'}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Correct Answer:</h4>
                      <div className="p-3 rounded-lg border-2 border-green-200 bg-green-50 text-green-800">
                        {result.correctAnswer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};