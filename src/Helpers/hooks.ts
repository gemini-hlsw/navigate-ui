import { useEffect, useState } from 'react';

/**
 * State hook that returns a boolean value that is true for 1 second after being set to true.
 */
export function useStale() {
  const [stale, setStale] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (stale) {
        setStale(false);
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [stale, setStale]);

  return [stale, setStale] as const;
}
export type Stale = ReturnType<typeof useStale>[0];
export type SetStale = ReturnType<typeof useStale>[1];
