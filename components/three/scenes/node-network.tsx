"use client"

import { useFrame } from "@react-three/fiber"
import type { MotionValue } from "framer-motion"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import type { DeviceTier } from "@/hooks/use-device-tier"

type ActiveTier = Exclude<DeviceTier, "off">

// Icosahedron subdivision level per tier. This is the explicit particle/
// vertex budget for the scene: detail 1 → 42 vertices / ~120 edges (desktop
// "full"); detail 0 → 12 vertices / 30 edges (mobile "light" and "static").
// Never scales beyond "full" — this is a signature accent, not a particle system.
const GEOMETRY_DETAIL: Record<ActiveTier, number> = { full: 1, light: 0, static: 0 }

interface NodeNetworkProps {
  tier: ActiveTier
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  scrollProgress?: MotionValue<number>
}

/**
 * The portfolio's signature 3D element: an icosahedral node-and-edge
 * lattice — a deliberate nod to a PCB / sensor-network topology rather than
 * a stock "spinning shape". Wireframe edges + glowing vertex points, a slow
 * autonomous rotation, and (tier "full" only) a gentle lean toward the
 * pointer plus a touch of extra spin tied to scroll progress.
 */
export function NodeNetwork({ tier, pointerX, pointerY, scrollProgress }: NodeNetworkProps) {
  const group = useRef<THREE.Group>(null)
  const reactsToPointer = tier === "full"

  const { edgesGeometry, pointsGeometry } = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(1.7, GEOMETRY_DETAIL[tier])
    return { edgesGeometry: new THREE.EdgesGeometry(base), pointsGeometry: base }
  }, [tier])

  useFrame((_, delta) => {
    const node = group.current
    // "static" (prefers-reduced-motion) renders one frame via
    // frameloop="demand" at the Canvas level and never loops — this guard
    // is just a cheap safety net for the rare on-demand re-render (resize).
    if (!node || tier === "static") return

    const speed = tier === "full" ? 1 : 0.5 // calmer, cheaper autorotate on "light"
    node.rotation.y += delta * 0.12 * speed
    node.rotation.x += delta * 0.03 * speed

    if (reactsToPointer) {
      const targetTiltX = pointerY.get() * 0.25
      const targetTiltZ = pointerX.get() * -0.2
      node.rotation.x = THREE.MathUtils.damp(node.rotation.x, node.rotation.x + targetTiltX * 0.05, 4, delta)
      node.rotation.z = THREE.MathUtils.damp(node.rotation.z, targetTiltZ, 4, delta)

      if (scrollProgress) {
        // Subtle scroll-linked depth: as the section scrolls by, the
        // lattice keeps turning a little faster — reinforcing depth
        // without pinning the section or fighting native scroll.
        node.rotation.y += scrollProgress.get() * delta * 0.12
      }
    }
  })

  return (
    <group ref={group}>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#00d4ff" transparent opacity={tier === "full" ? 0.55 : 0.4} />
      </lineSegments>
      <points geometry={pointsGeometry}>
        <pointsMaterial color="#7c3aed" size={0.06} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  )
}
