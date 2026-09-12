"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { ReactNode } from "react"
import { useMagnetic } from "@/hooks/use-magnetic"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  href: string
  children: ReactNode
  variant?: "primary" | "secondary"
  className?: string
}

/**
 * The portfolio's one CTA treatment (see components/motion/README.md's
 * consistency rules) with the magnetic hover built in. Every primary/
 * secondary call-to-action should use this instead of a one-off styled
 * `<a>` — that's how the old site ended up with a slightly different
 * button style per section.
 */
export function MagneticButton({ href, children, variant = "primary", className }: MagneticButtonProps) {
  const reducedMotion = useReducedMotion()
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic<HTMLAnchorElement>({ disabled: reducedMotion })

  return (
    <motion.div style={{ x, y }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]",
          variant === "primary"
            ? "bg-primary text-primary-foreground hover:shadow-[0_0_40px_-8px_var(--primary)]"
            : "border border-primary/30 text-foreground hover:border-primary/60 hover:bg-primary/5",
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  )
}
