'use client'

import Link from 'next/link'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card'

export function FooterCredits() {
  const year = new Date().getFullYear()

  return (
    <footer className="flex items-center justify-center py-3">
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <span className="text-muted-foreground/40 hover:text-muted-foreground cursor-default text-xs transition-colors select-none">
            &copy; {year} Sayfullah Eid
          </span>
        </HoverCardTrigger>
        <HoverCardContent side="top" align="center" className="w-80">
          <div className="text-muted-foreground flex flex-col gap-2 text-xs">
            <p className="text-foreground/80 text-center font-medium">
              &copy; {year} Sayfullah Eid
            </p>
            <div className="border-border/50 flex flex-col gap-1.5 border-t pt-2">
              <p className="text-center">
                Code under{' '}
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/FusionStreak/FusionStreak.github.io/blob/main/LICENSE"
                  className="text-primary hover:underline"
                >
                  MIT
                </Link>
                {' \u00b7 Content under '}
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/FusionStreak/FusionStreak.github.io/blob/main/CONTENT_LICENSE"
                  className="text-primary hover:underline"
                >
                  CC BY-NC 4.0
                </Link>
              </p>
              <p className="flex flex-wrap items-center justify-center gap-x-1 text-center">
                <span>Built with</span>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://nextjs.org"
                  className="text-primary hover:underline"
                >
                  Next.js
                </Link>
                <span>{'\u00b7'}</span>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://ui.shadcn.com"
                  className="text-primary hover:underline"
                >
                  ShadCN UI
                </Link>
                <span>{'\u00b7'}</span>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://reactbits.dev/"
                  className="text-primary hover:underline"
                >
                  React Bits
                </Link>
                <span>{'\u00b7'}</span>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://fontawesome.com/"
                  className="text-primary hover:underline"
                >
                  Font Awesome
                </Link>
                <span>{'\u00b7'}</span>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://lucide.dev"
                  className="text-primary hover:underline"
                >
                  Lucide Icons
                </Link>
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </footer>
  )
}
