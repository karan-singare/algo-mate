import { useState, useEffect } from 'react';
import { StorageUtil } from '../utils/storage.util';
import { STORAGE_KEYS } from '../constants';

// User preferences type definition
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  sound: boolean;
  language: string;
}

// User preferences storage utilities
export const UserPreferencesStorage = {
  get: async (): Promise<UserPreferences | null> => {
    return await StorageUtil.getObject<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES);
  },

  set: async (preferences: UserPreferences): Promise<void> => {
    await StorageUtil.setObject(STORAGE_KEYS.USER_PREFERENCES, preferences);
  },

  update: async (updates: Partial<UserPreferences>): Promise<void> => {
    const current = await UserPreferencesStorage.get();
    if (current) {
      await UserPreferencesStorage.set({ ...current, ...updates });
    }
  },
};

// User preferences hook
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const storedPreferences = await StorageUtil.getObject<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES);
        setPreferences(storedPreferences || {
          theme: 'system',
          notifications: true,
          sound: true,
          language: 'en',
        });
      } catch (error) {
        console.error('Error loading user preferences:', error);
        setPreferences({
          theme: 'system',
          notifications: true,
          sound: true,
          language: 'en',
        });
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    try {
      const current = preferences || {
        theme: 'system',
        notifications: true,
        sound: true,
        language: 'en',
      };

      const newPreferences = { ...current, ...updates };
      setPreferences(newPreferences);
      await StorageUtil.setObject(STORAGE_KEYS.USER_PREFERENCES, newPreferences);
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  };

  return {
    preferences,
    loading,
    updatePreferences,
  };
};
