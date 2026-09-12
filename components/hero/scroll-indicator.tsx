"use client"

import { motion } from "framer-motion"
import { restingOrLoop, safeTransition } from "@/lib/motion"

interface ScrollIndicatorProps {
  reducedMotion: boolean
}

export function ScrollIndicator({ reducedMotion }: ScrollIndicatorProps) {
  return (
    <motion.a
      href="#about"
      aria-label="Défiler vers la section À propos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: reducedMotion ? 0 : 1.2, duration: reducedMotion ? 0 : 0.6 }}
      className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full lg:flex"
    >
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em]">Scroll</span>
      <motion.span
        className="flex h-9 w-6 items-start justify-center rounded-full border border-current p-1.5"
        aria-hidden="true"
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-current"
          animate={{ y: restingOrLoop([0, 12, 0], 0, reducedMotion) }}
          transition={safeTransition({ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }, reducedMotion)}
        />
      </motion.span>
    </motion.a>
  )
}
