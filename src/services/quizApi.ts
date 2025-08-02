import { Question } from '../types/quiz';

export const fetchQuizQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=15');
    if (!response.ok) {
      throw new Error('Failed to fetch quiz questions');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw error;
  }
};

export const decodeHtmlEntities = (text: string): string => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};