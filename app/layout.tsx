import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { NavigationBar } from "@/components/nav-menu";
import Link from "next/link";
import 'highlight.js/styles/github-dark.css';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-dvh flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background px-2">
              <div className="container flex h-16 max-w-screen-7xl items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Link href="/" className="flex items-center space-x-3 text-primary">
                    <span className="font-bold">Sayfullah Eid</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-5 md:space-x-6">
                  <NavigationBar />
                </div>
              </div>
            </header>
            <main className="container flex-1 flex-col items-center justify-center gap-6 px-2 pt-6 md:pt-10 lg:py-32 mx-auto max-w-screen-7xl">
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
        </ThemeProvider>
      </body>
    </html>
  );
} 
