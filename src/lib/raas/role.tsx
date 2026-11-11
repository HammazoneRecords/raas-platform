"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { RoleId } from "./wireframe";

// ---------------------------------------------------------------------------
// RAAS auth + role state — client-side, localStorage-backed, NO COOKIES.
//
// Two keys in localStorage:
//   "raas-role"  → the active role id ("public" | "artist" | "fan" | ...)
//   "raas-user"  → JSON-encoded SafeUser object (id, email, displayName, role)
//
// Both are written together on login/signup, cleared together on logout.
// The X-Maze-Role header is sent on every API call (see raasFetch) and is
// still the source of truth for server-side authorization.
// ---------------------------------------------------------------------------

const STORAGE_KEY_ROLE = "raas-role";
const STORAGE_KEY_USER = "raas-user";
const HEADER_NAME = "X-Maze-Role";

const VALID_ROLES: RoleId[] = [
  "public",
  "artist",
  "fan",
  "b2b_dev",
  "investor",
  "admin",
  "archivist",
];

export interface SafeUser {
  id: string;
  email: string;
  displayName: string;
  role: RoleId;
  artistSlug: string | null;
  createdAt: string;
}

interface AuthState {
  role: RoleId;
  user: SafeUser | null;
}

let currentState: AuthState = { role: "public", user: null };
const subscribers = new Set<() => void>();

function readStored(): AuthState {
  if (typeof window === "undefined") return { role: "public", user: null };
  try {
    const role = (window.localStorage.getItem(STORAGE_KEY_ROLE) as RoleId | null) ?? "public";
    const userJson = window.localStorage.getItem(STORAGE_KEY_USER);
    const user: SafeUser | null = userJson ? JSON.parse(userJson) : null;
    const validRole = VALID_ROLES.includes(role) ? role : "public";
    // If user exists, prefer the user's role (defense in depth — role and
    // user should always agree, but if they drift, user wins).
    if (user && VALID_ROLES.includes(user.role)) {
      return { role: user.role, user };
    }
    return { role: validRole, user: null };
  } catch {
    return { role: "public", user: null };
  }
}

// Initialize on the client (once).
if (typeof window !== "undefined") {
  currentState = readStored();
  // Keep in sync if other tabs change auth.
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY_ROLE || e.key === STORAGE_KEY_USER) {
      currentState = readStored();
      subscribers.forEach((fn) => fn());
    }
  });
}

function subscribe(fn: () => void) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

function getSnapshot(): AuthState {
  return currentState;
}

function getServerSnapshot(): AuthState {
  return { role: "public", user: null };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface UseRoleReturn {
  /** Current role (always derived from the logged-in user, if any). */
  role: RoleId;
  /** The logged-in user, or null if not signed in. */
  user: SafeUser | null;
  /** True once we've read localStorage on the client. */
  hydrated: boolean;
  /** Called by the login/signup flow after the server confirms credentials. */
  setSession: (user: SafeUser) => void;
  /** Called by the logout flow. */
  clearSession: () => void;
  /** Legacy: change role without a user. Reserved for admin / debug only. */
  setRole: (r: RoleId) => void;
}

export function useRole(): UseRoleReturn {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = typeof window !== "undefined";

  const setSession = useCallback((user: SafeUser) => {
    try {
      window.localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      window.localStorage.setItem(STORAGE_KEY_ROLE, user.role);
    } catch {
      // ignore
    }
    currentState = { role: user.role, user };
    subscribers.forEach((fn) => fn());
  }, []);

  const clearSession = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY_USER);
      window.localStorage.setItem(STORAGE_KEY_ROLE, "public");
    } catch {
      // ignore
    }
    currentState = { role: "public", user: null };
    subscribers.forEach((fn) => fn());
  }, []);

  const setRole = useCallback((r: RoleId) => {
    try {
      window.localStorage.setItem(STORAGE_KEY_ROLE, r);
    } catch {
      // ignore
    }
    currentState = { role: r, user: currentState.user };
    subscribers.forEach((fn) => fn());
  }, []);

  return {
    role: state.role,
    user: state.user,
    hydrated,
    setSession,
    clearSession,
    setRole,
  };
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export const ROLE_STORAGE_KEY = STORAGE_KEY_ROLE;
export const USER_STORAGE_KEY = STORAGE_KEY_USER;
export const ROLE_HEADER_NAME = HEADER_NAME;
