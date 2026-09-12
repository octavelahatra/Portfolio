"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { DURATION, EASE } from "@/lib/motion"

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Route-change transition, mounted once in `app/layout.tsx` around
 * `{children}`. This portfolio is currently a single route, so today it's
 * a no-op in practice — but it's the one place a future route (a project
 * detail page, say) gets a consistent fade+settle instead of a hard cut,
 * without every future page needing to remember to wrap itself.
 *
 * A short fade + 8px settle, not a slide or a wipe: a page transition
 * should feel like a continuation, not an event.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
        transition={{ duration: reducedMotion ? 0 : DURATION.fast, ease: EASE.standard }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
