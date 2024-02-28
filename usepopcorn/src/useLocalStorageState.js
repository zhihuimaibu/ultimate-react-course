import { useState, useEffect } from "react";

export default function useLocalStorageState(initial, key) {
  const [value, setValue] = useState(() => {
    const item = JSON.parse(localStorage.getItem(key));
    return item ? item : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
