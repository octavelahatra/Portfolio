"use client"

import { motion, useInView, type UseInViewOptions } from "framer-motion"
import { createContext, type ReactNode, useContext, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { staggerContainer, withReducedMotion } from "@/lib/motion"
import { type RevealVariant } from "./reveal"
import { buildRevealVariants } from "./variant-builder"

interface StaggerGroupProps {
  children: ReactNode
  /** Seconds between each child's entrance. */
  stagger?: number
  /** Seconds before the first child starts. */
  delayChildren?: number
  className?: string
  loop?: boolean
  margin?: UseInViewOptions["margin"]
}

// Lets StaggerItem read the group's reduced-motion state without every call
// site having to look it up itself — one observer/subscription per group,
// not one per item.
const StaggerReducedMotionContext = createContext(false)

/**
 * Reveals a set of children in sequence instead of all at once, so a grid
 * of cards or a list of skills reads as one related set arriving together.
 * Replaces the `containerVariants`/`itemVariants` pair every section on the
 * old site redefined for itself.
 *
 * ```tsx
 * <StaggerGroup>
 *   {items.map((item) => (
 *     <StaggerItem key={item.id}>{item.content}</StaggerItem>
 *   ))}
 * </StaggerGroup>
 * ```
 */
export function StaggerGroup({
  children,
  stagger = 0.08,
  delayChildren = 0,
  className,
  loop = false,
  margin = "-80px 0px",
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: !loop, margin })
  const reducedMotion = useReducedMotion()
  const variants = withReducedMotion(staggerContainer(stagger, delayChildren), reducedMotion)

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      <StaggerReducedMotionContext.Provider value={reducedMotion}>{children}</StaggerReducedMotionContext.Provider>
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  variant?: RevealVariant
  distance?: number
  className?: string
}

/** One entry inside a `StaggerGroup`. Inherits its show/hide trigger from
 *  the parent — it never runs its own viewport check. */
export function StaggerItem({ children, variant = "slide-up", distance, className }: StaggerItemProps) {
  const reducedMotion = useContext(StaggerReducedMotionContext)
  const variants = withReducedMotion(buildRevealVariants(variant, 0, distance), reducedMotion)

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
