import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useAudio } from '../../contexts/AudioContext'
import GradientLayer from '../GradientLayer'
import PhotoSection from '../PhotoSection'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Moments = () => {
  const navigate = useNavigate()
  const { pause, play, isPlaying, audioRef } = useAudio()
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)
  const polaroidScrollRef = useRef(null)
  const threePhotosScrollRef = useRef(null)
  const firstParagraphRef = useRef(null)
  const textBeforeImagesRef = useRef(null)
  const polaroidContainerRef = useRef(null)
  const fourthParagraphRef = useRef(null)
  const threePhotosRowRef = useRef(null)
  const momentsTitleRef = useRef(null)
  const momentsGridRef = useRef(null)
  const pImagesGridRef = useRef(null)
  const galleryScrollContainerRef = useRef(null)
  const galleryImagesRef = useRef(null)
  const endPhoto4Ref = useRef(null)
  const ry211ImageRef = useRef(null)
  const finalParagraphRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const videoModalRef = useRef(null)
  const wasPlayingBeforeVideo = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isDraggingThreePhotos, setIsDraggingThreePhotos] = useState(false)
  const [startXThreePhotos, setStartXThreePhotos] = useState(0)
  const [scrollLeftThreePhotos, setScrollLeftThreePhotos] = useState(0)

  // All prenup images
  const allPrenupImages = [
    '/assets/images/prenup/prenup2.webp',
    '/assets/images/prenup/prenup3.jpeg',
    '/assets/images/prenup/prenup4.jpeg',
    '/assets/images/prenup/prenup5.jpeg',
    '/assets/images/prenup/prenup6.webp',
    '/assets/images/prenup/prenup7.webp',
    '/assets/images/prenup/prenup8.webp',
    '/assets/images/prenup/prenup9.webp'
  ]

  // Images array for the lightbox (includes all images in same order)
  const lightboxImages = allPrenupImages

  // Gallery images for horizontal scroll
  const galleryImages = allPrenupImages

  // Polaroid images for the scrollable container
  const polaroidImages = [
    { src: '/assets/images/prenup/prenup10.webp', rotation: -5, index: 3 },
    { src: '/assets/images/prenup/prenup11.webp', rotation: 5, index: 4 },
    { src: '/assets/images/prenup/prenup12.webp', rotation: -3, index: 5 },
    { src: '/assets/images/prenup/prenup13.webp', rotation: 3, index: 6 },
    { src: '/assets/images/prenup/prenup14.webp', rotation: -4, index: 7 },
    { src: '/assets/images/prenup/prenup15.webp', rotation: 2, index: 8 }
  ]

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

    // First paragraph animation on load
    if (firstParagraphRef.current) {
      gsap.fromTo(firstParagraphRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.9 }
      )
    }

    // Scroll to center the 2nd photo on load
    if (polaroidScrollRef.current) {
      setTimeout(() => {
        const container = polaroidScrollRef.current
        if (container) {
          const scrollWidth = container.scrollWidth
          const clientWidth = container.clientWidth
          // Center the 2nd photo (index 1)
          // Each photo is 200px wide + 16px gap (gap-4)
          const photoWidth = 200
          const gap = 16
          const secondPhotoIndex = 1
          // Calculate the position of the 2nd photo's center
          const secondPhotoCenter = (secondPhotoIndex * (photoWidth + gap)) + (photoWidth / 2)
          // Scroll to center the photo in the viewport
          const scrollPosition = secondPhotoCenter - (clientWidth / 2)
          container.scrollTo({
            left: Math.max(0, Math.min(scrollPosition, scrollWidth - clientWidth)),
            behavior: 'smooth'
          })
        }
      }, 800) // Delay to allow page animation to complete
    }

    // Scroll animations for paragraphs with slide-in effect
    const paragraphRefs = [
      { ref: finalParagraphRef, direction: 'left' }
    ]

    paragraphRefs.forEach(({ ref, direction }) => {
      if (ref.current) {
        const xValue = direction === 'left' ? -50 : 50
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            x: xValue,
            y: 30
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none none"
            }
          }
        )
      }
    })

    // Scroll animations for other elements
    const scrollElements = [
      { ref: textBeforeImagesRef },
      { ref: polaroidContainerRef },
      { ref: fourthParagraphRef },
      { ref: threePhotosRowRef },
      { ref: momentsTitleRef },
      { ref: momentsGridRef },
      { ref: pImagesGridRef }
    ]

    scrollElements.forEach(({ ref }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none none"
            }
          }
        )
      }
    })


    // Gallery animations
    if (momentsGridRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: momentsGridRef.current,
          start: "top 50%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate Gallery heading
      if (momentsTitleRef.current) {
        tl.fromTo(momentsTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        )
      }

      // Animate gallery images container - slide from right
      if (galleryImagesRef.current) {
        tl.fromTo(galleryImagesRef.current,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        )
      }
    }

    // Scroll animation for R&Y-209 photo after gallery
    if (endPhoto4Ref.current) {
      gsap.fromTo(
        endPhoto4Ref.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: endPhoto4Ref.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Auto-slide gallery row left and right so all photos are shown
  useEffect(() => {
    if (!galleryScrollContainerRef.current) return

    const scroller = galleryScrollContainerRef.current

    const maxScroll = scroller.scrollWidth - scroller.clientWidth
    if (maxScroll <= 0) return

    // Reset to start
    scroller.scrollLeft = 0

    const tween = gsap.to(scroller, {
      scrollLeft: maxScroll,
      duration: 25,
      ease: 'none',
      repeat: -1,
      yoyo: true
    })

    return () => {
      tween.kill()
    }
  }, [])

  // Function to handle video modal open
  const handleVideoOpen = () => {
    // Pause background music when video opens - check actual audio state
    if (audioRef.current && !audioRef.current.paused) {
      wasPlayingBeforeVideo.current = true
      pause()
    } else {
      wasPlayingBeforeVideo.current = false
    }
    
    setIsVideoOpen(true)
  }

  // Function to handle video modal close
  const handleVideoClose = () => {
    setIsVideoOpen(false)
    
    // Resume music when video closes (if it was playing before)
    if (wasPlayingBeforeVideo.current) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(error => {
            console.log('Could not resume music:', error)
          })
        }
        wasPlayingBeforeVideo.current = false
      }, 300)
    }
  }

  // Gallery drag handlers
  const handleGalleryMouseDown = (e) => {
    if (!galleryScrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - galleryScrollContainerRef.current.offsetLeft)
    setScrollLeft(galleryScrollContainerRef.current.scrollLeft)
    galleryScrollContainerRef.current.style.cursor = 'grabbing'
    galleryScrollContainerRef.current.style.userSelect = 'none'
  }

  const handleGalleryMouseLeave = () => {
    setIsDragging(false)
    if (galleryScrollContainerRef.current) {
      galleryScrollContainerRef.current.style.cursor = 'grab'
      galleryScrollContainerRef.current.style.userSelect = 'auto'
    }
  }

  const handleGalleryMouseUp = () => {
    setIsDragging(false)
    if (galleryScrollContainerRef.current) {
      galleryScrollContainerRef.current.style.cursor = 'grab'
      galleryScrollContainerRef.current.style.userSelect = 'auto'
    }
  }

  const handleGalleryMouseMove = (e) => {
    if (!isDragging || !galleryScrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - galleryScrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    galleryScrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // Touch events for mobile
  const handleGalleryTouchStart = (e) => {
    if (!galleryScrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - galleryScrollContainerRef.current.offsetLeft)
    setScrollLeft(galleryScrollContainerRef.current.scrollLeft)
  }

  const handleGalleryTouchMove = (e) => {
    if (!isDragging || !galleryScrollContainerRef.current) return
    const x = e.touches[0].pageX - galleryScrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    galleryScrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleGalleryTouchEnd = () => {
    setIsDragging(false)
  }

  // Gallery image click handler
  const handleGalleryImageClick = (image, index) => {
    setSelectedImage(image)
    setSelectedImageIndex(index)
  }

  // Gallery lightbox navigation - uses galleryImages to match gallery order
  const handleGalleryPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1
      setSelectedImage(galleryImages[newIndex])
      setSelectedImageIndex(newIndex)
    }
  }

  const handleGalleryNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1) {
      const newIndex = selectedImageIndex + 1
      setSelectedImage(galleryImages[newIndex])
      setSelectedImageIndex(newIndex)
    }
  }

  const handleGalleryClose = () => {
    setSelectedImage(null)
    setSelectedImageIndex(null)
  }

  // Track screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Apply object-position to R&Y-211 image on desktop
  useEffect(() => {
    if (ry211ImageRef.current && !isMobile) {
      ry211ImageRef.current.style.objectPosition = '15% center'
    } else if (ry211ImageRef.current && isMobile) {
      ry211ImageRef.current.style.objectPosition = 'center center'
    }
  }, [isMobile])

  // Video modal rotation animation (only on screens smaller than 768px)
  useEffect(() => {
    if (isVideoOpen && videoModalRef.current) {
      // Set initial state
      gsap.set(videoModalRef.current, {
        rotation: 0,
        scale: 0.8,
        opacity: 0
      })
      
      // Animate to landscape (only on mobile)
      gsap.to(videoModalRef.current, {
        rotation: isMobile ? 90 : 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [isVideoOpen, isMobile])

  return (
    <>
      <section
        ref={sectionRef}
        id="moments"
        data-section="moments"
        className="relative w-full overflow-hidden min-h-screen"
        style={{ opacity: 0, transform: 'translateX(100%)' }}
      >
        {/* Background - White */}
        <div 
          className="absolute inset-0 bg-white"
        />
        
        {/* Image Banner - Similar to Details page */}
        <div className="relative z-20 w-screen" style={{ width: '100vw' }}>
          <div className="relative w-full h-[250px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
            <img 
              src="/assets/images/prenup/prenup1.jpeg" 
              alt="Banner image"
              className="w-full h-full object-cover"
            />
            {/* Soft transparent white gradient layers at bottom */}
            <GradientLayer height="h-32" opacity={0.7} gradientId="whiteGradient1" />
            <GradientLayer height="h-24" opacity={0.5} gradientId="whiteGradient2" />
            <GradientLayer height="h-12" opacity={0.4} gradientId="whiteGradient3" />
            <GradientLayer height="h-8" opacity={0.3} gradientId="whiteGradient4" />
            <GradientLayer height="h-6" opacity={0.25} gradientId="whiteGradient5" />
            <GradientLayer height="h-4" opacity={0.2} gradientId="whiteGradient6" />
            
            {/* Solid transition SVG at bottom */}
            <svg 
              className="absolute bottom-0 left-0 w-full h-[12px] pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 1200 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="solidTransitionMoments" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.95)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#solidTransitionMoments)" />
            </svg>
            
            {/* Our Love Story Title at bottom */}
            <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center pb-0.5 z-10">
              <div className="w-full text-center">
                {/* Our in Ballet font */}
                <h1 className="font-ballet text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2" style={{ color: '#333333' }}>
                  Our
                </h1>
                {/* Love Story in Tebranos font */}
                <h2 className="font-tebranos text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase mb-4 -mt-6" style={{ 
                  color: '#800020'
                }}>
                  Love Story
                </h2>
              </div>
            </div>
          </div>
        </div>
        
        {/* Love Story Section */}
        <div className="relative z-20 w-full flex flex-col items-center bg-white py-12">
          <div ref={firstParagraphRef} className="relative z-20 w-full max-w-4xl px-8 sm:px-12 md:px-8 lg:px-16">
            <div className="alice-regular font-black text-[#333333] leading-relaxed text-center" style={{ fontWeight: 900, fontSize: '1rem', lineHeight: '1.8' }}>
              <p className="mb-4">
                Mikko had been the funny church musician since they were kids, while Siekinah was the song leader who somehow always made rehearsals fun. Around 2020, their constant practices and Sunday services turned into inside jokes, late-night chats, and “accidentally” spending more time together. Everyone at church lowkey saw it coming. Four years later, they finally made it official—turns out the real harmony wasn’t just in the music.
              </p>
            </div>
          </div>
        </div>

           {/* Moments Gallery Section */}
           <div 
             ref={momentsGridRef} 
             className="relative z-20 w-full flex flex-col mt-8"
             style={{
               backgroundImage: 'url(/assets/images/graphics/bg-3.png)',
               backgroundSize: '100% 80%',
               backgroundPosition: 'center top',
               backgroundRepeat: 'no-repeat'
             }}
           >
             {/* Title - Full Width at Top */}
             <div className="relative z-20 w-full" style={{ border: 'none' }}>
               <h2 ref={momentsTitleRef} className="w-full text-center px-4" style={{
                 paddingTop: '4rem',
                 paddingBottom: '4rem',
                 overflow: 'visible',
                 border: 'none',
                 outline: 'none'
               }}>
                 {/* Gold-1 Graphic Above Title */}
                 <div className="flex justify-center items-center w-full mb-4">
                   <img 
                     src="/assets/images/graphics/gold-1.png" 
                     alt="Decorative graphic" 
                     className="h-auto"
                     style={{ maxWidth: '120px', width: 'auto' }}
                 />
               </div>
                 <span 
                   className="stylish-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block" 
                   style={{
                     lineHeight: '1.2',
                     background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #B8860B 75%, #DAA520 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     backgroundClip: 'text',
                     filter: 'drop-shadow(0 2px 4px rgba(218, 165, 32, 0.3))',
                     display: 'inline-block',
                     paddingTop: '0.5rem',
                     paddingBottom: '0.5rem'
                   }}
                 >
                   Moments
                 </span>
               </h2>
               </div>

             {/* Content Container */}
             <div 
               className="w-full flex flex-col relative z-10"
             >
               {/* Horizontal Scrollable Images */}
               <div 
                 ref={galleryImagesRef}
                 className="w-full"
               >
                 <div 
                   ref={galleryScrollContainerRef}
                   className="w-full overflow-x-auto"
                   style={{
                     scrollbarWidth: 'none',
                     msOverflowStyle: 'none',
                     cursor: 'grab'
                   }}
                   onMouseDown={handleGalleryMouseDown}
                   onMouseLeave={handleGalleryMouseLeave}
                   onMouseUp={handleGalleryMouseUp}
                   onMouseMove={handleGalleryMouseMove}
                   onTouchStart={handleGalleryTouchStart}
                   onTouchMove={handleGalleryTouchMove}
                   onTouchEnd={handleGalleryTouchEnd}
                 >
                   <style>{`
                     div::-webkit-scrollbar {
                       display: none;
                     }
                   `}</style>
                   <div className="flex gap-4 px-4" style={{ minHeight: '300px' }}>
                     {galleryImages.map((image, index) => (
                       <img
                         key={index}
                         src={image}
                         alt={`Gallery ${index + 1}`}
                         className="flex-shrink-0 object-cover cursor-pointer"
                         style={{
                           width: '300px',
                           height: '300px',
                           borderRadius: '0'
                         }}
                         width="300"
                         height="300"
                         draggable="false"
                         loading={index < 4 ? "eager" : "lazy"}
                         fetchPriority={index < 4 ? "high" : index < 8 ? "auto" : "low"}
                         decoding="async"
                         onClick={() => {
                           handleGalleryImageClick(image, index)
                         }}
                       />
                     ))}
               </div>
                 </div>
               </div>
             </div>

           </div>

           {/* Story text before final photo */}
           <div ref={finalParagraphRef} className="relative z-20 w-full max-w-4xl px-8 sm:px-12 md:px-8 lg:px-16 mt-8 mx-auto">
             <div className="alice-regular font-black text-[#333333] leading-relaxed text-center" style={{ fontWeight: 900, fontSize: '1rem', lineHeight: '1.8' }}>
               <p className="mb-4">
                 Join us in celebrating their extraordinary journey—a tale of serendipity, unexpected love, and the joy of two hearts making each other better. Together, they are thrilled to say, "I do," as they embrace a future full of promise and adventure.
               </p>
             </div>
           </div>

           {/* Final Photo - Full Width After Gallery */}
           <div ref={endPhoto4Ref} className="relative z-20 w-screen mt-8">
             <div className="relative">
               <img
                 src="/assets/images/prenup/prenup9.webp"
                 alt="Love story photo"
                 className="w-full h-auto object-cover cursor-pointer"
                 loading="lazy"
                 decoding="async"
                 onClick={() => {
                   const imageIndex = galleryImages.indexOf('/assets/images/prenup/prenup9.webp')
                   setSelectedImage('/assets/images/prenup/prenup9.webp')
                   setSelectedImageIndex(imageIndex !== -1 ? imageIndex : 0)
                 }}
               />
             </div>
           </div>

           {/* Second Moments Section - All 5 Polaroids in One Container */}
           {/* <div className="relative z-20 w-full mt-12 pb-12">
             <div className="relative w-full pt-32 pb-12 overflow-hidden">
               Background Handwriting Text
               <div 
                 className="absolute inset-0 pointer-events-none z-0"
                 style={{
                   opacity: 0.3
                 }}
               >
                 <p 
                   className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800020] whitespace-nowrap"
                   style={{
                     position: 'absolute',
                     top: '5%',
                     left: '-5%',
                     transform: 'rotate(-5deg)'
                   }}
                 >
                   Forever
                 </p>
                 <p 
                   className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800020] whitespace-nowrap"
                   style={{
                     position: 'absolute',
                     top: '25%',
                     right: '-8%',
                     transform: 'rotate(8deg)'
                   }}
                 >
                   Always
                 </p>
                 <p 
                   className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800020] whitespace-nowrap"
                   style={{
                     position: 'absolute',
                     bottom: '25%',
                     left: '-8%',
                     transform: 'rotate(-8deg)'
                   }}
                 >
                   Together
                 </p>
                 <p 
                   className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800020] whitespace-nowrap"
                   style={{
                     position: 'absolute',
                     bottom: '5%',
                     right: '-5%',
                     transform: 'rotate(5deg)'
                   }}
                 >
                   Love
                 </p>
                 <p 
                   className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800020] whitespace-nowrap"
                   style={{
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%) rotate(-3deg)'
                   }}
                 >
                   Us
                 </p>
               </div>
               
               <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4">
                 <div className="relative w-full h-80 sm:h-96 lg:h-[500px] flex justify-center items-center mb-8">
                   <div 
                     className="absolute -top-6 -left-8 sm:left-4 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-lg transform -rotate-12 opacity-90"
                     style={{
                       border: '4px solid white',
                       borderTop: '4px solid white'
                     }}
                   >
                     <div 
                       className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                       style={{
                         backgroundImage: 'url(/assets/images/prenup/prenup4.jpeg)',
                         borderTop: '4px solid white',
                         borderLeft: '4px solid white',
                         borderRight: '4px solid white'
                       }}
                     ></div>
                     <div className="p-2 text-center">
                       <div className="text-sm sm:text-lg text-[#800020] font-handwritten">
                         Memories
                       </div>
                     </div>
                   </div>
                   
                   <div 
                     className="relative w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-xl transform rotate-3 hover:scale-105 transition-transform duration-300"
                     style={{
                       border: '4px solid white',
                       borderTop: '4px solid white'
                     }}
                   >
                     <div 
                       className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                       style={{
                         backgroundImage: 'url(/assets/images/prenup/prenup5.jpeg)',
                         borderTop: '4px solid white',
                         borderLeft: '4px solid white',
                         borderRight: '4px solid white'
                       }}
                     ></div>
                     <div className="p-2 text-center">
                       <div className="text-sm sm:text-lg text-[#800020] font-handwritten">
                         Together
                       </div>
                     </div>
                   </div>
                   
                   <div 
                     className="absolute -top-4 -right-8 sm:right-4 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-lg transform rotate-6"
                     style={{
                       border: '4px solid white',
                       borderTop: '4px solid white'
                     }}
                   >
                     <div 
                       className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                       style={{
                         backgroundImage: 'url(/assets/images/prenup/prenup6.webp)',
                         borderTop: '4px solid white',
                         borderLeft: '4px solid white',
                         borderRight: '4px solid white'
                       }}
                     ></div>
                     <div className="p-2 text-center">
                       <div className="text-sm sm:text-lg text-[#800020] font-handwritten">
                         Love
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 <div className="relative w-full h-80 sm:h-96 lg:h-[500px] flex justify-center items-center">
                   <div 
                     className="absolute -left-8 sm:left-4 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-xl transform -rotate-6 hover:scale-105 transition-transform duration-300"
                     style={{
                       border: '4px solid white',
                       borderTop: '4px solid white'
                     }}
                   >
                     <div 
                       className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                       style={{
                         backgroundImage: 'url(/assets/images/prenup/prenup7.webp)',
                         borderTop: '4px solid white',
                         borderLeft: '4px solid white',
                         borderRight: '4px solid white'
                       }}
                     ></div>
                     <div className="p-2 text-center">
                       <div className="text-sm sm:text-lg text-[#800020] font-handwritten">
                         Forever
                       </div>
                     </div>
                   </div>

                   <div 
                     className="absolute -right-8 sm:right-4 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-xl transform rotate-6 hover:scale-105 transition-transform duration-300"
                     style={{
                       border: '4px solid white',
                       borderTop: '4px solid white'
                     }}
                   >
                     <div 
                       className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                       style={{
                         backgroundImage: 'url(/assets/images/prenup/prenup8.webp)',
                         borderTop: '4px solid white',
                         borderLeft: '4px solid white',
                         borderRight: '4px solid white'
                       }}
                     ></div>
                     <div className="p-2 text-center">
                       <div className="text-sm sm:text-lg text-[#800020] font-handwritten">
                         Always
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div> */}
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
        className="fixed bottom-12 right-6 z-[100] w-14 h-14 bg-[#800020] text-white rounded-full shadow-lg hover:bg-[#600018] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Back to home"
        style={{ pointerEvents: 'auto' }}
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>

      {/* Video Modal */}
      {isVideoOpen && createPortal(
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={(e) => {
            // Close when clicking the backdrop
            if (e.target === e.currentTarget) {
              handleVideoClose()
            }
          }}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleVideoClose()
            }}
            className="absolute top-4 right-4 z-[300] w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ pointerEvents: 'auto' }}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* YouTube Video Player */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4" style={{ pointerEvents: 'none' }}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/KSPPzvrdFyU?si=nA2owsm0AcwCZZ8x&autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="max-w-full max-h-full"
              style={{ 
                width: '90%',
                height: '90%',
                maxWidth: '1000px',
                maxHeight: '562px',
                aspectRatio: '16/9',
                pointerEvents: 'auto'
              }}
            />
          </div>
        </div>,
        document.body
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && createPortal(
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60"
          onClick={handleGalleryClose}
        >
          {/* Close Icon - Top Left */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleGalleryClose()
            }}
            className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button - Left */}
          {selectedImageIndex !== null && selectedImageIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleGalleryPrevious()
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Next Button - Right */}
          {selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleGalleryNext()
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Full Image */}
          <img
            src={selectedImage}
            alt="Gallery full view"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            loading="eager"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  )
}

export default Moments
