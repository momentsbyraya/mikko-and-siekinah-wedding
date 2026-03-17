import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Entourage = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)

  useEffect(() => {
    // Set initial hidden states to prevent glimpse
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { x: '100%', opacity: 0 })
    }
    if (backButtonRef.current) {
      gsap.set(backButtonRef.current, { opacity: 0, scale: 0 })
    }
    
    // Page slide-in animation on mount
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
    }

    // Back button fade-in animation after page slides in
    if (backButtonRef.current) {
      gsap.fromTo(backButtonRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", delay: 0.6 }
      )
    }

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Entourage images - fade in on scroll (images are direct children of section)
    if (sectionRef.current) {
      const imgs = sectionRef.current.querySelectorAll('img[src*="entourage/"]')
      gsap.set(imgs, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(imgs, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out'
          })
        },
        toggleActions: 'play none none reverse'
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="entourage"
        data-section="entourage"
        className="relative py-20 w-full overflow-hidden"
        style={{ 
          opacity: 0, 
          transform: 'translateX(100%)',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingTop: '4rem',
          paddingBottom: '4rem'
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/images/graphics/bg-3.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Line-1 Image - Top */}
        <img 
          src="/assets/images/graphics/line-1.png" 
          alt="Line decoration" 
          className="absolute left-1/2 transform -translate-x-1/2 z-30"
          style={{ 
            width: '50%',
            height: 'auto',
            maxWidth: '50%',
            objectFit: 'cover',
            top: '1rem'
          }}
        />
        {/* Entourage – Officiant, Parents of the Groom & Bride, Principal Sponsors */}
        <img
          src="/assets/images/entourage/2.png"
          alt="The Entourage – Officiant, Parents of the Groom & Bride, Principal Sponsors"
          className="w-full h-auto object-contain object-center block"
          style={{ opacity: 0 }}
        />
        {/* Line-1 Image - Bottom */}
        <img 
          src="/assets/images/graphics/line-1.png" 
          alt="Line decoration" 
          className="absolute left-1/2 transform -translate-x-1/2 z-30"
          style={{ 
            width: '50%',
            height: 'auto',
            maxWidth: '50%',
            objectFit: 'cover',
            bottom: '1rem'
          }}
        />
        {/* Entourage – Best Man, Groomsmen, Maid of Honor, Bridesmaids, Flower Girls, Bearers */}
        <img
          src="/assets/images/entourage/3.png"
          alt="The Entourage – Best Man, Groomsmen, Maid of Honor, Bridesmaids, Flower Girls, Bearers"
          className="w-full h-auto object-contain object-center block"
          style={{ opacity: 0 }}
        />
        {/* Content - beige overlay (no extra padding) */}
        <div
          className="relative z-20 flex flex-col items-stretch justify-start w-full overflow-hidden"
          style={{ backgroundColor: '#F5F5DC' }}
        >
          {/* Beige-1 Image Overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              backgroundImage: 'url(/assets/images/graphics/beige-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.25
            }}
          />
        </div>
      </section>
      
      {/* Back Button - Circular, Bottom Right - Outside section to avoid transform issues */}
      <button
        ref={backButtonRef}
        onClick={() => {
          // Slide out page to the left before navigating
          if (sectionRef.current) {
            gsap.to(sectionRef.current, {
              x: '-100%',
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
              onComplete: () => {
                navigate('/')
              }
            })
          } else {
            navigate('/')
          }
        }}
        className="fixed bottom-12 right-6 z-[100] w-14 h-14 bg-[#4d0011] text-white rounded-full shadow-lg hover:bg-[#3d000e] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Back to home"
        style={{ pointerEvents: 'auto' }}
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>
    </>
  )
}

export default Entourage
