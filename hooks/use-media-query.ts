"use client"

import { useCallback, useSyncExternalStore } from "react"

/**
 * Subscribes to a CSS media query via `useSyncExternalStore` — the correct
 * primitive for browser-API-derived state (avoids the "setState inside an
 * effect" anti-pattern and any hydration flicker: React reconciles the
 * server/client snapshot difference for us instead of us reacting to it).
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", callback)
      return () => mql.removeEventListener("change", callback)
    },
    [query],
  )
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])
  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
