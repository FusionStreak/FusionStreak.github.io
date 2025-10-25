'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import PixelSnakeGame from '@/components/pixel-snake-game'

// A small wrapper that listens for a secret sequence and opens a dialog with the snake game.
// New code: s n a k e Enter
const SECRET = ['s', 'n', 'a', 'k', 'e', 'Enter']

export default function BattlesnakeEasterEgg() {
  const [open, setOpen] = useState(false)
  const [ix, setIx] = useState(0)

  const instructions = useMemo(
    () => 'Hint: Type S N A K E then Enter anywhere on this page.',
    [],
  )

  useEffect(() => {
    const normalize = (k: string) => (k.length === 1 ? k.toLowerCase() : k)
    const onKey = (e: KeyboardEvent) => {
      const key = normalize(e.key)
      const expected = normalize(SECRET[ix])
      if (key === expected) {
        const next = ix + 1
        if (next >= SECRET.length) {
          // Prevent the Enter key (final step) from interacting with the dialog immediately.
          e.preventDefault()
          e.stopPropagation()
          // Open on next frame to let the key event fully resolve first.
          requestAnimationFrame(() => setOpen(true))
          setIx(0)
          return
        }
        setIx(next)
      } else {
        // If mismatch but current key could restart the sequence
        if (key === normalize(SECRET[0])) setIx(1)
        else setIx(0)
      }
    }
    const opts: AddEventListenerOptions = { capture: true }
    window.addEventListener('keydown', onKey, opts)
    return () => window.removeEventListener('keydown', onKey, opts)
  }, [ix])

  // One-time console hints to tease the easter egg (non-intrusive, styled).
  useEffect(() => {
    try {
      const title = '🕹 Hidden Fun'
      const sTitle =
        'background:#111;color:#B19EEF;padding:2px 8px;border-radius:6px;font-weight:700;'
      const sLine = 'color:#9ca3af'
      const sHot =
        'background:#1f2937;color:#e5e7eb;padding:1px 6px;border-radius:4px'
      // Grouped to keep console tidy; collapsed so it doesn’t spam.
      // Shown in both dev and prod—this is intentional for the easter egg.
      // Feel free to gate via NODE_ENV if you want it dev-only.
      console.groupCollapsed('%c' + title, sTitle)
      console.log('%cThere’s a tiny easter egg on this page.', sLine)
      console.log('Hint: type: %cS N A K E Enter', sHot)
      console.log('%cPsst: share the fun, not the secret 😉', sLine)
      console.groupEnd()
    } catch {
      // Ignore if console is unavailable
    }
  }, [])

  return (
    <>
      {/* Accessible-only hint for screen readers; visually hidden to keep it an easter egg */}
      <p className="sr-only" aria-live="polite">
        {instructions}
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-xl p-4 sm:p-6"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Pixel Snake</DialogTitle>
            <DialogDescription>
              Use arrow keys or WASD to move. Press Space to pause.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <PixelSnakeGame className="relative mx-auto aspect-square w-full max-w-[520px]" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
