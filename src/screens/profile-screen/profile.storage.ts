import { useState, useEffect } from 'react';
import { StorageUtil } from '../../utils/storage.util';
import { STORAGE_KEYS } from '../../constants';

// User progress type definition
export interface UserProgress {
  lessonsCompleted: number;
  problemsSolved: number;
  quizScore: number;
  totalLessons: number;
  totalProblems: number;
  totalQuizzes: number;
}

// User progress storage utilities
export const UserProgressStorage = {
  get: async (): Promise<UserProgress | null> => {
    return await StorageUtil.getObject<UserProgress>(STORAGE_KEYS.USER_PROGRESS);
  },

  set: async (progress: UserProgress): Promise<void> => {
    await StorageUtil.setObject(STORAGE_KEYS.USER_PROGRESS, progress);
  },

  update: async (updates: Partial<UserProgress>): Promise<void> => {
    const current = await UserProgressStorage.get();
    if (current) {
      await UserProgressStorage.set({ ...current, ...updates });
    }
  },

  reset: async (): Promise<void> => {
    await StorageUtil.delete(STORAGE_KEYS.USER_PROGRESS);
  },
};

// User progress hook
export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const storedProgress = await StorageUtil.getObject<UserProgress>(STORAGE_KEYS.USER_PROGRESS);
        setProgress(storedProgress || null);
      } catch (error) {
        console.error('Error loading user progress:', error);
        setProgress(null);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  const updateProgress = async (updates: Partial<UserProgress>) => {
    try {
      const current = progress || {
        lessonsCompleted: 0,
        problemsSolved: 0,
        quizScore: 0,
        totalLessons: 7,
        totalProblems: 3,
        totalQuizzes: 6,
      };

      const newProgress = { ...current, ...updates };
      setProgress(newProgress);
      await StorageUtil.setObject(STORAGE_KEYS.USER_PROGRESS, newProgress);
    } catch (error) {
      console.error('Error updating user progress:', error);
    }
  };

  const resetProgress = async () => {
    try {
      const resetData: UserProgress = {
        lessonsCompleted: 0,
        problemsSolved: 0,
        quizScore: 0,
        totalLessons: 7,
        totalProblems: 3,
        totalQuizzes: 6,
      };
      setProgress(resetData);
      await StorageUtil.setObject(STORAGE_KEYS.USER_PROGRESS, resetData);
    } catch (error) {
      console.error('Error resetting user progress:', error);
    }
  };

  return {
    progress,
    loading,
    updateProgress,
    resetProgress,
  };
};
