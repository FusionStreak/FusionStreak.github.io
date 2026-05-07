import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './theme-provider'
import SimpleNav, { NavItem } from '@/components/SimpleNav'
import 'highlight.js/styles/github-dark.css'
import 'lenis/dist/lenis.css'
import { LenisProvider } from '@/components/lenis-provider'
import { FooterCredits } from '@/components/footer-credits'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sayfullah Eid',
  description: 'A personal Blog',
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    ariaLabel: 'Go to home page',
  },
  {
    label: 'Experience',
    href: '/experience',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Battlesnake',
    href: '/battlesnake',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <div className="relative min-h-dvh">
              {/* Simple gradient background */}
              <div className="from-background via-complementary/5 to-complementary/15 fixed inset-0 -z-10 bg-gradient-to-br" />

              <div className="relative z-10 flex min-h-dvh flex-col">
                <header className="sticky top-0 z-40 px-2 pt-4 pb-2">
                  <div className="relative container mx-auto max-w-6xl">
                    <SimpleNav
                      logo="/logo.svg"
                      logoAlt="Sayfullah Eid logo"
                      items={NAV_ITEMS}
                      className="bg-background/70 border-border/20 shadow-primary/5 rounded-2xl border shadow-lg backdrop-blur-xl"
                    />
                  </div>
                </header>
                <main className="container mx-auto max-w-6xl flex-1 flex-col items-center justify-center gap-6 px-2 pt-4 pb-12 md:pt-6 lg:pt-8">
                  {children}
                </main>
                <FooterCredits />
              </div>
            </div>
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  )
}
