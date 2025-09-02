export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the time complexity of accessing an element in an array?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'Array access is O(1) because we can directly access any element using its index.',
    category: 'Arrays',
  },
  {
    id: '2',
    question: 'Which data structure follows LIFO (Last In, First Out) principle?',
    options: ['Queue', 'Stack', 'Array', 'Linked List'],
    correctAnswer: 1,
    explanation: 'Stack follows LIFO principle where the last element added is the first one to be removed.',
    category: 'Data Structures',
  },
  {
    id: '3',
    question: 'What is the space complexity of merge sort?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'Merge sort requires O(n) extra space for the temporary arrays used during merging.',
    category: 'Sorting',
  },
];
