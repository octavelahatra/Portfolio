"use client"

import { useScroll, useTransform, type MotionValue } from "framer-motion"
import type { RefObject } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

/**
 * Scroll-linked vertical offset for a *decorative* layer — a background
 * shape, a large photo, never body copy (parallaxing text hurts reading
 * comfort and can trigger motion sickness). Tracks `ref` from just below
 * the viewport to just above it, so the offset settles back to 0 well
 * before and after the element is actually on screen.
 *
 * Returns a flat 0 `MotionValue` under reduced motion — callers can wire it
 * straight into `style={{ y }}` without a conditional.
 */
export function useScrollParallax(ref: RefObject<HTMLElement | null>, distance = 40): MotionValue<number> {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  return useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-distance, distance])
}
