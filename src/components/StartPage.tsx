import React, { useState } from 'react';
import { Mail, Play, Clock, BookOpen } from 'lucide-react';

interface StartPageProps {
  onStart: (email: string) => void;
  isLoading: boolean;
}

export const StartPage: React.FC<StartPageProps> = ({ onStart, isLoading }) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setIsValidEmail(false);
      return;
    }
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }
    setIsValidEmail(true);
    onStart(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isValidEmail && e.target.value) {
      setIsValidEmail(validateEmail(e.target.value));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Knowledge Quiz
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Test your knowledge with our challenging 15-question quiz
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-800">30 minutes duration</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-purple-800">15 questions total</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    !isValidEmail ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  disabled={isLoading}
                />
              </div>
              {!isValidEmail && (
                <p className="mt-2 text-sm text-red-600">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              {isLoading ? 'Loading Quiz...' : 'Start Quiz'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};