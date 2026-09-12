"use client"

import { motion, useInView, type UseInViewOptions } from "framer-motion"
import { type ReactNode, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { withReducedMotion } from "@/lib/motion"
import { buildRevealVariants } from "./variant-builder"

export type RevealVariant = "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale"

interface RevealProps {
  children: ReactNode
  /** Which reveal variant to play — see lib/motion/variants.ts for the reasoning behind each. */
  variant?: RevealVariant
  /** Seconds to hold before starting — for hand-placed sequencing outside a StaggerGroup. */
  delay?: number
  /** Override the default travel distance for slide-* variants. */
  distance?: number
  className?: string
  /** Replay every time the element re-enters view instead of once. Default false: most reveals should introduce an element exactly once. */
  loop?: boolean
  /** Passed straight to `useInView`'s margin — how early/late the trigger fires relative to the viewport edge. */
  margin?: UseInViewOptions["margin"]
}

/**
 * The default entrance for any piece of content that should announce
 * itself as the visitor scrolls to it. Wraps `useInView` + the shared
 * reveal variants + reduced-motion handling so no section hand-rolls its
 * own `containerVariants`/`itemVariants` pair again.
 *
 * For a *group* of siblings that should stagger in together, use
 * `StaggerGroup`/`StaggerItem` instead — `Reveal` triggers its own
 * viewport check per instance, which is correct for one element but wastes
 * an observer per child in a grid.
 */
export function Reveal({
  children,
  variant = "fade",
  delay = 0,
  distance,
  className,
  loop = false,
  margin = "-80px 0px",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: !loop, margin })
  const reducedMotion = useReducedMotion()
  const variants = withReducedMotion(buildRevealVariants(variant, delay, distance), reducedMotion)

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  )
}
