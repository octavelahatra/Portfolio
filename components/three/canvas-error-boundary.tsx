"use client"

import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Swallows any WebGL/Three.js runtime failure (context creation refused by
 * the GPU/driver blocklist, a lost context, …) so it silently falls back
 * to whatever sits behind the canvas — the Hero's portrait + aurora
 * background — instead of taking the whole section down.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[three] WebGL scene failed, falling back silently:", error)
    }
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}
