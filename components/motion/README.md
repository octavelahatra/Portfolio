# Motion Design System

One vocabulary of animation for the whole portfolio. No section defines its
own `containerVariants`/`itemVariants`, its own easing curve, or its own
magnetic-button spring — everything below is the reusable version of a
pattern the old site used to reinvent per file.

## Layers

```
lib/motion/
  tokens.ts         EASE, DURATION, DISTANCE, springs — the only place a
                     duration or easing curve is a literal number
  variants.ts        fadeReveal, slideReveal, scaleReveal, imageReveal,
                     staggerContainer, wordReveal — the reveal vocabulary
  interactions.ts     HOVER_LIFT, TAP_SCALE, HOVER_ZOOM
  reduced-motion.ts   withReducedMotion / safeTransition / restingOrLoop

components/motion/
  reveal.tsx           <Reveal variant="fade|slide-*|scale">  — one element
  stagger-group.tsx     <StaggerGroup><StaggerItem/>…</StaggerGroup> — a set
  text-reveal.tsx        <TextReveal text="…"/>  — headline word-reveal
  image-reveal.tsx        <ImageReveal>  — photo "coming into focus"
  section-heading.tsx      <SectionHeading title eyebrow/>  — the
                           eyebrow+title+underline every section repeated
  magnetic.tsx / magnetic-button.tsx   pointer-follow CTA
  tilt-card.tsx             project/gallery card interaction
  cursor-follower.tsx        optional global custom cursor (opt-in)
  parallax.tsx                decorative scroll-linked depth
  page-transition.tsx          route-change fade, mounted in app/layout.tsx

hooks/
  use-reduced-motion.ts, use-media-query.ts, use-static-capability.ts
  use-magnetic.ts, use-scroll-parallax.ts, use-in-view-active.ts
```

## Picking a pattern

| I need to… | Use |
|---|---|
| Reveal one element as it scrolls into view | `<Reveal variant="…">` |
| Reveal a grid/list where the group matters | `<StaggerGroup>` + `<StaggerItem>` |
| Reveal a headline (few words) | `<TextReveal>` |
| Reveal a photo/thumbnail | `<ImageReveal>` (place inside the element that already clips it) |
| Give a section its title | `<SectionHeading>` |
| A CTA that leans toward the pointer | `<MagneticButton>` (styled) or `<Magnetic>` (wrap your own element) |
| A project/gallery card | `<TiltCard>` |
| A decorative background layer that drifts with scroll | `<Parallax>` |
| A looping ambient animation (float, pulse, bounce) | plain `motion.*` + `restingOrLoop`/`safeTransition` from `lib/motion` — there's no `<Loop>` component because every instance has different keyframes; the helpers are what keep it reduced-motion-safe |

If none of these fit, that's a sign to add one more variant to `lib/motion/variants.ts`, not to hand-write a new `motion.div` with its own numbers.

## Rules that keep every section consistent

1. **No literal durations/easings in a component.** Import from `lib/motion`. A number typed directly into a `transition` prop outside `lib/motion/*` is a bug waiting to drift from everything else.
2. **Variants-based reveals never toggle `initial`/`animate` to `undefined` based on `reducedMotion`.** Use `withReducedMotion(variants, reducedMotion)` — it keeps every target defined and just zeroes the duration. Toggling presence can freeze an element on its hidden state if the flag resolves after mount (see `lib/motion/reduced-motion.ts` for the full explanation of the bug this avoids).
3. **Looping ambient `animate={{...}}` objects use `restingOrLoop` + `safeTransition`**, never a hand-written `reducedMotion ? undefined : {...}` ternary — same freeze risk as above, one level lower.
4. **One reveal trigger per group.** A grid uses one `StaggerGroup`, not N independent `Reveal`s — N viewport observers for one visual event is wasted work and can desync.
5. **Pointer-driven effects (`Magnetic`, `TiltCard`, `CursorFollower`) are mouse-only** (`pointerType === "mouse"` / `pointer: fine`) and check `useReducedMotion()` — touch devices and reduced-motion visitors get the plain, static element with normal CSS `:hover`/`:active`, never a broken half-tracked state.
6. **Parallax is for decoration only**, never body copy — see `useScrollParallax`'s doc comment. It reads scroll progress and offsets a transform; it never intercepts the scroll gesture itself (no scroll-jacking).
7. **`TextReveal` is for headline-length copy only** (a handful of words) — splitting a paragraph into animated words hurts reading flow.
8. **Every reveal has a `once` default of true.** An element should announce its arrival once, not replay every time it scrolls back into view — that reads as nervous, not premium. Pass `loop` explicitly for the rare exception.
9. **No new dependency for an effect Framer Motion already covers.** The 3D system (`components/three/`) is the one exception, reserved for the signature WebGL element — see its own README for why that boundary exists.

## Accessibility & performance baseline every pattern here already satisfies

- `prefers-reduced-motion` is checked once per hook/component via `useReducedMotion()` (built on `useSyncExternalStore` — no hydration-mismatch risk, no flash-then-correct).
- Nothing here scroll-jacks: `Parallax`/`useScrollParallax` read `scrollYProgress`, they never call `preventDefault()` on wheel/touch or pin the page.
- Magnetic/tilt/cursor effects are inert (no listeners attached at all, not just visually static) on touch and under reduced motion — not extra CPU spent computing a transform nobody sees move.
- `TiltCard`'s rotation is capped small (default 6°) and `MagneticButton`'s offset is capped by its spring's travel — neither pattern here uses a bounce/overshoot easing; entrances always ease *out* (decelerate into rest).
