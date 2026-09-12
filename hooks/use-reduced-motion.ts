"use client"

import { useMediaQuery } from "@/hooks/use-media-query"

/** Tracks the user's `prefers-reduced-motion` OS/browser preference. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)")
}
