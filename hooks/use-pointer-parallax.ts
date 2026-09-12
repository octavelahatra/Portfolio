"use client"

import { useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"
import type { RefObject } from "react"

interface PointerParallaxOptions {
  /** Disables tracking entirely (reduced motion, touch devices, etc.). */
  disabled?: boolean
  /** Spring stiffness/damping — higher damping = calmer, more "premium" trailing. */
  stiffness?: number
  damping?: number
}

/**
 * Tracks pointer position within `ref`'s bounds, normalized to [-1, 1] on
 * both axes, smoothed through a spring. Mouse-only (fine pointer) — touch
 * devices keep the values pinned at 0 so nothing shifts under a finger.
 */
export function usePointerParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { disabled = false, stiffness = 60, damping = 20 }: PointerParallaxOptions = {},
) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness, damping })
  const y = useSpring(rawY, { stiffness, damping })

  useEffect(() => {
    const node = ref.current
    if (!node || disabled) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    const handlePointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1
      rawX.set(Math.max(-1, Math.min(1, nx)))
      rawY.set(Math.max(-1, Math.min(1, ny)))
    }
    const handlePointerLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }

    node.addEventListener("pointermove", handlePointerMove)
    node.addEventListener("pointerleave", handlePointerLeave)
    return () => {
      node.removeEventListener("pointermove", handlePointerMove)
      node.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [ref, disabled, rawX, rawY])

  return { x, y }
}
