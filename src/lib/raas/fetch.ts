"use client";

import { ROLE_STORAGE_KEY } from "./role";
import { ROLE_HEADER_NAME } from "./headers";
import type { RoleId } from "./wireframe";

/**
 * Client-side fetch wrapper that auto-attaches the X-Maze-Role header
 * to every API call.
 *
 * SECURITY: We NEVER read role from a URL query parameter (?role=) —
 * that was a critical bypass that allowed anyone to visit `?role=admin`.
 * Role lives ONLY in localStorage and is sent via the X-Maze-Role header.
 */
export async function raasFetch(
  input: string,
  init?: RequestInit
): Promise<Response> {
  const role: RoleId =
    typeof window !== "undefined"
      ? ((window.localStorage.getItem(ROLE_STORAGE_KEY) as RoleId) || "public")
      : "public";

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      [ROLE_HEADER_NAME]: role,
    },
  });
}

// Re-export for client consumers that want to read the header name.
export { getRoleFromHeaders } from "./headers";
export { ROLE_HEADER_NAME } from "./headers";

