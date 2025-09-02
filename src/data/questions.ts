export type Question = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  topic: string;
};

export const mcqs: Question[] = [
  {
    id: 'array-access-time',
    question: 'What is the time complexity of accessing an element in an array by its index?',
    options: [
      'O(n)',
      'O(log n)',
      'O(1)',
      'O(n log n)'
    ],
    answerIndex: 2,
    topic: 'arrays'
  },
  {
    id: 'linked-list-traversal',
    question: 'What is the time complexity of traversing a linked list with n nodes?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n)',
      'O(n²)'
    ],
    answerIndex: 2,
    topic: 'linked-list'
  },
  {
    id: 'array-vs-linkedlist',
    question: 'Which data structure is better for frequent insertions and deletions at the beginning?',
    options: [
      'Array',
      'Linked List',
      'Both are equally good',
      'Depends on the programming language'
    ],
    answerIndex: 1,
    topic: 'data-structures'
  }
];

// Export as questions for backward compatibility
export const questions = mcqs;