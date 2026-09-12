"use client"

import { motion } from "framer-motion"
import { Fragment } from "react"
import { wordContainer, wordReveal, withReducedMotion } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3"
}

/**
 * Splits a short headline into words and reveals them in a stagger, each
 * word sliding up out of its own clipped box. Reserved for headline-length
 * copy only (a handful of words) — never body text; splitting a paragraph
 * into animated words reads as gimmicky and hurts reading flow.
 *
 * The full text is exposed to assistive tech via `aria-label` on the
 * container; the per-word spans are `aria-hidden` so nothing gets read
 * twice.
 */
export function TextReveal({ text, className, delay = 0, as = "h1" }: TextRevealProps) {
  const reducedMotion = useReducedMotion()
  const words = text.split(" ")
  const wordVariants = withReducedMotion(wordReveal, reducedMotion)

  const content = words.map((word, index) => (
    <Fragment key={index}>
      <span className="inline-block overflow-hidden pb-[0.15em] align-bottom" aria-hidden="true">
        <motion.span variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      </span>
      {/* Kept outside the clipped box — a space living inside an
          overflow-hidden inline-block can get trimmed at the box edge. */}
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ))

  const sharedProps = {
    className,
    variants: withReducedMotion(wordContainer(0.08, delay), reducedMotion),
    initial: "hidden" as const,
    animate: "visible" as const,
    "aria-label": text,
  }

  if (as === "h2") return <motion.h2 {...sharedProps}>{content}</motion.h2>
  if (as === "h3") return <motion.h3 {...sharedProps}>{content}</motion.h3>
  return <motion.h1 {...sharedProps}>{content}</motion.h1>
}
