import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 500) {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    if(!value) return;
    const timeout_id = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeout_id);
  }, [value, delay])

  return debounceValue;
}
