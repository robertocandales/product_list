import { useState, useEffect } from 'react';

export default function useStateWithStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const storedValue = localStorage.getItem(key);
  const initialValue =
    storedValue !== null ? JSON.parse(storedValue) : defaultValue;

  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
