import { fadeReveal, scaleReveal, slideReveal, type SlideDirection } from "@/lib/motion"
import type { RevealVariant } from "./reveal"

/** Shared by `Reveal` and `StaggerItem` so both pick variants the exact
 *  same way — the whole point of the system is one definition, not two. */
export function buildRevealVariants(variant: RevealVariant, delay: number, distance?: number) {
  switch (variant) {
    case "fade":
      return fadeReveal(delay)
    case "scale":
      return scaleReveal(undefined, delay)
    case "slide-up":
    case "slide-down":
    case "slide-left":
    case "slide-right": {
      const direction = variant.replace("slide-", "") as SlideDirection
      return distance !== undefined ? slideReveal(direction, distance, delay) : slideReveal(direction, undefined, delay)
    }
  }
}
