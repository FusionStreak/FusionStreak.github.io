import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'
import myTheme from './theme'
import './globals.css'
import NavBar from './navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sayfullah Eid',
  description: 'Portfolio of Sayfullah Eid',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={myTheme}>
          <CssBaseline />
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
