export type Lesson = {
  id: string;
  title: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string; // markdown/plain text
  examples?: string[];
  codeSnippets?: { language: 'python' | 'cpp' | 'java'; code: string }[];
};
