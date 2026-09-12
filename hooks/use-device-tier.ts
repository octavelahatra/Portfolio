"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useStaticCapability } from "@/hooks/use-static-capability"

export type DeviceTier = "full" | "light" | "static" | "off"

function hasWebGL(): boolean {
  if (typeof document === "undefined") return false
  try {
    const canvas = document.createElement("canvas")
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"))
  } catch {
    return false
  }
}

function isLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return true
  const cores = navigator.hardwareConcurrency ?? 4
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection
  const saveData = connection?.saveData ?? false
  const slowConnection = connection?.effectiveType ? /2g|3g/.test(connection.effectiveType) : false
  return cores <= 4 || saveData || slowConnection
}

/**
 * Classifies the visitor into a 3D rendering tier so the portfolio ships
 * ONE scene component that scales itself, instead of several bespoke WebGL
 * scenes for different devices. See components/three/README.md.
 *
 * - "full"   Desktop, fine pointer, capable hardware: full geometry,
 *            pointer tilt, scroll-linked depth, antialiasing.
 * - "light"  Touch/coarse pointer, narrow viewport, ≤4 cores, or a
 *            data-saver/slow connection: simplified geometry, a slower
 *            autorotate only (no pointer/scroll reactivity), no AA,
 *            dpr capped at 1 — a deliberately light version, not a removal.
 * - "static" `prefers-reduced-motion`: the scene still mounts (it's part of
 *            the portfolio's visual identity, not just decoration) but
 *            renders a single frame with no animation loop at all.
 * - "off"    No WebGL support: skip 3D entirely; callers fall back to
 *            whatever non-WebGL visual already sits behind it (for the
 *            Hero, the CSS aurora background + portrait).
 *
 * All inputs resolve through hydration-safe primitives (`useMediaQuery`,
 * `useStaticCapability`) biased toward the cheapest tier until resolved, so
 * the 3D layer only ever appears — it never flashes in and gets yanked.
 */
export function useDeviceTier(): DeviceTier {
  const reducedMotion = useReducedMotion()
  const isCoarseOrNarrow = useMediaQuery("(pointer: coarse), (max-width: 1023px)")
  const webglSupported = useStaticCapability(hasWebGL, false)
  const lowPowerDevice = useStaticCapability(isLowPowerDevice, true)

  if (!webglSupported) return "off"
  if (reducedMotion) return "static"
  if (isCoarseOrNarrow || lowPowerDevice) return "light"
  return "full"
}
