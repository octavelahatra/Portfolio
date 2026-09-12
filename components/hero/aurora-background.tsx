"use client"

import { motion, useTransform, type MotionValue } from "framer-motion"
import { restingOrLoop, safeTransition } from "@/lib/motion"

interface AuroraBackgroundProps {
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  reducedMotion: boolean
}

/**
 * Tier-1 depth layer: three soft, blurred gradient orbs that drift slowly
 * and lean subtly toward the pointer. Pure CSS/DOM — no canvas, no WebGL —
 * so it's always on, costs almost nothing, and is the accessible fallback
 * for the optional 3D scene (HeroScene3D).
 */
export function AuroraBackground({ pointerX, pointerY, reducedMotion }: AuroraBackgroundProps) {
  const signalX = useTransform(pointerX, [-1, 1], [-24, 24])
  const signalY = useTransform(pointerY, [-1, 1], [-16, 16])
  const nebulaX = useTransform(pointerX, [-1, 1], [18, -18])
  const nebulaY = useTransform(pointerY, [-1, 1], [12, -12])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* `animate`/`style` stay defined at all times — see lib/motion/reduced-motion.ts:
          under reduced motion the target simply equals the resting state, so a
          mid-mount preference change settles instead of freezing mid-loop. */}
      <motion.div
        className="absolute top-[-10%] right-[-5%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(0,212,255,0.28)_0%,_transparent_70%)] blur-3xl"
        style={{ x: signalX, y: signalY }}
        animate={{ scale: restingOrLoop([1, 1.08, 1], 1, reducedMotion) }}
        transition={safeTransition({ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }, reducedMotion)}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[-8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.22)_0%,_transparent_70%)] blur-3xl"
        style={{ x: nebulaX, y: nebulaY }}
        animate={{ scale: restingOrLoop([1, 1.1, 1], 1, reducedMotion) }}
        transition={safeTransition(
          { duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 },
          reducedMotion,
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,14,39,0.6)_100%)]" />
      {/* Fine noise/grain overlay for a tactile, premium finish */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
