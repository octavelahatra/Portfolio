"use client"

import type { MotionValue } from "framer-motion"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { CanvasErrorBoundary } from "@/components/three/canvas-error-boundary"
import type { DeviceTier } from "@/hooks/use-device-tier"

// The ONLY static import path to the actual <Canvas>. Everything that pulls
// in "three" / "@react-three/fiber" lives behind this one dynamic import, so
// visitors who never qualify for 3D (tier "off") never fetch that code —
// see components/three/README.md for the full chunk-boundary rationale.
const WebGLScene = dynamic(() => import("./webgl-scene"), { ssr: false })

interface CanvasShellProps {
  tier: Exclude<DeviceTier, "off">
  active: boolean
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  scrollProgress?: MotionValue<number>
  className?: string
}

/**
 * Generic mount point for the portfolio's one WebGL scene. Any section that
 * wants the 3D signature element reuses this shell — with its own
 * `tier`/`active`/pointer values — instead of hand-rolling another
 * <Canvas>. Purely presentational: no three.js import here, so importing
 * this file elsewhere costs nothing until it actually renders.
 *
 * Decorative only (`aria-hidden`): the canvas never carries information
 * that isn't already present in the surrounding markup.
 */
export function CanvasShell({ tier, active, pointerX, pointerY, scrollProgress, className }: CanvasShellProps) {
  return (
    <div className={className} aria-hidden="true">
      <CanvasErrorBoundary>
        {/* Suspense fallback is `null` deliberately: whatever sits behind
            this layer (portrait + aurora, in the Hero) already reads as a
            complete, non-blocking visual on its own while the chunk loads
            or if it never loads at all. No spinner, no layout shift. */}
        <Suspense fallback={null}>
          <WebGLScene tier={tier} active={active} pointerX={pointerX} pointerY={pointerY} scrollProgress={scrollProgress} />
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  )
}
