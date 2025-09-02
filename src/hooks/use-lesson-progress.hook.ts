import { useState, useEffect } from 'react';
import { StorageUtil } from '@utils/storage.util';

export const useLessonProgress = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProgress = async () => {
    try {
      const stored = await StorageUtil.getArray<string>('completed_lessons');
      setCompletedLessons(stored || []);
    } catch (error) {
      console.error('Error loading lesson progress:', error);
      setCompletedLessons([]);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId: string) => {
    try {
      const updated = [...completedLessons, lessonId];
      await StorageUtil.setArray('completed_lessons', updated);
      setCompletedLessons(updated);
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const isCompleted = (lessonId: string): boolean => {
    return completedLessons.includes(lessonId);
  };

  useEffect(() => {
    loadProgress();
  }, []);

  return {
    completedLessons,
    loading,
    loadProgress,
    markLessonComplete,
    isCompleted,
  };
};
