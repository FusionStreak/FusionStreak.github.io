'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'

type ThemeSwitcherProps = {
  className?: string
  title?: string
}

export function ThemeSwitcher({ className, title }: ThemeSwitcherProps) {
  const { theme, systemTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const resolvedTheme = React.useMemo(() => {
    if (!mounted) return 'light'
    if (theme === 'system') return systemTheme ?? 'light'
    return theme ?? 'light'
  }, [mounted, theme, systemTheme])

  const handleToggle = () => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle theme"
      title={title ?? 'Toggle theme'}
      className={cn(
        'border-border/40 bg-background/80 text-foreground hover:border-border hover:bg-background/90 focus-visible:ring-primary/40 focus-visible:ring-offset-background relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border shadow-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
    >
      <Sun
        className={cn(
          'h-[1.4rem] w-[1.4rem] scale-100 rotate-0 transform transition-all duration-300',
          resolvedTheme === 'dark' && 'scale-0 -rotate-90',
        )}
      />
      <Moon
        className={cn(
          'absolute h-[1.3rem] w-[1.3rem] scale-0 rotate-90 transform transition-all duration-300',
          resolvedTheme === 'dark' && 'scale-100 rotate-0',
        )}
      />
    </button>
  )
}

export default ThemeSwitcher
