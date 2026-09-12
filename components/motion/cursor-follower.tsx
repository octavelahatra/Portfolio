"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { POINTER_SPRING } from "@/lib/motion"

/**
 * Optional global cursor companion: a small ring that follows the pointer
 * and expands over anything marked `data-cursor-hover`. Not mounted
 * anywhere by default — opt in from `app/layout.tsx` if the portfolio
 * wants a custom-cursor identity:
 *
 * ```tsx
 * <CursorFollower />
 * ```
 *
 * Fully inert on touch/coarse pointers and under reduced motion (returns
 * `null` outright — no listeners attached, not just visually hidden), and
 * `pointer-events-none` so it never intercepts a click.
 */
export function CursorFollower() {
  const isFinePointer = useMediaQuery("(pointer: fine)")
  const reducedMotion = useReducedMotion()
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useSpring(useMotionValue(-100), POINTER_SPRING)
  const y = useSpring(useMotionValue(-100), POINTER_SPRING)
  const scale = useSpring(1, { stiffness: 300, damping: 25 })

  const enabled = isFinePointer && !reducedMotion

  useEffect(() => {
    if (!enabled) return

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!visible) setVisible(true)
      const target = event.target as Element | null
      setHovering(!!target?.closest("[data-cursor-hover]"))
    }
    const handleLeave = () => setVisible(false)

    window.addEventListener("pointermove", handleMove)
    document.documentElement.addEventListener("pointerleave", handleLeave)
    return () => {
      window.removeEventListener("pointermove", handleMove)
      document.documentElement.removeEventListener("pointerleave", handleLeave)
    }
  }, [enabled, visible, x, y])

  useEffect(() => {
    scale.set(hovering ? 1.8 : 1)
  }, [hovering, scale])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-primary/30 mix-blend-difference"
      style={{ x, y, scale, opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
    />
  )
}
