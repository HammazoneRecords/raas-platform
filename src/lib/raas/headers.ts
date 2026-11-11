import type { RoleId } from "./wireframe";

export const ROLE_HEADER_NAME = "X-Maze-Role";

/**
 * Read role from a NextRequest on the server.
 *
 * SECURITY:
 *   - Reads from the `X-Maze-Role` HTTP header ONLY.
 *   - NEVER reads from `?role=` URL query parameter (that was a critical
 *     bypass — anyone could visit ?role=admin and get full access).
 *   - NEVER reads from cookies (founder ruling: no cookies).
 *
 * This module is server-safe — no "use client" directive.
 */
export function getRoleFromHeaders(headers: Headers): RoleId {
  const headerRole = headers.get(ROLE_HEADER_NAME.toLowerCase());
  if (
    headerRole &&
    [
      "public",
      "artist",
      "fan",
      "b2b_dev",
      "investor",
      "admin",
      "archivist",
    ].includes(headerRole)
  ) {
    return headerRole as RoleId;
  }
  return "public";
}
