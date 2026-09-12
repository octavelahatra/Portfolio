"use client"

import { motion } from "framer-motion"
import { type ReactNode, useRef } from "react"
import { useScrollParallax } from "@/hooks/use-scroll-parallax"

interface ParallaxProps {
  children: ReactNode
  /** Max travel in px over the element's scroll-through range. */
  distance?: number
  className?: string
}

/**
 * Scroll-linked depth for a decorative background layer. Deliberately not
 * for body content — see `useScrollParallax`'s doc comment. Not
 * scroll-jacking: this never intercepts or overrides the scroll gesture
 * itself, it just reads `scrollYProgress` and offsets a `transform` — the
 * page always scrolls at native speed underneath it.
 */
export function Parallax({ children, distance = 40, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const y = useScrollParallax(ref, distance)

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
