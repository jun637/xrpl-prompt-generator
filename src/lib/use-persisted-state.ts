"use client";

import { useEffect, useRef, useState } from "react";

export function usePersistedState<T>(storageKey: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const hydratedRef = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw != null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- standard one-time client hydration from localStorage
        setValue(JSON.parse(raw) as T);
      }
    } catch {
    }
    hydratedRef.current = true;
  }, [storageKey]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
    }
  }, [storageKey, value]);

  return [value, setValue, hydratedRef] as const;
}
