import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    console.log('INITIAL LC', initialValue);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  const saveToLocalStorage = (newValue: T) => {
    setStoredValue(newValue);
  };

  return [storedValue, saveToLocalStorage] as const;
}

export default useLocalStorage;
