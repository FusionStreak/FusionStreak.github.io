'use client'

import { useScrollLenis } from '@/lib/use-scroll-lenis'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

/**
 * Example component showing Lenis smooth scrolling usage
 * This component can be added to any page to demonstrate scroll-to-top functionality
 */
export function ScrollToTop() {
  const { scrollTo } = useScrollLenis()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToTop = () => {
    scrollTo(0, {
      duration: 1.5,
      offset: 0,
    })
  }

  if (!isVisible) return null

  return (
    <Button
      onClick={handleScrollToTop}
      size="icon"
      className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full shadow-lg transition-opacity hover:shadow-xl"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}

/**
 * Example: Smooth scroll to section
 */
export function ScrollToSection({
  sectionId,
  children,
}: {
  sectionId: string
  children: React.ReactNode
}) {
  const { scrollTo } = useScrollLenis()

  const handleClick = () => {
    scrollTo(`#${sectionId}`, {
      offset: -100, // Offset for fixed header
      duration: 1.2,
    })
  }

  return (
    <button onClick={handleClick} className="text-primary hover:underline">
      {children}
    </button>
  )
}
