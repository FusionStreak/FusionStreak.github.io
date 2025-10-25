'use client'

import React, { useEffect, useRef, useState } from 'react'

type PixelSnakeGameProps = {
  className?: string
  gridSize?: number // number of cells per side (square grid)
  tickMs?: number // game tick speed in ms
  snakeColor?: string
  foodColor?: string
  backgroundColor?: string
  wallColor?: string
}

type Vec = { x: number; y: number }

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

export function PixelSnakeGame({
  className,
  gridSize = 20,
  tickMs = 110,
  snakeColor = '#22c55e',
  foodColor = '#ef4444',
  backgroundColor = '#0b0b0c',
  wallColor = '#1f2937',
}: PixelSnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [score, setScore] = useState(0)
  const [high, setHigh] = useState<number>(() => {
    if (typeof window === 'undefined') return 0
    const s = window.localStorage.getItem('pixel-snake-high')
    return s ? Number(s) : 0
  })
  const [alive, setAlive] = useState(true)
  const dirRef = useRef<Vec>({ x: 1, y: 0 })
  const nextDirRef = useRef<Vec>({ x: 1, y: 0 })
  const snakeRef = useRef<Vec[]>([])
  const foodRef = useRef<Vec>({ x: 10, y: 10 })
  const lastTimeRef = useRef<number>(0)
  const accRef = useRef<number>(0)
  const pausedRef = useRef<boolean>(false)

  // Initialize game
  useEffect(() => {
    resetGame()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P' || e.key === ' ') {
        pausedRef.current = !pausedRef.current
        return
      }
      if (!alive) {
        if (e.key === 'r' || e.key === 'R' || e.key === 'Enter') resetGame()
        return
      }
      const k = e.key
      // Prevent reversing directly
      const cur = nextDirRef.current
      if (k === 'ArrowUp' || k === 'w' || k === 'W') {
        if (cur.y !== 1) nextDirRef.current = { x: 0, y: -1 }
      } else if (k === 'ArrowDown' || k === 's' || k === 'S') {
        if (cur.y !== -1) nextDirRef.current = { x: 0, y: 1 }
      } else if (k === 'ArrowLeft' || k === 'a' || k === 'A') {
        if (cur.x !== 1) nextDirRef.current = { x: -1, y: 0 }
      } else if (k === 'ArrowRight' || k === 'd' || k === 'D') {
        if (cur.x !== -1) nextDirRef.current = { x: 1, y: 0 }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alive])

  // Render + game loop
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')!
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2)

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const size = Math.floor(Math.min(rect.width, rect.height))
      // Maintain a square canvas
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      canvas.width = Math.floor(size * dpr)
      canvas.height = Math.floor(size * dpr)
    }
    resize()

    const ro = new ResizeObserver(() => resize())
    ro.observe(container)

    const step = (dt: number) => {
      if (pausedRef.current || !alive) return
      accRef.current += dt
      if (accRef.current < tickMs) return
      accRef.current = 0
      dirRef.current = nextDirRef.current
      const head = snakeRef.current[0]
      const nx = head.x + dirRef.current.x
      const ny = head.y + dirRef.current.y
      // Wall collision
      if (nx < 0 || ny < 0 || nx >= gridSize || ny >= gridSize) {
        setAlive(false)
        persistHigh()
        return
      }
      // Self collision
      if (snakeRef.current.some((s) => s.x === nx && s.y === ny)) {
        setAlive(false)
        persistHigh()
        return
      }
      // Move
      snakeRef.current.unshift({ x: nx, y: ny })
      // Eat?
      if (nx === foodRef.current.x && ny === foodRef.current.y) {
        setScore((v) => {
          const nv = v + 1
          if (nv > high) setHigh(nv)
          return nv
        })
        placeFood()
      } else {
        snakeRef.current.pop()
      }
    }

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      const cell = Math.floor(Math.min(w, h) / gridSize)
      const padX = Math.floor((w - cell * gridSize) / 2)
      const padY = Math.floor((h - cell * gridSize) / 2)

      // Background
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, w, h)

      // Grid background with subtle walls frame
      ctx.fillStyle = wallColor
      ctx.fillRect(padX - 2, padY - 2, cell * gridSize + 4, cell * gridSize + 4)

      // Checkerboard
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          if ((x + y) % 2 === 0) {
            ctx.fillStyle = '#0f1012'
          } else {
            ctx.fillStyle = '#121317'
          }
          ctx.fillRect(padX + x * cell, padY + y * cell, cell, cell)
        }
      }

      // Food
      ctx.fillStyle = foodColor
      roundedRect(
        ctx,
        padX + foodRef.current.x * cell + 2,
        padY + foodRef.current.y * cell + 2,
        cell - 4,
        cell - 4,
        Math.floor(cell / 5),
      )
      ctx.fill()

      // Snake
      ctx.fillStyle = snakeColor
      snakeRef.current.forEach((s, i) => {
        const r = i === 0 ? Math.floor(cell / 3) : Math.floor(cell / 5)
        roundedRect(
          ctx,
          padX + s.x * cell + 2,
          padY + s.y * cell + 2,
          cell - 4,
          cell - 4,
          r,
        )
        ctx.fill()
      })

      // Score text
      ctx.fillStyle = '#e5e7eb'
      ctx.font = `${12 * dpr}px ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx.textAlign = 'left'
      ctx.fillText(`Score: ${score}`, 10 * dpr, 18 * dpr)
      ctx.textAlign = 'right'
      ctx.fillText(`Best: ${high}`, w - 10 * dpr, 18 * dpr)

      if (!alive) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)'
        ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.font = `${16 * dpr}px ui-sans-serif, system-ui, -apple-system`
        ctx.fillText('Game Over', w / 2, h / 2 - 10 * dpr)
        ctx.font = `${12 * dpr}px ui-sans-serif, system-ui, -apple-system`
        ctx.fillText('Press R or Enter to restart', w / 2, h / 2 + 12 * dpr)
      }
    }

    let raf = 0
    const loop = (t: number) => {
      const dt = t - lastTimeRef.current
      lastTimeRef.current = t
      step(dt)
      draw()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gridSize,
    tickMs,
    snakeColor,
    foodColor,
    wallColor,
    backgroundColor,
    score,
    high,
    alive,
  ])

  const roundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) => {
    r = Math.min(r, Math.floor(Math.min(w, h) / 2))
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }

  const persistHigh = () => {
    setHigh((h) => {
      const v = Math.max(h, score)
      if (typeof window !== 'undefined')
        window.localStorage.setItem('pixel-snake-high', String(v))
      return v
    })
  }

  const resetGame = () => {
    setAlive(true)
    setScore(0)
    dirRef.current = { x: 1, y: 0 }
    nextDirRef.current = { x: 1, y: 0 }
    const start = { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) }
    snakeRef.current = [start, { x: start.x - 1, y: start.y }]
    placeFood()
    accRef.current = 0
    lastTimeRef.current = performance.now()
  }

  const placeFood = () => {
    const occ = new Set(snakeRef.current.map((s) => `${s.x},${s.y}`))
    let fx = 0
    let fy = 0
    do {
      fx = Math.floor(Math.random() * gridSize)
      fy = Math.floor(Math.random() * gridSize)
    } while (occ.has(`${fx},${fy}`))
    foodRef.current = { x: fx, y: fy }
  }

  return (
    <div
      ref={containerRef}
      className={
        className ?? 'relative mx-auto aspect-square w-full max-w-[480px]'
      }
      aria-label="Pixel Snake Game"
    >
      <canvas
        ref={canvasRef}
        className="border-border block rounded-md border shadow-sm"
      />
      <div className="text-muted-foreground pointer-events-none absolute top-3 left-3 text-xs select-none">
        Arrows / WASD to move • Space to pause
      </div>
    </div>
  )
}

export default PixelSnakeGame
