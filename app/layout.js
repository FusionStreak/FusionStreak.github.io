import { Inter } from 'next/font/google'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'
import myTheme from './theme'
import './globals.css'
import NavBar from './navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Sayfullah Eid',
    template: '%s | Sayfullah Eid',
  },
  description: 'Portfolio of Sayfullah Eid',
  keywords: ['Sayfullah', 'Eid', 'Sayfullah Eid', 'Portfolio', 'Resume', 'CV', 'Carleton', 'Carleton University', 'CarletonU', 'Carleton University Alumni', 'Carleton Alumni', 'CarletonU Alumni', 'Carleton University Alumni Network', 'Carleton Alumni Network', 'CarletonU'],
  authors: [{ name: 'Sayfullah Eid', email: 'sayfullaheid@gmail.com' }],
  creator: 'Sayfullah Eid',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
    shortcut: '/logo192.png',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  url: "https://fosstodon.org/@FusionStreak"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Head>
          <link rel="me" href="https://fosstodon.org/@FusionStreak" />
        </Head>
        <ThemeProvider theme={myTheme}>
          <CssBaseline />
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
