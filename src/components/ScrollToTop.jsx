import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, state } = useLocation()

  useEffect(() => {
    const scrollTo = state?.scrollTo
    if (pathname === '/details' && (scrollTo === 'faq' || scrollTo === 'photo-upload')) {
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, state?.scrollTo])

  return null
}

export default ScrollToTop

