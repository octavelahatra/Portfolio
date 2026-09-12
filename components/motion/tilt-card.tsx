"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { type PointerEvent as ReactPointerEvent, type ReactNode, useRef } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max tilt in degrees. Kept small — this signals "physical surface", not a carnival ride. */
  maxTilt?: number
  /** Forwarded to the root element — e.g. `data-cursor-hover` for the optional CursorFollower. */
  [dataAttribute: `data-${string}`]: unknown
}

/**
 * The portfolio's one project/gallery card interaction: a subtle 3D tilt
 * that follows the pointer, plus a small lift, reinforcing that the card is
 * a tangible surface rather than a flat image. Mouse-only — `pointer:
 * coarse` (touch) devices get a plain static card with normal `:hover`/tap
 * feedback from their own children, since there's no continuous pointer
 * position to tilt toward. Disabled under reduced motion for the same
 * reason a parallax layer is: gratuitous motion tied to pointer position.
 */
export function TiltCard({ children, className, maxTilt = 6, ...dataProps }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const isFinePointer = useMediaQuery("(pointer: fine)")
  const enabled = isFinePointer && !reducedMotion

  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const springX = useSpring(pointerX, { stiffness: 200, damping: 20 })
  const springY = useSpring(pointerY, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt])
  const lift = useTransform(springY, [0, 0.5, 1], [-4, -8, -4])

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled || event.pointerType !== "mouse") return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    pointerX.set((event.clientX - rect.left) / rect.width)
    pointerY.set((event.clientY - rect.top) / rect.height)
  }

  const handlePointerLeave = () => {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        enabled
          ? { rotateX, rotateY, y: lift, transformPerspective: 800 }
          : undefined
      }
      className={className}
      {...dataProps}
    >
      {children}
    </motion.div>
  )
}
