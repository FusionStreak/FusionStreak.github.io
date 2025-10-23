'use client'

import { useLenis } from 'lenis/react'

/**
 * Hook to access Lenis scroll instance and utilities
 * Use this in any component to control or react to scroll events
 *
 * @example
 * ```tsx
 * const { scrollTo, lenis } = useScrollLenis();
 *
 * // Scroll to element
 * scrollTo('#section-id');
 *
 * // Scroll to specific position
 * scrollTo(500);
 * ```
 */
export function useScrollLenis() {
  const lenis = useLenis()

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number
      duration?: number
      easing?: (t: number) => number
      immediate?: boolean
    },
  ) => {
    if (!lenis) return

    lenis.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration,
      easing: options?.easing,
      immediate: options?.immediate ?? false,
    })
  }

  const stop = () => lenis?.stop()
  const start = () => lenis?.start()

  return {
    lenis,
    scrollTo,
    stop,
    start,
  }
}
