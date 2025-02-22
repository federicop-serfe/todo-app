import { useState, useEffect } from "react";

export function useLocalStorage(itemKey, initialValue) {
  const [item, setItem] = useState(initialValue);
  const [error, setError] = useState(false);

  const saveItem = (newItem) => {
    setItem(newItem);
    localStorage.setItem(itemKey, JSON.stringify(newItem));
  };

  useEffect(() => {
    try {
      const storedItem = localStorage.getItem(itemKey);
      const parsedItem = storedItem ? JSON.parse(storedItem) : initialValue;
      setItem(parsedItem);
    } catch (e) {
      setError(true);
    }
  }, []);

  return { item, saveItem, error };
}
