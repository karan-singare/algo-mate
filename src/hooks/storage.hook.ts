import { useState, useEffect } from 'react';
import { StorageUtil } from '../utils/storage.util';

// Generic storage hook
export const useStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await StorageUtil.getObject<T>(key);
        setValue(storedValue || defaultValue);
      } catch (error) {
        console.error(`Error loading value for key ${key}:`, error);
        setValue(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key, defaultValue]);

  const updateValue = async (newValue: T) => {
    try {
      setValue(newValue);
      await StorageUtil.setObject(key, newValue);
    } catch (error) {
      console.error(`Error updating value for key ${key}:`, error);
    }
  };

  const deleteValue = async () => {
    try {
      setValue(defaultValue);
      await StorageUtil.delete(key);
    } catch (error) {
      console.error(`Error deleting value for key ${key}:`, error);
    }
  };

  return {
    value,
    loading,
    updateValue,
    deleteValue,
  };
};
