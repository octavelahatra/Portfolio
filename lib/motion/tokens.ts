/**
 * Canonical motion tokens. Every animation in the app picks a value from
 * here — nobody invents a one-off duration, easing curve, or travel
 * distance in a component. That's what kept every section on the old site
 * animating slightly differently for no reason.
 */

/** Named easing curves. Pick the nearest match; don't add a fourth. */
export const EASE = {
  /** Expo-out — fast start, soft settle. The default for one-shot entrances
   *  (reveals): it reads as "arriving", not "sliding". */
  out: [0.16, 1, 0.3, 1],
  /** Symmetric ease — for motion that goes both ways (open/close, toggle). */
  inOut: [0.65, 0, 0.35, 1],
  /** General-purpose UI easing — hover states, color/opacity micro-transitions. */
  standard: [0.4, 0, 0.2, 1],
} as const

/** Durations in seconds. Four tiers, nothing in between. */
export const DURATION = {
  /** Micro-feedback: hover/focus color or opacity changes. */
  instant: 0.15,
  /** Small UI transitions: toggles, tooltips, button taps. */
  fast: 0.3,
  /** Default entrance reveal — the one most content should use. */
  base: 0.5,
  /** Large/hero-scale entrances only. */
  slow: 0.8,
} as const

/** Travel distance for slide reveals, in px. Small on purpose — this reads
 *  as a settle, not a fly-in. A section is not a toast notification. */
export const DISTANCE = {
  sm: 12,
  md: 24,
  lg: 48,
} as const

/** Spring config for pointer-follow effects (magnetic buttons, cursor). One
 *  spring feel across the whole app so every "follows the pointer" element
 *  moves with the same weight. */
export const POINTER_SPRING = { stiffness: 150, damping: 15, mass: 0.2 } as const

/** Spring config for slower ambient parallax (scroll/mouse background layers) —
 *  more damped, so it trails calmly instead of chasing the cursor. */
export const PARALLAX_SPRING = { stiffness: 60, damping: 20 } as const
