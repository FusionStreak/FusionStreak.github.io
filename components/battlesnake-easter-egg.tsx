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
          e.preventDefault()
          e.stopPropagation()
          requestAnimationFrame(() => setOpen(true))
          setIx(0)
          return
        }
        setIx(next)
      } else {
        if (key === normalize(SECRET[0])) setIx(1)
        else setIx(0)
      }
    }
    const opts: AddEventListenerOptions = { capture: true }
    window.addEventListener('keydown', onKey, opts)
    return () => window.removeEventListener('keydown', onKey, opts)
  }, [ix])

  // Console hint
  useEffect(() => {
    try {
      const sTitle =
        'background:#111;color:#f54a00;padding:2px 8px;border-radius:6px;font-weight:700;'
      const sLine = 'color:#9ca3af'
      const sHot =
        'background:#1f2937;color:#e5e7eb;padding:1px 6px;border-radius:4px'
      console.groupCollapsed('%c\uD83D\uDC0D Hidden Fun', sTitle)
      console.log('%cThere\u2019s a tiny easter egg on this page.', sLine)
      console.log('Hint: type %cS N A K E Enter', sHot)
      console.log('%cPsst: share the fun, not the secret \uD83D\uDE09', sLine)
      console.groupEnd()
    } catch {
      /* noop */
    }
  }, [])

  return (
    <>
      <p className="sr-only" aria-live="polite">
        {instructions}
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-h-[95dvh] w-[calc(100%-1rem)] max-w-2xl overflow-hidden p-3 sm:p-5"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader className="gap-0.5">
            <DialogTitle className="flex items-center gap-2 text-base">
              <span
                className="inline-block size-3 rounded-sm"
                style={{ background: '#f54a00' }}
                aria-hidden
              />
              FusionSnake
            </DialogTitle>
            <DialogDescription className="text-xs">
              Arrow keys / WASD to move &middot; Space to pause &middot; Swipe
              on mobile
            </DialogDescription>
          </DialogHeader>
          <PixelSnakeGame className="relative mx-auto aspect-square w-full max-w-[min(65dvh,560px)]" />
        </DialogContent>
      </Dialog>
    </>
  )
}
