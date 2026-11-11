"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { RoleId } from "./wireframe";

const STORAGE_KEY = "raas-role";
const HEADER_NAME = "X-Maze-Role";

// In-memory mirror of localStorage, so multiple components subscribe to the
// same source and re-render together when the role changes.
let currentRole: RoleId = "public";
const subscribers = new Set<() => void>();

function readStored(): RoleId {
  if (typeof window === "undefined") return "public";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as RoleId | null;
    if (
      stored &&
      ["public", "artist", "fan", "b2b_dev", "investor", "admin", "archivist"].includes(
        stored
      )
    ) {
      return stored;
    }
  } catch {
    // localStorage might be blocked
  }
  return "public";
}

// Initialize on the client (once).
if (typeof window !== "undefined") {
  currentRole = readStored();
  // Keep in sync if other tabs change the role.
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      currentRole = readStored();
      subscribers.forEach((fn) => fn());
    }
  });
}

function subscribe(fn: () => void) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

function getSnapshot(): RoleId {
  return currentRole;
}

function getServerSnapshot(): RoleId {
  return "public";
}

export function useRole(): {
  role: RoleId;
  setRole: (r: RoleId) => void;
  hydrated: boolean;
} {
  const role = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // On the server, role = "public". On the client after hydration, role = stored.
  // `hydrated` is true whenever we're rendering with the real client snapshot.
  const hydrated = typeof window !== "undefined";

  const setRole = useCallback((r: RoleId) => {
    currentRole = r;
    try {
      window.localStorage.setItem(STORAGE_KEY, r);
    } catch {
      // ignore
    }
    subscribers.forEach((fn) => fn());
  }, []);

  return { role, setRole, hydrated };
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export const ROLE_STORAGE_KEY = STORAGE_KEY;
export const ROLE_HEADER_NAME = HEADER_NAME;
