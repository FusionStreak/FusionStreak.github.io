import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import PillNav, { PillNavItem } from "@/components/PillNav";
import PixelBlast from "@/components/PixelBlast";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import "lenis/dist/lenis.css";
import { LenisProvider } from "@/components/lenis-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sayfullah Eid",
  description: "A personal Blog",
};

const NAV_ITEMS: PillNavItem[] = [
  {
    label: "Home",
    href: "/",
    ariaLabel: "Go to home page",
  },
  {
    label: "Experience",
    href: "/experience",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-dvh overflow-hidden">
              <div className="pointer-events-auto absolute inset-0 -z-10">
                <PixelBlast
                  variant="circle"
                  pixelSize={5}
                  patternScale={1.6}
                  patternDensity={1.45}
                  pixelSizeJitter={0.35}
                  edgeFade={0.2}
                  color="#ff7b19"
                  darkColor="#ff7b19"
                  lightColor="#0e0e0f"
                  rippleIntensityScale={0.9}
                  rippleThickness={0.15}
                  liquid
                  liquidStrength={0.2}
                  liquidRadius={1.2}
                  noiseAmount={0.08}
                  className="h-full w-full opacity-30"
                />
              </div>
              <div className="pointer-events-none fixed bottom-6 right-6 z-50 hidden md:block">
                <ThemeSwitcher className="pointer-events-auto h-12 w-12 border-border/40 bg-background/80 shadow-xl backdrop-blur-lg" />
              </div>
              <div className="relative z-10 flex min-h-dvh flex-col space-y-6">
                <header className="relative z-40 h-24 px-2">
                  <div className="container relative mx-auto flex h-full max-w-screen-7xl items-center">
                    <PillNav
                      logo="/logo.svg"
                      logoAlt="Sayfullah Eid logo"
                      items={NAV_ITEMS}
                      className="backdrop-blur-xl bg-background/70 border border-border/20 shadow-md shadow-primary/5 rounded-full"
                      baseColor="#000000"
                      pillColor="#ff6900"
                      hoveredPillTextColor="#ffffff"
                      pillTextColor="#ffffff"
                      mobileAccessory={
                        <ThemeSwitcher className="h-10 w-10 border-border/30 bg-background/80 shadow" />
                      }
                      mobileMenuAccessory={
                        <div className="rounded-[22px] bg-[var(--base,#000)]/10 p-2">
                          <ThemeSwitcher className="h-12 w-full border-border/20 bg-background/90" />
                        </div>
                      }
                    />
                  </div>
                </header>
                <main className="container flex-1 flex-col items-center justify-center gap-6 px-2 pt-8 md:pt-12 lg:py-32 mx-auto max-w-screen-7xl">
                  {children}
                </main>
                <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center px-4 py-6">
                  <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
                    <p>
                      &copy; {new Date().getFullYear()} Created by{" "}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/FusionStreak/FusionStreak.github.io"
                        className="text-primary hover:underline"
                      >
                        Sayfullah Eid
                      </Link>
                    </p>
                    <p className="flex items-center gap-1">
                      Built with{" "}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://nextjs.org"
                        className="text-primary hover:underline"
                      >
                        Next.js
                      </Link>
                      {", "}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://ui.shadcn.com"
                        className="text-primary hover:underline"
                      >
                        ShadCN UI
                      </Link>
                      {", "}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://reactbits.dev/"
                        className="text-primary hover:underline"
                      >
                        React Bits
                      </Link>
                      {", "}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://fontawesome.com/"
                        className="text-primary hover:underline"
                      >
                        Font Awesome Icons
                      </Link>
                      {", and "}
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
                </footer>
              </div>
            </div>
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
