"use client"

import { motion, useInView, type UseInViewOptions } from "framer-motion"
import type { ReactNode } from "react"
import { useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { imageReveal, withReducedMotion } from "@/lib/motion"

interface ImageRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  margin?: UseInViewOptions["margin"]
}

/**
 * Wraps an image (or a `next/image` `fill` container) so it settles into
 * place from a slight zoom rather than popping in — reads as a photo
 * "coming into focus". This component scales *itself*, so place it
 * *inside* whatever already gives the thumbnail its fixed size and
 * `overflow-hidden` (a project card's image frame, a gallery tile) —
 * that ancestor is what clips the starting 1.08 scale; ImageReveal doesn't
 * clip on its own.
 *
 * Used for project thumbnails and gallery tiles — anything photographic.
 * UI chrome (cards, badges) should use `Reveal variant="scale"` instead, so
 * photography and interface never share the same motion signature.
 */
export function ImageReveal({ children, className, delay = 0, margin = "-60px 0px" }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin })
  const reducedMotion = useReducedMotion()
  const variants = withReducedMotion(imageReveal(delay), reducedMotion)

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  )
}
