'use client'

import { useState, useEffect } from 'react'
import { quotes } from '@/app/quotes/quotes'

const INTERVAL_MS = 6000
const FADE_MS = 400

export function RotatingQuotes() {
  const [current, setCurrent] = useState(() =>
    Math.floor(Math.random() * quotes.length),
  )
  const [visible, setVisible] = useState(true)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % quotes.length)
        setVisible(true)
      }, FADE_MS)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [paused])

  const quote = quotes[current]

  return (
    <div
      className="border-border/20 w-full border-t pt-3 pb-1 text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease`,
        }}
      >
        <p
          className={`text-sm italic transition-colors duration-300 ${paused ? 'text-foreground/80' : 'text-muted-foreground/60'}`}
        >
          &ldquo;{quote.text}&rdquo;
        </p>
        <p
          className={`mt-0.5 text-sm transition-colors duration-300 ${paused ? 'text-muted-foreground' : 'text-muted-foreground/40'}`}
        >
          &mdash; {quote.author}
        </p>
      </div>
    </div>
  )
}
