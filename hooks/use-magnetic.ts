"use client"

import { useMotionValue, useSpring } from "framer-motion"
import { type PointerEvent as ReactPointerEvent, type RefObject, useRef } from "react"
import { POINTER_SPRING } from "@/lib/motion"

interface UseMagneticOptions {
  /** Fraction of the pointer's offset from center that the element travels. */
  strength?: number
  disabled?: boolean
}

/**
 * The "magnetic" pointer-follow behind magnetic buttons/icons: the element
 * leans toward the cursor within its own bounds, then springs back on
 * leave. Mouse-only (`pointerType === "mouse"`) — touch devices get no
 * offset at all, since there's no hover state to lean toward. Disabled
 * entirely under reduced motion.
 *
 * Returns a ref to attach to the target element and the pointer handlers —
 * spread `style={{ x, y }}` from the returned motion values onto whatever
 * you want to move (usually a wrapping `motion.div`, so the interactive
 * element itself keeps its own semantics untouched).
 */
export function useMagnetic<T extends HTMLElement>({ strength = 0.3, disabled = false }: UseMagneticOptions = {}) {
  const ref = useRef<T>(null)
  const x = useSpring(useMotionValue(0), POINTER_SPRING)
  const y = useSpring(useMotionValue(0), POINTER_SPRING)

  const onPointerMove = (event: ReactPointerEvent<T>) => {
    if (disabled || event.pointerType !== "mouse") return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((event.clientX - rect.left - rect.width / 2) * strength)
    y.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref: ref as RefObject<T>, x, y, onPointerMove, onPointerLeave }
}
