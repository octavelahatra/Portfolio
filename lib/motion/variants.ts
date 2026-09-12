import type { Variants } from "framer-motion"
import { DISTANCE, DURATION, EASE } from "./tokens"

/**
 * Reveal variants. Each one exists for a distinct reason — pick by intent,
 * not by taste:
 *
 * - fadeReveal   the element's position already makes sense; announcing its
 *                arrival would be noise. Use for text that sits in its
 *                final reading position (paragraphs, labels).
 * - slideReveal  communicates *where content comes from* — reserve the
 *                direction for something it actually means (a value moving
 *                up out of a list, a panel from a side). Distance is small
 *                on purpose: a settle, not a fly-in.
 * - scaleReveal  the element should feel like it's arriving toward the
 *                viewer — cards, badges, the Hero portrait. Never a whole
 *                section (that reads as a modal opening, which it isn't).
 * - imageReveal  a photo "coming into focus" rather than popping in —
 *                starts slightly zoomed, settles to 1. Distinct from
 *                scaleReveal's zoom-in-from-smaller so photography and UI
 *                chrome never share the exact same motion signature.
 */

export function fadeReveal(delay = 0): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE.out, delay } },
  }
}

export type SlideDirection = "up" | "down" | "left" | "right"

export function slideReveal(direction: SlideDirection = "up", distance: number = DISTANCE.md, delay = 0): Variants {
  const offset = direction === "up" || direction === "left" ? distance : -distance
  const transition = { duration: DURATION.base, ease: EASE.out, delay }
  const isVertical = direction === "up" || direction === "down"

  return isVertical
    ? {
        hidden: { opacity: 0, y: offset },
        visible: { opacity: 1, y: 0, transition },
      }
    : {
        hidden: { opacity: 0, x: offset },
        visible: { opacity: 1, x: 0, transition },
      }
}

export function scaleReveal(from = 0.94, delay = 0): Variants {
  return {
    hidden: { opacity: 0, scale: from },
    visible: { opacity: 1, scale: 1, transition: { duration: DURATION.base, ease: EASE.out, delay } },
  }
}

export function imageReveal(delay = 0): Variants {
  return {
    hidden: { opacity: 0, scale: 1.08 },
    visible: { opacity: 1, scale: 1, transition: { duration: DURATION.slow, ease: EASE.out, delay } },
  }
}

/**
 * Wraps any of the above so a group of children reveal in sequence instead
 * of all at once — reinforcing that they're one related set (a grid of
 * cards, a list of skills), not sixteen independent elements that happen to
 * animate at the same time.
 */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  }
}

/** Per-word reveal target for `TextReveal`. Reserved for headline-length
 *  copy (a handful of words) — never body text; see components/motion/text-reveal.tsx. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%", transition: { duration: DURATION.slow, ease: EASE.out } },
}

export function wordContainer(stagger = 0.05, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  }
}
