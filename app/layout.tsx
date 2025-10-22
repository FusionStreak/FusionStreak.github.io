import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import SimpleNav, { NavItem } from "@/components/SimpleNav";
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

const NAV_ITEMS: NavItem[] = [
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
              <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-complementary/5 to-complementary/15" />

              <div className="relative z-10 flex min-h-dvh flex-col">
                <header className="sticky top-0 z-40 px-2 pt-4 pb-2">
                  <div className="container relative mx-auto max-w-6xl">
                    <SimpleNav
                      logo="/logo.svg"
                      logoAlt="Sayfullah Eid logo"
                      items={NAV_ITEMS}
                      className="backdrop-blur-xl bg-background/70 border border-border/20 shadow-lg shadow-primary/5 rounded-2xl"
                    />
                  </div>
                </header>
                <main className="container flex-1 flex-col items-center justify-center gap-6 px-2 pt-4 md:pt-6 lg:pt-8 pb-12 mx-auto max-w-6xl">
                  {children}
                </main>
                <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center px-4 py-6">
                  <div className="flex flex-col items-center gap-3 text-xs text-muted-foreground max-w-2xl">
                    <p className="text-center">
                      &copy; {new Date().getFullYear()} Created by{" "}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/FusionStreak/FusionStreak.github.io"
                        className="text-primary hover:underline"
                      >
                        Sayfullah Eid
                      </Link>{" "}
                      · Code under{" "}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/FusionStreak/FusionStreak.github.io/blob/main/LICENSE"
                        className="text-primary hover:underline"
                      >
                        MIT
                      </Link>
                      {", Content under "}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/FusionStreak/FusionStreak.github.io/blob/main/CONTENT_LICENSE"
                        className="text-primary hover:underline"
                      >
                        CC BY-NC 4.0
                      </Link>
                    </p>
                    <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-center leading-relaxed">
                      <span>Built with</span>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://nextjs.org"
                        className="text-primary hover:underline"
                      >
                        Next.js
                      </Link>
                      <span>,</span>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://ui.shadcn.com"
                        className="text-primary hover:underline"
                      >
                        ShadCN UI
                      </Link>
                      <span>,</span>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://reactbits.dev/"
                        className="text-primary hover:underline"
                      >
                        React Bits
                      </Link>
                      <span>,</span>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://fontawesome.com/"
                        className="text-primary hover:underline"
                      >
                        Font Awesome Icons
                      </Link>
                      <span>, and</span>
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
