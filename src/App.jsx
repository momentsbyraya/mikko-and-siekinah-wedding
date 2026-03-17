import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import NavIndex from './components/NavIndex'
import Footer from './components/Footer'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import OpeningScreen from './components/OpeningScreen'
import Loader from './components/Loader'
// import Watermark from './components/Watermark'
import ScrollToTop from './components/ScrollToTop'
import Details from './components/pages/Details'
import Entourage from './components/pages/Entourage'
import Moments from './components/pages/Moments'
import { AudioProvider, useAudio } from './contexts/AudioContext'

function AppContent() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { play } = useAudio()
  const navigate = useNavigate()

  // Preload critical images and resources
  useEffect(() => {
    const preloadImages = async () => {
      const criticalImages = [
        // NavIndex images - all prenup photos used on home page
        '/assets/images/prenup/prenup5.jpeg',   // Polaroid image
        '/assets/images/prenup/prenup6.webp',   // RSVP container
        '/assets/images/prenup/prenup7.webp',   // Moments polaroid 1
        '/assets/images/prenup/prenup4.jpeg',   // Moments polaroid 2
        // NavIndex graphics - all decorative elements
        '/assets/images/graphics/midnight-blue-envelope.png',
        '/assets/images/graphics/flower-1.png',
        '/assets/images/graphics/flower-3.png',
        '/assets/images/graphics/flower-4.png',
        '/assets/images/graphics/flower-5.png',
        '/assets/images/graphics/flower-7.png',
        '/assets/images/graphics/flower-8.png',
        '/assets/images/graphics/teal-2.png',
        '/assets/images/graphics/textured-bg-2.png',
        '/assets/images/graphics/bg-1.png',
        // OpeningScreen images
        '/assets/images/graphics/stamp.png',
        '/assets/images/graphics/cutlery-sketch.png',
        '/assets/images/graphics/ring-sketch.png',
        // Video background
        '/assets/images/videos/video-bg.mp4'
      ]

      // Preload fonts
      const preloadFonts = async () => {
        if (document.fonts && document.fonts.ready) {
          try {
            await document.fonts.ready
          } catch (e) {
            console.warn('Font loading error:', e)
          }
        }
      }

      // Preload images with proper error handling and decoding
      const imagePromises = criticalImages.map((src) => {
        return new Promise((resolve) => {
          if (src.endsWith('.mp4')) {
            // For video, preload it properly
            const video = document.createElement('video')
            video.preload = 'auto'
            video.oncanplaythrough = () => resolve()
            video.onerror = () => resolve() // Resolve even on error to not block
            video.src = src
          } else {
            const img = new Image()
            img.onload = () => {
              // Try to decode the image to ensure it's ready for rendering
              if (img.decode) {
                img.decode()
                  .then(() => resolve())
                  .catch(() => resolve()) // Resolve even if decode fails
              } else {
                resolve()
              }
            }
            img.onerror = () => {
              console.warn(`Failed to load image: ${src}`)
              resolve() // Resolve even on error to not block loading
            }
            img.src = src
            // Set a timeout for each image (15 seconds max per image)
            setTimeout(() => resolve(), 15000)
          }
        })
      })

      // Start font preloading
      const fontPromise = preloadFonts()

      // Wait for all critical resources to load
      // Use Promise.allSettled to ensure we don't block on individual failures
      const results = await Promise.allSettled([
        Promise.all(imagePromises),
        fontPromise
      ])

      // Check if critical images loaded successfully
      const imageResults = results[0]
      if (imageResults.status === 'fulfilled') {
        console.log('All critical images loaded')
      } else {
        console.warn('Some images failed to load:', imageResults.reason)
      }

      // Additional delay to ensure browser has processed all resources
      // This helps prevent lag when NavIndex first renders
      await new Promise(resolve => setTimeout(resolve, 300))

      // Hide loader
      setIsLoading(false)
    }

    preloadImages()
  }, [])

  const handleEnvelopeOpen = async () => {
    // Start playing music when invitation is revealed (user interaction allows auto-play)
    await play()
    setShowInvitation(true)
    navigate('/')
  }

  return (
    <div className="App min-h-screen wedding-gradient">
      <DynamicTitle />
      {/* <Watermark /> */}
      <ScrollToTop />
      {/* Loader - shows while preloading */}
      {isLoading && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white">
          <Loader />
        </div>
      )}
      {/* OpeningScreen - shows after loading, before invitation */}
      {!isLoading && !showInvitation && (
        <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
      )}
      {/* Main content - shows after invitation is opened */}
      {!isLoading && showInvitation && (
        <>
          <Routes>
            <Route path="/" element={<NavIndex onOpenRSVP={() => setIsRSVPModalOpen(true)} />} />
            <Route path="/details" element={<Details />} />
            <Route path="/entourage" element={<Entourage />} />
            <Route path="/moments" element={<Moments />} />
          </Routes>
          <Footer />
        </>
      )}
      <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
    </div>
  )
}

function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  )
}

export default App 