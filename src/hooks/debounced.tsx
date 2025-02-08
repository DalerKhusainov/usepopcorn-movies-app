import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number = 300): string => {
  const [debounced, setDebounced] = useState(value);

  useEffect(
    function () {
      const handler = setTimeout(function () {
        setDebounced(value);
      }, delay);
      return () => clearTimeout(handler);
    },
    [value, delay]
  );
  return debounced;
};
