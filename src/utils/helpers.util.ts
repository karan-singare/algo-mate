// Utility functions for the AlgoMate app

export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
    case 'beginner':
      return '#4CAF50';
    case 'medium':
    case 'intermediate':
      return '#FF9800';
    case 'hard':
    case 'advanced':
      return '#F44336';
    default:
      return '#9E9E9E';
  }
};

export const getDifficultyText = (difficulty: string): string => {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
};

export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};
