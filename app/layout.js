import { Inter } from 'next/font/google'
import { ThemeProvider, CssBaseline, Typography, Link, Box, Container } from '@mui/material'
import myTheme from './theme'
import './globals.css'
import NavBar from './navbar'

const inter = Inter({ subsets: ['latin'] })

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://sayfullaheid.me/">
        Sayfullah Eid
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  verification: {
    other: {
      me: ['https://fosstodon.org/@FusionStreak'],
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="me" href="https://fosstodon.org/@FusionStreak" />
        <ThemeProvider theme={myTheme}>
          <CssBaseline />
          <NavBar />
          <main style={{ 'paddingTop': 60 }}>
            {children}
          </main>
          <Box sx={{ bgcolor: 'background.paper', p: 3, mt: 'auto', position: 'fixed', bottom: 0, width: '100%' }} component="footer">
            <Container maxWidth="sm">
              <Copyright />
            </Container>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  )
}
