
import { useState, useEffect } from 'react';

/**
 * A hook that synchronizes state across browser tabs and windows
 * @param key The key to use for localStorage
 * @param initialValue The initial value
 * @returns A state value and setter that will be synchronized
 */
export function useSyncState<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Initialize state with value from localStorage if available, otherwise use initialValue
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, state]);

  // Sync state across tabs/windows
  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === key) {
        try {
          const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
          setState(newValue);
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [initialValue, key]);

  return [state, setState];
}

export default useSyncState;
