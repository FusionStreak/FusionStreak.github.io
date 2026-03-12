'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

type PixelSnakeGameProps = {
  className?: string
  gridSize?: number
  tickMs?: number
  snakeColor?: string
  foodColor?: string
  headType?: string
  tailType?: string
}

type Vec = { x: number; y: number }

const BG = '#0a0a0b'
const GRID_A = '#0e0f11'
const GRID_B = '#111215'
const WALL = '#1a1d24'
const FOOD_COLOR = '#facc15'
const SWIPE_MIN = 20

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

/** Fetch a Battlesnake SVG from the media CDN, parse its inner content,
 *  wrap it in a filled <svg>, and return an HTMLImageElement. */
async function loadSnakeSvg(
  type: 'head' | 'tail',
  name: string,
  color: string,
): Promise<HTMLImageElement | null> {
  try {
    const url = `https://media.battlesnake.com/snakes/${type}s/${name}.svg`
    const res = await fetch(url)
    if (!res.ok) return null
    const text = await res.text()
    const tpl = document.createElement('template')
    tpl.innerHTML = text.trim()
    const root = tpl.content.firstChild as HTMLElement | null
    if (!root) return null
    const inner = root.innerHTML
    const blob = new Blob(
      [
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="${color}">${inner}</svg>`,
      ],
      { type: 'image/svg+xml' },
    )
    const blobUrl = URL.createObjectURL(blob)
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        URL.revokeObjectURL(blobUrl)
        resolve(img)
      }
      img.onerror = () => {
        URL.revokeObjectURL(blobUrl)
        resolve(null)
      }
      img.src = blobUrl
    })
  } catch {
    return null
  }
}

export function PixelSnakeGame({
  className,
  gridSize = 20,
  tickMs = 110,
  snakeColor = '#f54a00',
  foodColor = FOOD_COLOR,
  headType = 'pixel-round',
  tailType = 'mlh-gene',
}: PixelSnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const headImgRef = useRef<HTMLImageElement | null>(null)
  const tailImgRef = useRef<HTMLImageElement | null>(null)
  const [score, setScore] = useState(0)
  const [high, setHigh] = useState<number>(() => {
    if (typeof window === 'undefined') return 0
    const s = window.localStorage.getItem('pixel-snake-high')
    return s ? Number(s) : 0
  })
  const [alive, setAlive] = useState(true)
  const [paused, setPaused] = useState(false)
  const dirRef = useRef<Vec>({ x: 1, y: 0 })
  const nextDirRef = useRef<Vec>({ x: 1, y: 0 })
  const snakeRef = useRef<Vec[]>([])
  const foodRef = useRef<Vec>({ x: 10, y: 10 })
  const lastTimeRef = useRef<number>(0)
  const accRef = useRef<number>(0)
  const pausedRef = useRef(false)
  const aliveRef = useRef(true)
  const scoreRef = useRef(0)
  const highRef = useRef(high)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  // Keep refs in sync with state
  useEffect(() => {
    pausedRef.current = paused
  }, [paused])
  useEffect(() => {
    aliveRef.current = alive
  }, [alive])
  useEffect(() => {
    scoreRef.current = score
  }, [score])
  useEffect(() => {
    highRef.current = high
  }, [high])

  // Load Battlesnake SVGs
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const [h, t] = await Promise.all([
        loadSnakeSvg('head', headType, snakeColor),
        loadSnakeSvg('tail', tailType, snakeColor),
      ])
      if (cancelled) return
      headImgRef.current = h
      tailImgRef.current = t
    })()
    return () => {
      cancelled = true
    }
  }, [headType, tailType, snakeColor])

  const persistHigh = useCallback(() => {
    setHigh((prev) => {
      const v = Math.max(prev, scoreRef.current)
      if (typeof window !== 'undefined')
        window.localStorage.setItem('pixel-snake-high', String(v))
      return v
    })
  }, [])

  const placeFood = useCallback(() => {
    const occ = new Set(snakeRef.current.map((s) => `${s.x},${s.y}`))
    let fx: number, fy: number
    do {
      fx = Math.floor(Math.random() * gridSize)
      fy = Math.floor(Math.random() * gridSize)
    } while (occ.has(`${fx},${fy}`))
    foodRef.current = { x: fx, y: fy }
  }, [gridSize])

  const resetGame = useCallback(() => {
    setAlive(true)
    setScore(0)
    setPaused(false)
    dirRef.current = { x: 1, y: 0 }
    nextDirRef.current = { x: 1, y: 0 }
    const start = { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) }
    snakeRef.current = [start, { x: start.x - 1, y: start.y }]
    placeFood()
    accRef.current = 0
    lastTimeRef.current = performance.now()
  }, [gridSize, placeFood])

  // Direction change helper (used by both keyboard and touch)
  const changeDir = useCallback((dx: number, dy: number) => {
    const cur = nextDirRef.current
    if (dx === 0 && dy === -1 && cur.y !== 1)
      nextDirRef.current = { x: 0, y: -1 }
    else if (dx === 0 && dy === 1 && cur.y !== -1)
      nextDirRef.current = { x: 0, y: 1 }
    else if (dx === -1 && dy === 0 && cur.x !== 1)
      nextDirRef.current = { x: -1, y: 0 }
    else if (dx === 1 && dy === 0 && cur.x !== -1)
      nextDirRef.current = { x: 1, y: 0 }
  }, [])

  // Keyboard controls
  useEffect(() => {
    resetGame()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P' || e.key === ' ') {
        setPaused((p) => !p)
        return
      }
      if (!aliveRef.current) {
        if (e.key === 'r' || e.key === 'R' || e.key === 'Enter') resetGame()
        return
      }
      const k = e.key
      if (k === 'ArrowUp' || k === 'w' || k === 'W') changeDir(0, -1)
      else if (k === 'ArrowDown' || k === 's' || k === 'S') changeDir(0, 1)
      else if (k === 'ArrowLeft' || k === 'a' || k === 'A') changeDir(-1, 0)
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') changeDir(1, 0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [resetGame, changeDir])

  // Touch / swipe controls
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onStart = (e: TouchEvent) => {
      const t = e.touches[0]
      touchStartRef.current = { x: t.clientX, y: t.clientY }
    }
    const onEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return
      const t = e.changedTouches[0]
      const dx = t.clientX - touchStartRef.current.x
      const dy = t.clientY - touchStartRef.current.y
      touchStartRef.current = null
      if (Math.abs(dx) < SWIPE_MIN && Math.abs(dy) < SWIPE_MIN) {
        // Tap — restart if dead
        if (!aliveRef.current) resetGame()
        return
      }
      if (!aliveRef.current) return
      if (Math.abs(dx) > Math.abs(dy)) changeDir(dx > 0 ? 1 : -1, 0)
      else changeDir(0, dy > 0 ? 1 : -1)
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend', onEnd)
    }
  }, [resetGame, changeDir])

  // Rendering helpers
  const roundedRect = useCallback(
    (
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
    },
    [],
  )

  /** Draw a Battlesnake SVG image rotated to face `dir` in a cell at (cx, cy). */
  const drawSvgPart = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      cx: number,
      cy: number,
      size: number,
      dir: Vec,
      isTail: boolean,
    ) => {
      ctx.save()
      ctx.translate(cx + size / 2, cy + size / 2)
      if (isTail) {
        // Tail SVG default faces LEFT
        if (dir.x > 0) {
          // body is to the left → tail points right → flip horizontally
          ctx.scale(-1, 1)
        } else if (dir.y < 0) {
          // body is below → tail points up → flip + rotate 90°
          ctx.scale(-1, 1)
          ctx.rotate(Math.PI / 2)
        } else if (dir.y > 0) {
          // body is above → tail points down → flip + rotate -90°
          ctx.scale(-1, 1)
          ctx.rotate(-Math.PI / 2)
        }
        // dir.x < 0 (body to right, tail points left) → default, no transform
      } else {
        // Head SVG default faces RIGHT
        if (dir.x < 0) ctx.scale(-1, 1)
        else if (dir.y < 0) ctx.rotate(-Math.PI / 2)
        else if (dir.y > 0) ctx.rotate(Math.PI / 2)
        // dir.x > 0 → default
      }
      ctx.drawImage(img, -size / 2, -size / 2, size, size)
      ctx.restore()
    },
    [],
  )

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')!
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2)

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const size = Math.floor(Math.min(rect.width, rect.height))
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      canvas.width = Math.floor(size * dpr)
      canvas.height = Math.floor(size * dpr)
    }
    resize()
    const ro = new ResizeObserver(() => resize())
    ro.observe(container)

    const step = (dt: number) => {
      if (pausedRef.current || !aliveRef.current) return
      accRef.current += dt
      if (accRef.current < tickMs) return
      accRef.current = 0
      dirRef.current = nextDirRef.current
      const head = snakeRef.current[0]
      const nx = head.x + dirRef.current.x
      const ny = head.y + dirRef.current.y
      if (nx < 0 || ny < 0 || nx >= gridSize || ny >= gridSize) {
        setAlive(false)
        persistHigh()
        return
      }
      if (snakeRef.current.some((s) => s.x === nx && s.y === ny)) {
        setAlive(false)
        persistHigh()
        return
      }
      snakeRef.current.unshift({ x: nx, y: ny })
      if (nx === foodRef.current.x && ny === foodRef.current.y) {
        setScore((v) => {
          const nv = v + 1
          if (nv > highRef.current) setHigh(nv)
          return nv
        })
        placeFood()
      } else {
        snakeRef.current.pop()
      }
    }

    let time = 0
    const draw = (t: number) => {
      time = t
      const w = canvas.width
      const h = canvas.height
      const cell = Math.floor(Math.min(w, h) / (gridSize + 1))
      const gridW = cell * gridSize
      const padX = Math.floor((w - gridW) / 2)
      const padY = Math.floor((h - gridW) / 2)
      const inset = Math.max(1, Math.floor(cell * 0.08))

      // Background fill
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, w, h)

      // Wall border
      ctx.fillStyle = WALL
      const bord = Math.max(2, Math.floor(cell * 0.1))
      ctx.fillRect(padX - bord, padY - bord, gridW + bord * 2, gridW + bord * 2)

      // Grid cells
      for (let gy = 0; gy < gridSize; gy++) {
        for (let gx = 0; gx < gridSize; gx++) {
          ctx.fillStyle = (gx + gy) % 2 === 0 ? GRID_A : GRID_B
          ctx.fillRect(padX + gx * cell, padY + gy * cell, cell, cell)
        }
      }

      // --- Food: glowing circle ---
      {
        const fx = padX + foodRef.current.x * cell + cell / 2
        const fy = padY + foodRef.current.y * cell + cell / 2
        const r = (cell - inset * 2) * 0.4
        const pulse = 0.7 + 0.3 * Math.sin(time * 0.004)

        // Outer glow
        ctx.save()
        ctx.globalAlpha = 0.25 * pulse
        const glow = ctx.createRadialGradient(fx, fy, r * 0.2, fx, fy, r * 2.5)
        glow.addColorStop(0, foodColor)
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(fx, fy, r * 2.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Core circle
        ctx.save()
        ctx.globalAlpha = 0.85 + 0.15 * pulse
        const grad = ctx.createRadialGradient(
          fx - r * 0.25,
          fy - r * 0.25,
          r * 0.1,
          fx,
          fy,
          r,
        )
        grad.addColorStop(0, '#fff')
        grad.addColorStop(0.4, foodColor)
        grad.addColorStop(1, '#b45309')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(fx, fy, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // --- Snake body (middle segments) ---
      const snake = snakeRef.current
      ctx.fillStyle = snakeColor
      for (let i = 1; i < snake.length - 1; i++) {
        const s = snake[i]
        roundedRect(
          ctx,
          padX + s.x * cell + inset,
          padY + s.y * cell + inset,
          cell - inset * 2,
          cell - inset * 2,
          Math.floor(cell / 5),
        )
        ctx.fill()
      }

      // Connector fills between adjacent body segments to remove gaps
      ctx.fillStyle = snakeColor
      for (let i = 0; i < snake.length - 1; i++) {
        const a = snake[i]
        const b = snake[i + 1]
        // Skip head→first-body and lastBody→tail connectors when SVGs are present
        if (i === 0 && headImgRef.current) continue
        if (i === snake.length - 2 && tailImgRef.current) continue
        const dx = b.x - a.x
        const dy = b.y - a.y
        if (Math.abs(dx) + Math.abs(dy) === 1) {
          if (dx !== 0) {
            const startX =
              dx > 0
                ? padX + a.x * cell + cell - inset
                : padX + b.x * cell + cell - inset
            ctx.fillRect(
              startX,
              padY + a.y * cell + inset,
              inset * 2,
              cell - inset * 2,
            )
          } else {
            const startY =
              dy > 0
                ? padY + a.y * cell + cell - inset
                : padY + b.y * cell + cell - inset
            ctx.fillRect(
              padX + a.x * cell + inset,
              startY,
              cell - inset * 2,
              inset * 2,
            )
          }
        }
      }

      // --- Snake head ---
      if (snake.length > 0) {
        const head = snake[0]
        const hx = padX + head.x * cell
        const hy = padY + head.y * cell
        if (headImgRef.current) {
          drawSvgPart(
            ctx,
            headImgRef.current,
            hx,
            hy,
            cell,
            dirRef.current,
            false,
          )
        } else {
          ctx.fillStyle = snakeColor
          roundedRect(
            ctx,
            hx + inset,
            hy + inset,
            cell - inset * 2,
            cell - inset * 2,
            Math.floor(cell / 3),
          )
          ctx.fill()
        }
      }

      // --- Snake tail ---
      if (snake.length > 1) {
        const tail = snake[snake.length - 1]
        const preTail = snake[snake.length - 2]
        // Tail direction = from tail toward body (matches official board transform logic)
        const td: Vec = { x: preTail.x - tail.x, y: preTail.y - tail.y }
        const tx = padX + tail.x * cell
        const ty = padY + tail.y * cell
        if (tailImgRef.current) {
          drawSvgPart(ctx, tailImgRef.current, tx, ty, cell, td, true)
        } else {
          ctx.fillStyle = snakeColor
          roundedRect(
            ctx,
            tx + inset,
            ty + inset,
            cell - inset * 2,
            cell - inset * 2,
            Math.floor(cell / 5),
          )
          ctx.fill()
        }
      }

      // --- Score HUD ---
      {
        const fontSize = Math.max(10, Math.floor(cell * 0.55))
        ctx.save()
        ctx.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`
        ctx.fillStyle = 'rgba(229,231,235,0.85)'
        ctx.textBaseline = 'middle'
        const hudY = padY - bord - fontSize * 0.7
        ctx.textAlign = 'left'
        ctx.fillText(`Score ${scoreRef.current}`, padX, hudY)
        ctx.textAlign = 'right'
        ctx.fillText(`Best ${highRef.current}`, padX + gridW, hudY)
        ctx.restore()
      }

      // --- Pause overlay ---
      if (pausedRef.current && aliveRef.current) {
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(padX, padY, gridW, gridW)
        const fontSize = Math.floor(cell * 1.2)
        ctx.fillStyle = 'rgba(255,255,255,0.9)'
        ctx.font = `700 ${fontSize}px ui-sans-serif, system-ui, -apple-system`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('PAUSED', padX + gridW / 2, padY + gridW / 2)
      }

      // --- Game over overlay ---
      if (!aliveRef.current) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)'
        ctx.fillRect(padX, padY, gridW, gridW)

        const cx = padX + gridW / 2
        const cy = padY + gridW / 2
        const cardW = Math.floor(gridW * 0.6)
        const cardH = Math.floor(gridW * 0.35)
        const cardX = cx - cardW / 2
        const cardY = cy - cardH / 2

        // Card background
        ctx.fillStyle = 'rgba(17,18,22,0.92)'
        roundedRect(ctx, cardX, cardY, cardW, cardH, Math.floor(cell * 0.4))
        ctx.fill()

        // Card border
        ctx.strokeStyle = 'rgba(255,255,255,0.08)'
        ctx.lineWidth = 1
        roundedRect(ctx, cardX, cardY, cardW, cardH, Math.floor(cell * 0.4))
        ctx.stroke()

        // Title
        const titleSize = Math.floor(cell * 0.9)
        ctx.fillStyle = '#fff'
        ctx.font = `700 ${titleSize}px ui-sans-serif, system-ui, -apple-system`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('Game Over', cx, cy - cardH * 0.2)

        // Score line
        const infoSize = Math.floor(cell * 0.5)
        ctx.fillStyle = snakeColor
        ctx.font = `600 ${infoSize}px ui-monospace, SFMono-Regular, Menlo, monospace`
        ctx.fillText(`Score: ${scoreRef.current}`, cx, cy + cardH * 0.08)

        // Restart hint
        const hintSize = Math.floor(cell * 0.4)
        ctx.fillStyle = 'rgba(229,231,235,0.55)'
        ctx.font = `400 ${hintSize}px ui-sans-serif, system-ui, -apple-system`
        ctx.fillText('R / Enter / Tap to restart', cx, cy + cardH * 0.3)
      }
    }

    let raf = 0
    const loop = (t: number) => {
      const dt = t - lastTimeRef.current
      lastTimeRef.current = t
      step(dt)
      draw(t)
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
    alive,
    paused,
    persistHigh,
    placeFood,
    roundedRect,
    drawSvgPart,
  ])

  return (
    <div
      ref={containerRef}
      className={
        className ?? 'relative mx-auto aspect-square w-full max-w-[480px]'
      }
      style={{ touchAction: 'none' }}
      aria-label="Pixel Snake Game"
    >
      <canvas
        ref={canvasRef}
        className="block rounded-lg shadow-md"
        style={{ background: BG }}
      />
    </div>
  )
}

export default PixelSnakeGame
