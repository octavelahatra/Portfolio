"use client"

import { Canvas } from "@react-three/fiber"
import type { MotionValue } from "framer-motion"
import { NodeNetwork } from "@/components/three/scenes/node-network"
import type { DeviceTier } from "@/hooks/use-device-tier"

type ActiveTier = Exclude<DeviceTier, "off">

interface WebGLSceneProps {
  tier: ActiveTier
  active: boolean
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  scrollProgress?: MotionValue<number>
}

// GPU cost knobs, one row per tier. "light"/"static" drop device pixel
// ratio to 1 and disable antialiasing — the two settings with the biggest
// fill-rate impact on integrated/mobile GPUs — well before touching
// geometry complexity (handled separately in node-network.tsx).
const GL_CONFIG: Record<ActiveTier, { dpr: [number, number]; antialias: boolean }> = {
  full: { dpr: [1, 1.5], antialias: true },
  light: { dpr: [1, 1], antialias: false },
  static: { dpr: [1, 1], antialias: false },
}

/**
 * The single <Canvas> the whole portfolio uses. Always code-split behind
 * `CanvasShell`'s dynamic import — never imported statically anywhere else.
 */
export default function WebGLScene({ tier, active, pointerX, pointerY, scrollProgress }: WebGLSceneProps) {
  const { dpr, antialias } = GL_CONFIG[tier]

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias, alpha: true, powerPreference: "low-power" }}
      // "static": render once on mount, then never again (no rAF loop at
      // all — the cheapest possible option, and the correct reduced-motion
      // behavior: a still image, not a hidden one).
      // "light"/"full": run continuously only while the scene is in the
      // viewport ("active"); otherwise stop the loop entirely rather than
      // rendering off-screen frames.
      frameloop={tier === "static" ? "demand" : active ? "always" : "never"}
      className="!absolute inset-0"
    >
      <NodeNetwork tier={tier} pointerX={pointerX} pointerY={pointerY} scrollProgress={scrollProgress} />
    </Canvas>
  )
}
