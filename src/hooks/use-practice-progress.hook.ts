import { useState, useEffect } from 'react';
import { StorageUtil } from '@utils/storage.util';

export const usePracticeProgress = () => {
  const [solved, setSolved] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSolved = async () => {
    try {
      const stored = await StorageUtil.getArray<string>('solved_problems');
      setSolved(stored || []);
    } catch (error) {
      console.error('Error loading solved problems:', error);
      setSolved([]);
    } finally {
      setLoading(false);
    }
  };

  const markSolved = async (problemId: string) => {
    try {
      const updated = [...solved, problemId];
      await StorageUtil.setArray('solved_problems', updated);
      setSolved(updated);
    } catch (error) {
      console.error('Error marking problem as solved:', error);
    }
  };

  const isSolved = (problemId: string): boolean => {
    return solved.includes(problemId);
  };

  useEffect(() => {
    loadSolved();
  }, []);

  return {
    solved,
    loading,
    loadSolved,
    markSolved,
    isSolved,
  };
};
