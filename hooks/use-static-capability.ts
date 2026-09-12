"use client"

import { useCallback, useSyncExternalStore } from "react"

const noopSubscribe = () => () => {}

/**
 * Reads a one-time, non-reactive browser capability (WebGL support, core
 * count, connection type, …) — values that never change during the page's
 * lifetime, so there's nothing to subscribe to. Still routed through
 * `useSyncExternalStore` (with a no-op subscribe) rather than
 * `useState`+`useEffect`, so the same safe SSR → client re-sync applies:
 * the server/first-hydration render uses `serverValue`, then React
 * transparently re-renders once with the real `getSnapshot()` — no
 * "setState in an effect" cascade, no hydration-mismatch warning.
 */
export function useStaticCapability<T>(getSnapshot: () => T, serverValue: T): T {
  const getServerSnapshot = useCallback(() => serverValue, [serverValue])
  return useSyncExternalStore(noopSubscribe, getSnapshot, getServerSnapshot)
}
