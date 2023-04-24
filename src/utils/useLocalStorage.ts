import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export const STORAGE_PREFIX = "@ffs-consulting:WorkWork--";

function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [value: T | null, setValue: Dispatch<SetStateAction<T | null>>] {
  const prefixedKey = STORAGE_PREFIX + key;

  const [value, setValue] = useState<T | null>(() => {
    if (typeof window !== "undefined") {
      const json = localStorage.getItem(prefixedKey);
      if (json !== null) {
        return JSON.parse(json) as T;
      }
    }

    if (typeof initialValue === "function") {
      return initialValue() as T;
    }

    return (initialValue as T) || null;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
}

export default useLocalStorage;
