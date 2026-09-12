"use client"

import { motion, type MotionValue } from "framer-motion"
import Image from "next/image"
import { Reveal } from "@/components/motion/reveal"
import { CanvasShell } from "@/components/three/canvas-shell"
import { useDeviceTier } from "@/hooks/use-device-tier"
import { restingOrLoop, safeTransition } from "@/lib/motion"

interface HeroVisualProps {
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  scrollProgress: MotionValue<number>
  reducedMotion: boolean
  active: boolean
}

/**
 * The Hero's right-hand visual: portrait + the portfolio's shared WebGL
 * scene (see components/three/README.md) behind it, scaled to the
 * visitor's device tier. Whatever the tier — including "off" — the
 * portrait + aurora background underneath is already a complete visual on
 * its own, so the 3D layer is purely additive and never load-bearing.
 */
export function HeroVisual({ pointerX, pointerY, scrollProgress, reducedMotion, active }: HeroVisualProps) {
  const tier = useDeviceTier()

  return (
    <Reveal variant="scale" delay={0.2} className="relative mx-auto aspect-square w-64 sm:w-80 lg:w-full lg:max-w-md">
      {tier !== "off" && (
        <CanvasShell
          tier={tier}
          active={active}
          pointerX={pointerX}
          pointerY={pointerY}
          scrollProgress={scrollProgress}
          className="absolute inset-[-20%]"
        />
      )}

      {/* Always keep a defined `animate` target — see lib/motion/reduced-motion.ts —
          so this never freezes mid-loop if `reducedMotion` flips after mount. */}
      <motion.div
        animate={{ y: restingOrLoop([0, -14, 0], 0, reducedMotion) }}
        transition={safeTransition({ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }, reducedMotion)}
        className="relative h-full w-full"
      >
        {/* Grounds the portrait: a soft dark shadow sits between the photo's
            faded edge and the cyan glow, so it reads as sitting in the
            scene rather than cutting straight into the bright glow. */}
        <div className="absolute -inset-[6%] rounded-full bg-black/55 blur-3xl" aria-hidden="true" />
        <div className="absolute -inset-[2%] rounded-full bg-black/45 blur-xl" aria-hidden="true" />
        <div
          className="absolute inset-4 rounded-full bg-primary/20 blur-2xl"
          aria-hidden="true"
        />
        <Image
          src="/profile.jpg"
          alt="Portrait de RAZAFINDRAZAKA Fitahinasoa Lahatra Octave"
          fill
          sizes="(min-width: 1024px) 28rem, (min-width: 640px) 20rem, 16rem"
          priority
          className="z-10 object-cover object-[50%_15%] [mask-image:radial-gradient(circle,black_35%,transparent_70%)]"
        />
      </motion.div>
    </Reveal>
  )
}
