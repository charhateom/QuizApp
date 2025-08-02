import { Question, QuizQuestion, QuizResult } from '../types/quiz';
import { decodeHtmlEntities } from '../services/quizApi';

export const prepareQuizQuestions = (apiQuestions: Question[]): QuizQuestion[] => {
  return apiQuestions.map((question, index) => {
    const decodedQuestion = decodeHtmlEntities(question.question);
    const decodedCorrectAnswer = decodeHtmlEntities(question.correct_answer);
    const decodedIncorrectAnswers = question.incorrect_answers.map(decodeHtmlEntities);
    
    // Shuffle choices
    const choices = [...decodedIncorrectAnswers, decodedCorrectAnswer].sort(() => Math.random() - 0.5);
    
    return {
      ...question,
      id: index,
      question: decodedQuestion,
      correct_answer: decodedCorrectAnswer,
      incorrect_answers: decodedIncorrectAnswers,
      choices,
      isVisited: false,
      isAttempted: false,
    };
  });
};

export const calculateResults = (questions: QuizQuestion[]): QuizResult[] => {
  return questions.map((question) => ({
    question: question.question,
    userAnswer: question.userAnswer || 'No answer selected',
    correctAnswer: question.correct_answer,
    isCorrect: question.userAnswer === question.correct_answer,
    choices: question.choices,
  }));
};

export const calculateScore = (questions: QuizQuestion[]): number => {
  return questions.filter(q => q.userAnswer === q.correct_answer).length;
};

export const formatTimeElapsed = (startTime: Date, endTime: Date): string => {
  const diffInSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;
  return `${minutes}m ${seconds}s`;
};