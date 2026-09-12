"use client"

import { Reveal } from "./reveal"

interface SectionHeadingProps {
  title: string
  eyebrow?: string
  className?: string
}

/**
 * The title + underline bar every section on the old site re-typed by hand
 * (`<h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">` +
 * a manually-sized gradient bar div). One definition, one reveal — a
 * section's heading is its "section transition": the signature beat that
 * announces a new part of the page as you scroll into it.
 */
export function SectionHeading({ title, eyebrow, className }: SectionHeadingProps) {
  return (
    <Reveal variant="slide-up" className={className}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary/80">{eyebrow}</p>
      ) : null}
      <h2 className="mb-4 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h2>
      <div className="h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
    </Reveal>
  )
}
