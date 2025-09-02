import { useState, useEffect } from 'react';
import { StorageUtil } from '@utils/storage.util';

export const useQuizProgress = () => {
  const [lastScore, setLastScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const loadScore = async () => {
    try {
      const stored = await StorageUtil.getNumber('quiz_score');
      setLastScore(stored || 0);
    } catch (error) {
      console.error('Error loading quiz score:', error);
      setLastScore(0);
    } finally {
      setLoading(false);
    }
  };

  const saveScore = async (score: number) => {
    try {
      await StorageUtil.setNumber('quiz_score', score);
      setLastScore(score);
    } catch (error) {
      console.error('Error saving quiz score:', error);
    }
  };

  useEffect(() => {
    loadScore();
  }, []);

  return {
    lastScore,
    loading,
    loadScore,
    saveScore,
  };
};
