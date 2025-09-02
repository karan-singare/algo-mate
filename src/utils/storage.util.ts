import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

// Storage utility functions
export const StorageUtil = {
  // String operations
  setString: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting string for key ${key}:`, error);
    }
  },

  getString: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting string for key ${key}:`, error);
      return null;
    }
  },

  // Number operations
  setNumber: async (key: string, value: number): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error(`Error setting number for key ${key}:`, error);
    }
  },

  getNumber: async (key: string): Promise<number | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? parseFloat(value) : null;
    } catch (error) {
      console.error(`Error getting number for key ${key}:`, error);
      return null;
    }
  },

  // Boolean operations
  setBoolean: async (key: string, value: boolean): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error(`Error setting boolean for key ${key}:`, error);
    }
  },

  getBoolean: async (key: string): Promise<boolean | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? value === 'true' : null;
    } catch (error) {
      console.error(`Error getting boolean for key ${key}:`, error);
      return null;
    }
  },

  // Object operations (JSON serialization)
  setObject: async <T>(key: string, value: T): Promise<void> => {
    try {
      const jsonString = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonString);
    } catch (error) {
      console.error(`Error setting object for key ${key}:`, error);
    }
  },

  getObject: async <T>(key: string): Promise<T | null> => {
    try {
      const jsonString = await AsyncStorage.getItem(key);
      if (jsonString) {
        return JSON.parse(jsonString) as T;
      }
      return null;
    } catch (error) {
      console.error(`Error parsing JSON for key ${key}:`, error);
      return null;
    }
  },

  // Array operations
  setArray: async <T>(key: string, value: T[]): Promise<void> => {
    try {
      const jsonString = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonString);
    } catch (error) {
      console.error(`Error setting array for key ${key}:`, error);
    }
  },

  getArray: async <T>(key: string): Promise<T[] | null> => {
    try {
      const jsonString = await AsyncStorage.getItem(key);
      if (jsonString) {
        return JSON.parse(jsonString) as T[];
      }
      return null;
    } catch (error) {
      console.error(`Error parsing JSON array for key ${key}:`, error);
      return null;
    }
  },

  // Utility operations
  contains: async (key: string): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch (error) {
      console.error(`Error checking if key exists ${key}:`, error);
      return false;
    }
  },

  delete: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting key ${key}:`, error);
    }
  },

  deleteAll: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing all storage:', error);
    }
  },

  getAllKeys: async (): Promise<readonly string[]> => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  },
};




