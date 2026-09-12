"use client"

import { motion } from "framer-motion"
import type { ReactElement } from "react"
import { cloneElement } from "react"
import { useMagnetic } from "@/hooks/use-magnetic"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface MagneticProps {
  children: ReactElement
  strength?: number
  className?: string
}

/**
 * Generic magnetic-follow wrapper — decouples the *behavior* from any
 * particular button's styling. Wrap any single interactive element:
 *
 * ```tsx
 * <Magnetic><Link href="#projects" className="btn-primary">Voir mes projets</Link></Magnetic>
 * ```
 *
 * The wrapped element keeps its own tag, styling and semantics; `Magnetic`
 * only attaches the pointer handlers and the spring offset. See
 * `MagneticButton` for the ready-styled convenience version used by CTAs.
 */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const reducedMotion = useReducedMotion()
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic<HTMLElement>({ strength, disabled: reducedMotion })

  return (
    <motion.div style={{ x, y }} className={className ?? "inline-block"}>
      {cloneElement(children, { ref, onPointerMove, onPointerLeave } as Record<string, unknown>)}
    </motion.div>
  )
}
