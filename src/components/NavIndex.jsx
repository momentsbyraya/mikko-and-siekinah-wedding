import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { themeConfig } from '../config/themeConfig'
import { couple } from '../data'
import { prenup } from '../data/prenupImages'
import Counter from './Counter'
import { getTimeUntilWedding } from '../utils/countdown'
import './NavIndex.css'

const NavIndex = ({ onOpenRSVP }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const navRef = useRef(null)
  const coupleNameRef = useRef(null)
  const envelopeRef = useRef(null)
  const flower1Ref = useRef(null)
  const flower4Ref = useRef(null)
  const ovalContainerRef = useRef(null)
  const polaroidRef = useRef(null)
  const rsvpContainerRef = useRef(null)
  const detailsContainerRef = useRef(null)
  const momentsImagesRef = useRef(null)
  const momentsNavButtonsRef = useRef(null)
  const homeContentRef = useRef(null)
  const [momentsNavLayerStyle, setMomentsNavLayerStyle] = useState(null)

  // Countdown state
  const [countdown, setCountdown] = useState(getTimeUntilWedding())

  // Pages/Sections to navigate to - matching the pages folder
  const sections = []

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animate elements one after another when on home page
    if (location.pathname === '/') {
      // Set all elements to start hidden
      if (coupleNameRef.current) gsap.set(coupleNameRef.current, { opacity: 0, y: 30 })
      if (envelopeRef.current) gsap.set(envelopeRef.current, { opacity: 0, y: 30 })
      if (flower1Ref.current) gsap.set(flower1Ref.current, { opacity: 0, scale: 0, rotation: 0 })
      if (flower4Ref.current) gsap.set(flower4Ref.current, { opacity: 0, scale: 0, rotation: 0 })
      if (ovalContainerRef.current) gsap.set(ovalContainerRef.current, { opacity: 0, y: 30 })
      if (polaroidRef.current) gsap.set(polaroidRef.current, { opacity: 0, y: 30 })
      if (rsvpContainerRef.current) gsap.set(rsvpContainerRef.current, { opacity: 0, y: 30 })
      if (detailsContainerRef.current) gsap.set(detailsContainerRef.current, { opacity: 0, y: 30 })
      if (momentsImagesRef.current) {
        gsap.set(momentsImagesRef.current.children, { opacity: 0, y: 30 })
      }
      if (momentsNavButtonsRef.current) {
        gsap.set(momentsNavButtonsRef.current.children, { opacity: 0, y: 20 })
      }
      
      // Small delay to ensure opening screen is fully gone
      setTimeout(() => {
        // Animate elements one after another
        const tl = gsap.timeline({ delay: 0.2 })
            
            // Envelope - show first
            if (envelopeRef.current) {
              tl.fromTo(envelopeRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
              )
            }
            
            // Flower 1 - animate after envelope
            if (flower1Ref.current) {
              // Use more rotation on screens 992px and above
              const rotationAngle = window.innerWidth >= 992 ? -35 : -25
              tl.fromTo(flower1Ref.current,
                { opacity: 0, scale: 0, rotation: 0 },
                { opacity: 1, scale: 1, rotation: rotationAngle, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.3"
              )
            }
            
            // Couple's name - simple slide in
            if (coupleNameRef.current) {
              tl.fromTo(coupleNameRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Oval container - simple slide in
            if (ovalContainerRef.current) {
              tl.fromTo(ovalContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Polaroid image - simple slide in
            if (polaroidRef.current) {
              tl.fromTo(polaroidRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Flower 4 - top right of polaroid - keep animation
            if (flower4Ref.current) {
              tl.fromTo(flower4Ref.current,
                { opacity: 0, scale: 0, rotation: 0 },
                { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.5"
              )
            }
            
            // RSVP container - simple slide in
            if (rsvpContainerRef.current) {
              tl.fromTo(rsvpContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Details container - simple slide in
            if (detailsContainerRef.current) {
              tl.fromTo(detailsContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Moments images - simple slide in with stagger
            if (momentsImagesRef.current) {
              tl.fromTo(momentsImagesRef.current.children,
                { opacity: 0, y: 30 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.5, 
                  ease: "power2.out",
                  stagger: 0.1
                },
                "-=0.4"
              )
            }
            
            // Moments + FAQ text buttons - slide in with stagger
            if (momentsNavButtonsRef.current) {
              tl.fromTo(momentsNavButtonsRef.current.children,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                  stagger: 0.1
                },
                "-=0.4"
              )
            }
      }, 300) // Small delay to ensure smooth transition
    }
  }, [location.pathname])

  // Align FAQ / Our Moments hit layer with the polaroid row while keeping that row below RSVP (z-index)
  useLayoutEffect(() => {
    if (location.pathname !== '/') return

    const root = homeContentRef.current
    const row = momentsImagesRef.current
    if (!root || !row) return

    const sync = () => {
      const r = homeContentRef.current
      const m = momentsImagesRef.current
      if (!r || !m) return
      const rRect = r.getBoundingClientRect()
      const mRect = m.getBoundingClientRect()
      setMomentsNavLayerStyle({
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
        top: mRect.top - rRect.top + r.scrollTop,
        height: m.offsetHeight,
        zIndex: 35,
        pointerEvents: 'none'
      })
    }

    sync()
    const delayed = window.setTimeout(sync, 900)
    window.addEventListener('resize', sync)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(sync) : null
    ro?.observe(row)
    return () => {
      window.clearTimeout(delayed)
      window.removeEventListener('resize', sync)
      ro?.disconnect()
    }
  }, [location.pathname])

  const handleNavigation = (section) => {
    // If it's RSVP, open modal instead of navigating
    if (section.isModal && section.id === 'rsvp' && onOpenRSVP) {
      onOpenRSVP()
      return
    }

    // Scroll to top immediately
    window.scrollTo(0, 0)

    // Slide out animation before navigation
    if (navRef.current) {
      gsap.to(navRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          navigate(section.path, section.state ? { state: section.state } : undefined)
          // Ensure scroll to top after navigation
          setTimeout(() => window.scrollTo(0, 0), 0)
        }
      })
    } else {
      navigate(section.path, section.state ? { state: section.state } : undefined)
      // Ensure scroll to top after navigation
      setTimeout(() => window.scrollTo(0, 0), 0)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-gray-50 overflow-x-hidden overflow-y-visible relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-no-repeat nav-index-bg" />
      
      {/* Blurry White Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm nav-index-overlay" />
      
      <div 
        ref={navRef}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10"
      >

        {/* Container 2: Rest of the Content */}
        <div ref={homeContentRef} className="relative">
          {/* Midnight Blue Envelope Image */}
        <div ref={envelopeRef} className="flex justify-center relative envelope-container">
          {/* Flower 1 - behind envelope (DOM + z-index below envelope art) */}
          <img 
            ref={flower1Ref}
            src="/assets/images/graphics/flower-1.png" 
            alt="Flower decoration" 
            className="absolute bottom-[0%] -left-[10%] w-[45vw] h-auto object-contain flower-1-rotate flower-1-container z-0 pointer-events-none"
          />
          <span className="relative z-10 inline-block max-w-full">
            <img 
              src="/assets/images/graphics/for envelopes (7).png" 
              alt="Wedding Invitation" 
              className="w-[60vw] h-auto object-contain"
            />
          </span>
        </div>

        {/* Container with border radius 50% and Polaroid Image */}
        <div className="flex justify-start items-start gap-6 relative oval-polaroid-container">
          {/* Oval Container */}
          <div 
            ref={ovalContainerRef}
            className="rounded-[50%] p-1 cursor-pointer transition-transform duration-300 hover:scale-105 oval-container"
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/entourage')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/entourage')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
          >
            <div className="rounded-[50%] w-full h-full p-1 oval-border">
              <div className="rounded-[50%] w-full h-full flex flex-col items-center justify-center relative oval-border">
                {/* Text Content */}
                <div className="text-center px-4">
                  <p className="nanum-myeongjo-regular text-[#722F37] mb-2 oval-text-for">
                    FOR THE
                  </p>
                  <p className="imperial-script-regular mb-4 underline oval-text-entourage">
                    Entourage
                  </p>
                  <p className="nanum-myeongjo-regular text-[#722F37] oval-text-click">
                    CLICK HERE
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Polaroid Container Wrapper */}
          <div 
            className="relative cursor-pointer hover:scale-105 transition-transform duration-300 polaroid-wrapper"
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/moments')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/moments')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
          >
            {/* Flower 4 - Top Right (under the image and container) */}
            <img 
              ref={flower4Ref}
              src="/assets/images/graphics/flower-4.png" 
              alt="Flower decoration" 
              className="absolute h-auto object-contain flower-4"
            />
            
            {/* Polaroid-style Image Container */}
            <div 
              ref={polaroidRef}
              className="bg-white relative polaroid-container"
            >
              <img 
                src={prenup.navPolaroid} 
                alt="Prenup photo" 
                className="w-full object-cover polaroid-image"
              />
              
              {/* Flower 3 - Bottom Left (above the image) */}
              <img 
                src="/assets/images/graphics/flower-3.png" 
                alt="Flower decoration" 
                className="absolute bottom-0 left-0 h-auto object-contain flower-3"
              />
            </div>
          </div>
        </div>

        {/* Rectangle Container - Longer than wider */}
        <div className="flex justify-start items-start gap-6 relative rsvp-details-container">
          <div 
            ref={rsvpContainerRef}
            className="bg-white flex flex-col cursor-pointer transition-transform duration-300 relative rsvp-container"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(-10deg) scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(-10deg) scale(1)'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'rotate(-10deg) scale(1.1)'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'rotate(-10deg) scale(1.05)'
            }}
            onClick={() => {
              if (onOpenRSVP) {
                onOpenRSVP()
              }
            }}
          >
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 min-h-[40%]">
              <p className="nanum-myeongjo-regular text-center uppercase rsvp-text-kindly">
                Kindly
              </p>
              <p className="text-center rsvp-text-container">
                <span className="imperial-script-regular rsvp-text-r">R</span>
                <span className="nanum-myeongjo-regular rsvp-text-svp">SVP</span>
              </p>
            </div>
          </div>
          
          {/* New Container - Wider than long */}
          <div 
            ref={detailsContainerRef}
            className="bg-white flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 relative details-container"
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/details')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/details')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
          >
            {/* Flower 5 - Bottom Left */}
            <img 
              src="/assets/images/graphics/flower-5.png" 
              alt="Flower decoration" 
              className="absolute h-auto object-contain flower-5"
            />
            
            {/* Text Content */}
            <div className="text-center px-4 relative z-10">
              <p className="nanum-myeongjo-regular text-[#722F37] details-text-view">
                VIEW THE
              </p>
                <p className="imperial-script-regular underline details-text-details">
                  Details
                </p>
            </div>
          </div>
        </div>

        {/* Three Polaroid Images Below RSVP and Details */}
        <div ref={momentsImagesRef} className="flex justify-center items-start gap-0 relative moments-images-container">
          {/* Flower 7 - Under the images */}
          <img 
            src="/assets/images/graphics/flower-7.png" 
            alt="Flower decoration" 
            className="absolute h-auto object-contain flower-7"
          />
          
          {/* Polaroid Image 1 */}
          <div 
            className="relative cursor-pointer hover:scale-105 transition-transform duration-300 polaroid-1"
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/moments')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/moments')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
          >
            <div className="bg-white relative polaroid-1-container">
              <img 
                src={prenup.navMoments1} 
                alt="Prenup photo" 
                className="w-full object-cover polaroid-1-image"
              />
            </div>
          </div>

          {/* Polaroid Image 2 */}
          <div 
            className="relative cursor-pointer hover:scale-105 transition-transform duration-300 polaroid-2"
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/moments')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/moments')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
          >
            <div className="bg-white relative polaroid-2-container">
              <div className="polaroid-2-photo-wrap">
                <img 
                  src={prenup.navMoments2} 
                  alt="Prenup photo" 
                  className="w-full object-cover polaroid-2-image"
                />
              </div>
              
              {/* Flower 8 - Bottom Right */}
              <img 
                src="/assets/images/graphics/flower-8.png" 
                alt="Flower decoration" 
                className="absolute h-auto object-contain flower-8"
              />
            </div>
          </div>
        </div>

        {/* FAQ + Our Moments: own layer above RSVP/polaroids; polaroid row + flower stay at z-index below RSVP */}
        <div
          className="moments-nav-layer"
          style={momentsNavLayerStyle || undefined}
        >
          <div ref={momentsNavButtonsRef} className="moments-text-buttons-anchor">
            <button
              type="button"
              aria-label="Frequently asked questions"
              className="faq-text-button cursor-pointer hover:opacity-80 transition-opacity duration-300 bg-transparent border-none outline-none touch-manipulation"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.scrollTo(0, 0)
                try {
                  sessionStorage.setItem('detailsScrollTo', 'faq')
                } catch {
                  /* ignore private mode */
                }
                const go = () => {
                  navigate('/details', { state: { scrollTo: 'faq' } })
                }
                if (navRef.current) {
                  gsap.to(navRef.current, {
                    x: '-100%',
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: go
                  })
                } else {
                  go()
                }
              }}
            >
              <span className="nanum-myeongjo-regular uppercase tracking-wide underline pulsating-moments moments-text moments-text-faq whitespace-nowrap">
                Frequently asked
              </span>
            </button>
            <button
              type="button"
              className="moments-text-button cursor-pointer hover:opacity-80 transition-opacity duration-300 bg-transparent border-none outline-none"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('OUR MOMENTS clicked, navigating to /moments')
                if (navRef.current) {
                  gsap.to(navRef.current, {
                    x: '-100%',
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                      console.log('Animation complete, navigating...')
                      try {
                        navigate('/moments')
                      } catch (error) {
                        console.error('Navigation error:', error)
                        window.location.href = '/moments'
                      }
                    }
                  })
                } else {
                  console.log('No navRef, navigating directly...')
                  try {
                    navigate('/moments')
                  } catch (error) {
                    console.error('Navigation error:', error)
                    window.location.href = '/moments'
                  }
                }
              }}
            >
              <span className="nanum-myeongjo-regular text-right uppercase tracking-wide underline pulsating-moments moments-text">
                Our moments
              </span>
            </button>
          </div>
        </div>

        </div>

        {/* Container 3: Counter */}
        <div className="relative">
          <Counter countdown={countdown} />
        </div>
      </div>
    </div>
  )
}

export default NavIndex

