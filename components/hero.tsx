"use client"

import { useScroll } from "framer-motion"
import { Mail, MessageCircle } from "lucide-react"
import { useRef } from "react"
import { AuroraBackground } from "@/components/hero/aurora-background"
import { HeroVisual } from "@/components/hero/hero-visual"
import { ScrollIndicator } from "@/components/hero/scroll-indicator"
import { MagneticButton } from "@/components/motion/magnetic-button"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { TextReveal } from "@/components/motion/text-reveal"
import { useInViewActive } from "@/hooks/use-in-view-active"
import { usePointerParallax } from "@/hooks/use-pointer-parallax"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { ref: viewRef, isActive } = useInViewActive<HTMLElement>()
  const { x: pointerX, y: pointerY } = usePointerParallax(sectionRef, { disabled: reducedMotion })
  // Drives the 3D scene's subtle scroll-linked spin (tier "full" only) —
  // progress from the section's top hitting the viewport top to its
  // bottom doing the same, i.e. 0 while freshly in view, 1 once scrolled past.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })

  return (
    <section
      id="home"
      ref={(node) => {
        sectionRef.current = node
        viewRef.current = node
      }}
      className="relative flex min-h-[calc(100svh)] items-center overflow-hidden pt-28 pb-20 lg:pt-24"
    >
      <AuroraBackground pointerX={pointerX} pointerY={pointerY} reducedMotion={reducedMotion} />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Text column */}
        <StaggerGroup stagger={0.12} className="order-2 lg:order-1">
          <StaggerItem className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Disponible pour de nouveaux projets
          </StaggerItem>

          <TextReveal
            text="Razafindrazaka Fitahinasoa Octave"
            as="h1"
            delay={0.15}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
          />

          <StaggerItem className="mt-6 max-w-xl text-balance font-mono text-sm uppercase tracking-[0.1em] text-primary/80 sm:text-base">
            Électronique appliquée · Informatique industrielle · Intelligence artificielle
          </StaggerItem>

          <StaggerItem className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Je conçois des systèmes qui relient le monde physique et le monde numérique — capteurs, objets connectés
            et intelligence artificielle — avec la même exigence à chaque étage.
          </StaggerItem>

          <StaggerItem className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#projects">Voir mes projets</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Me contacter
            </MagneticButton>
          </StaggerItem>

          <StaggerItem className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <a
              href="mailto:octavelahatra@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              octavelahatra@gmail.com
            </a>
            <a
              href="https://wa.me/261348672838"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              +261 34 86 728 38
            </a>
          </StaggerItem>
        </StaggerGroup>

        {/* Visual column */}
        <div className="order-1 lg:order-2">
          <HeroVisual
            pointerX={pointerX}
            pointerY={pointerY}
            scrollProgress={scrollYProgress}
            reducedMotion={reducedMotion}
            active={isActive}
          />
        </div>
      </div>

      <ScrollIndicator reducedMotion={reducedMotion} />
    </section>
  )
}
