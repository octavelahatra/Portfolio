"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Reports whether an element is currently intersecting the viewport.
 * Used to pause expensive canvas/WebGL loops (rAF) when the Hero scrolls
 * out of view, instead of relying on Framer Motion's `useInView` (which is
 * built for one-shot reveal animations, not continuous visibility tracking).
 */
export function useInViewActive<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => setIsActive(entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(node)

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") setIsActive(false)
    }
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return { ref, isActive }
}
