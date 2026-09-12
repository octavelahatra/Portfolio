import type { Transition, Variants } from "framer-motion"

/**
 * Collapses a `Variants` object's transitions to duration 0 under reduced
 * motion, while keeping every state's target values intact.
 *
 * This is the one correct way to make a *variants-based* reveal
 * reduced-motion-safe — never conditionally omit `initial`/`animate`
 * themselves (`reducedMotion ? undefined : {...}`). Toggling their
 * *presence* based on a flag that can still be resolving at mount (see
 * `useReducedMotion`, built on `useSyncExternalStore`) can freeze an
 * element on its hidden state forever if the flag flips right after mount:
 * once `animate` goes from a real target back to `undefined`, Framer Motion
 * has nothing telling it to move away from wherever it was. Keeping the
 * target defined and just zeroing the duration is instant either way and
 * can never get stuck.
 */
export function withReducedMotion(variants: Variants, reduced: boolean): Variants {
  if (!reduced) return variants
  const safe: Variants = {}
  for (const key of Object.keys(variants)) {
    const entry = variants[key]
    safe[key] = typeof entry === "object" ? { ...entry, transition: { duration: 0 } } : entry
  }
  return safe
}

/**
 * The equivalent fix for *direct* `animate={{...}}` objects (looping
 * ambient motion — a floating badge, a pulsing orb, a bouncing scroll dot).
 * Keeps the same animate target always defined; only the transition
 * changes, collapsing any repeat/duration to an instant no-op under
 * reduced motion instead of removing the animation (which would freeze the
 * element mid-loop) or removing the target (which would freeze it hidden).
 */
export function safeTransition(transition: Transition, reduced: boolean): Transition {
  if (!reduced) return transition
  return { duration: 0, repeat: 0 }
}

/**
 * For a looping `animate` target like `{ y: [0, -14, 0] }`: returns the
 * resting single value instead of the keyframe array under reduced motion,
 * paired with `safeTransition` for the transition. Use together:
 *
 * ```tsx
 * <motion.div
 *   animate={{ y: restingOrLoop([0, -14, 0], 0, reducedMotion) }}
 *   transition={safeTransition({ duration: 6, repeat: Infinity }, reducedMotion)}
 * />
 * ```
 */
export function restingOrLoop<T>(loopKeyframes: T[], restValue: T, reduced: boolean): T | T[] {
  return reduced ? restValue : loopKeyframes
}
