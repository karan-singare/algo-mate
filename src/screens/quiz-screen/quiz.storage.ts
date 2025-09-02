import { useState, useEffect } from 'react';
import { StorageUtil } from '../../utils/storage.util';
import { STORAGE_KEYS } from '../../constants';

// Quiz score type definition
export interface QuizScore {
  quizId: string;
  score: number;
  completedAt: string;
  topic: string;
}

// Quiz scores storage utilities
export const QuizScoresStorage = {
  get: async (): Promise<QuizScore[]> => {
    const scores = await StorageUtil.getArray<QuizScore>(STORAGE_KEYS.QUIZ_SCORES);
    return scores || [];
  },

  add: async (score: QuizScore): Promise<void> => {
    const scores = await QuizScoresStorage.get();
    scores.push(score);
    await StorageUtil.setArray(STORAGE_KEYS.QUIZ_SCORES, scores);
  },

  getByTopic: async (topic: string): Promise<QuizScore[]> => {
    const scores = await QuizScoresStorage.get();
    return scores.filter(score => score.topic === topic);
  },

  getAverageScore: async (): Promise<number> => {
    const scores = await QuizScoresStorage.get();
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, score) => sum + score.score, 0);
    return Math.round(total / scores.length);
  },

  clear: async (): Promise<void> => {
    await StorageUtil.delete(STORAGE_KEYS.QUIZ_SCORES);
  },
};

// Quiz scores hook
export const useQuizScores = () => {
  const [scores, setScores] = useState<QuizScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const storedScores = await StorageUtil.getArray<QuizScore>(STORAGE_KEYS.QUIZ_SCORES);
        setScores(storedScores || []);
      } catch (error) {
        console.error('Error loading quiz scores:', error);
        setScores([]);
      } finally {
        setLoading(false);
      }
    };

    loadScores();
  }, []);

  const addScore = async (score: QuizScore) => {
    try {
      const newScores = [...scores, score];
      setScores(newScores);
      await StorageUtil.setArray(STORAGE_KEYS.QUIZ_SCORES, newScores);
    } catch (error) {
      console.error('Error adding quiz score:', error);
    }
  };

  const getScoresByTopic = (topic: string) => {
    return scores.filter(score => score.topic === topic);
  };

  const getAverageScore = () => {
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, score) => sum + score.score, 0);
    return Math.round(total / scores.length);
  };

  const clearScores = async () => {
    try {
      setScores([]);
      await StorageUtil.delete(STORAGE_KEYS.QUIZ_SCORES);
    } catch (error) {
      console.error('Error clearing quiz scores:', error);
    }
  };

  return {
    scores,
    loading,
    addScore,
    getScoresByTopic,
    getAverageScore,
    clearScores,
  };
};
