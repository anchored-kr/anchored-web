"use client";

import { useSyncExternalStore } from "react";

/**
 * A tiny localStorage-backed external store.
 *
 * Why not `useState` + `useEffect`: reading storage inside an effect and calling
 * setState there triggers a second render pass and is flagged by
 * `react-hooks/set-state-in-effect`. `useSyncExternalStore` is React's sanctioned
 * way to read from an external system, and it hydrates cleanly because the server
 * snapshot is always the deterministic fallback.
 */
type Listener = () => void;

export interface LocalStore<T> {
  subscribe: (l: Listener) => () => void;
  get: () => T;
  getServer: () => T;
  set: (v: T) => void;
}

export function createLocalStore<T>(
  key: string,
  fallback: T,
  validate: (parsed: unknown) => T | null
): LocalStore<T> {
  let cached: T = fallback;
  let loaded = false;
  const listeners = new Set<Listener>();

  const read = (): T => {
    if (loaded) return cached;
    loaded = true;
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) {
        const v = validate(JSON.parse(raw));
        if (v != null) cached = v;
      }
    } catch {
      /* private mode / malformed JSON — keep the fallback */
    }
    return cached;
  };

  return {
    subscribe(l) {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
    get: read,
    getServer: () => fallback,
    set(v) {
      cached = v;
      loaded = true;
      try {
        localStorage.setItem(key, JSON.stringify(v));
      } catch {
        /* storage full or blocked — state still updates in memory */
      }
      listeners.forEach((l) => l());
    },
  };
}

export function useLocalStore<T>(store: LocalStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.getServer);
}
