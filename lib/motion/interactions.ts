import type { TargetAndTransition } from "framer-motion"
import { DURATION, EASE } from "./tokens"

/**
 * Standard hover lift for clickable surfaces that aren't already magnetic
 * (a card, a nav link's underline aside). Small on purpose — enough to read
 * as "this responds to you", never enough to feel like a bounce.
 */
export const HOVER_LIFT: TargetAndTransition = {
  y: -4,
  transition: { duration: DURATION.instant, ease: EASE.standard },
}

/** Standard press feedback for any tappable element. */
export const TAP_SCALE: TargetAndTransition = { scale: 0.98 }

/** Slightly stronger hover for large photographic surfaces (project/gallery
 *  thumbnails) — a bit of scale reads better than a lift at that size. */
export const HOVER_ZOOM: TargetAndTransition = {
  scale: 1.05,
  transition: { duration: 0.5, ease: EASE.standard },
}
