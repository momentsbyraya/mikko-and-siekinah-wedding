import React, { useRef, useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import { paymentMethods as paymentMethodsData } from '../data'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const GIFTS_QR_SLOTS = 3
const CAROUSEL_SPEED_PX_PER_SEC = 36
const CAROUSEL_RESUME_DELAY_MS = 2500
const MD_BREAKPOINT = 768

const GiftRegistry = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const desktopCardsRef = useRef(null)
  const carouselViewportRef = useRef(null)
  const carouselTrackRef = useRef(null)
  const carouselFirstSetRef = useRef(null)
  const scrollOffsetRef = useRef(0)
  const setWidthRef = useRef(0)
  const rafRef = useRef(null)
  const resumeTimeoutRef = useRef(null)

  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [cardModalOpen, setCardModalOpen] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(null)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)

  const { paymentMethods } = paymentMethodsData

  const qrSlots = Array.from({ length: GIFTS_QR_SLOTS }, (_, i) =>
    paymentMethods && paymentMethods[i] ? paymentMethods[i] : null
  )

  const renderCard = useCallback((method, index, opts = {}) => {
    const { duplicate = false } = opts
    return (
      <button
        type="button"
        key={duplicate ? `dup-${index}` : index}
        className={`gift-registry-qr-box ${!duplicate ? 'gift-registry-card' : 'gift-carousel-card'}`.trim()}
        onClick={() => {
          setSelectedCardIndex(index)
          setCardModalOpen(true)
        }}
      >
        {method?.image ? (
          <img
            src={method.image}
            alt={method.name || 'QR code'}
            className="gift-registry-qr-image"
          />
        ) : (
          <span className="gift-registry-qr-placeholder">QR code here</span>
        )}
      </button>
    )
  }, [])

  // Scroll/entry animations: title → description → cards (stagger)
  useEffect(() => {
    if (!sectionRef.current) return

    const titleEl = titleRef.current
    const descEl = descriptionRef.current

    if (titleEl) gsap.set(titleEl, { opacity: 0, y: 24 })
    if (descEl) gsap.set(descEl, { opacity: 0, y: 24 })
    const mobileSet = carouselFirstSetRef.current
    const desktopRow = desktopCardsRef.current
    if (mobileSet) {
      const m = mobileSet.querySelectorAll('.gift-registry-card')
      gsap.set(m, { opacity: 0, y: 24 })
    }
    if (desktopRow) {
      const d = desktopRow.querySelectorAll('.gift-registry-card')
      gsap.set(d, { opacity: 0, y: 24 })
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (titleEl) {
          gsap.to(titleEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        }
        if (descEl) {
          gsap.to(descEl, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: 'power2.out'
          })
        }
        const isMd = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`).matches
        const cards = isMd
          ? desktopCardsRef.current?.querySelectorAll('.gift-registry-card')
          : carouselFirstSetRef.current?.querySelectorAll('.gift-registry-card')
        if (cards?.length) {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.25,
            delay: 0.5
          })
        }
      }
    })

    return () => {
      trigger.kill()
    }
  }, [])

  // Mobile detection and carousel measure
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`)
    const update = () => {
      const md = mql.matches
      setIsMobile(!md)
      if (md) setIsCarouselPaused(true)
    }
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!carouselFirstSetRef.current) return
    setWidthRef.current = carouselFirstSetRef.current.offsetWidth
  }, [isMobile, qrSlots])

  // Carousel RAF loop (mobile only)
  useEffect(() => {
    if (!isMobile || !carouselTrackRef.current || !carouselFirstSetRef.current) return

    const track = carouselTrackRef.current
    const setWidth = () => setWidthRef.current

    const tick = () => {
      if (!isCarouselPaused && track) {
        const w = setWidthRef.current || carouselFirstSetRef.current?.offsetWidth
        if (w > 0) {
          scrollOffsetRef.current += CAROUSEL_SPEED_PX_PER_SEC / 60
          while (scrollOffsetRef.current >= w) scrollOffsetRef.current -= w
          track.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile, isCarouselPaused])

  const applyCarouselOffset = useCallback((offset) => {
    const w = setWidthRef.current
    if (!w) return
    let o = offset
    while (o < 0) o += w
    while (o >= w) o -= w
    scrollOffsetRef.current = o
    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
    }
  }, [])

  const handleCarouselTouchStart = useCallback((e) => {
    setIsCarouselPaused(true)
    dragStartXRef.current = e.touches[0].clientX
    dragStartOffsetRef.current = scrollOffsetRef.current
  }, [])

  const handleCarouselTouchMove = useCallback((e) => {
    if (!carouselTrackRef.current) return
    const delta = dragStartXRef.current - e.touches[0].clientX
    let o = dragStartOffsetRef.current + delta
    const w = setWidthRef.current
    if (w) {
      while (o < 0) o += w
      while (o >= w) o -= w
      scrollOffsetRef.current = o
      carouselTrackRef.current.style.transform = `translate3d(${-o}px, 0, 0)`
    }
  }, [])

  const handleCarouselTouchEnd = useCallback(() => {
    applyCarouselOffset(scrollOffsetRef.current)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => setIsCarouselPaused(false), CAROUSEL_RESUME_DELAY_MS)
  }, [applyCarouselOffset])

  const handleCarouselMouseDown = useCallback((e) => {
    if (!carouselViewportRef.current) return
    isDraggingRef.current = true
    setIsCarouselPaused(true)
    dragStartXRef.current = e.clientX
    dragStartOffsetRef.current = scrollOffsetRef.current
  }, [])

  const handleCarouselMouseMove = useCallback((e) => {
    if (!isDraggingRef.current || !carouselTrackRef.current) return
    const delta = dragStartXRef.current - e.clientX
    let o = dragStartOffsetRef.current + delta
    const w = setWidthRef.current
    if (w) {
      while (o < 0) o += w
      while (o >= w) o -= w
      scrollOffsetRef.current = o
      carouselTrackRef.current.style.transform = `translate3d(${-o}px, 0, 0)`
    }
  }, [])

  const handleCarouselMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    applyCarouselOffset(scrollOffsetRef.current)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => setIsCarouselPaused(false), CAROUSEL_RESUME_DELAY_MS)
  }, [applyCarouselOffset])

  useEffect(() => {
    const onMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false
        applyCarouselOffset(scrollOffsetRef.current)
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
        resumeTimeoutRef.current = setTimeout(() => setIsCarouselPaused(false), CAROUSEL_RESUME_DELAY_MS)
      }
    }
    window.addEventListener('mouseup', onMouseUp)
    return () => window.removeEventListener('mouseup', onMouseUp)
  }, [applyCarouselOffset])

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  return (
    <>
      <div ref={sectionRef} className="mt-8 relative gift-registry-section">
        <div className="text-center relative z-10 gift-registry-inner">
          <div className="gift-registry-line" aria-hidden="true" />

          <div className="gift-registry-flower-wrap">
            <img
              src="/assets/images/graphics/flower-1.png"
              alt=""
              className="gift-registry-flower"
            />
          </div>

          <h3 ref={titleRef} className="gift-registry-title-wrap">
            <span className="gift-registry-title-line" aria-hidden="true" />
            <span className="gift-registry-title">A notes on gifts...</span>
            <span className="gift-registry-title-line" aria-hidden="true" />
          </h3>

          <p ref={descriptionRef} className="gift-registry-description">
            Your presence is the greatest gift. If you wish to honor us, we would be grateful for a monetary gift to help us start our new life together.
          </p>

          {/* Mobile: infinite carousel of 3 cards (two sets) */}
          <div
            ref={carouselViewportRef}
            className="gift-carousel-viewport md:hidden overflow-hidden"
            onTouchStart={handleCarouselTouchStart}
            onTouchMove={handleCarouselTouchMove}
            onTouchEnd={handleCarouselTouchEnd}
            onMouseDown={handleCarouselMouseDown}
            onMouseMove={handleCarouselMouseMove}
            onMouseUp={handleCarouselMouseUp}
            onMouseLeave={handleCarouselMouseUp}
          >
            <div
              ref={carouselTrackRef}
              className="gift-carousel-track flex gap-4 flex-nowrap will-change-transform"
            >
              <div ref={carouselFirstSetRef} className="flex gap-4 flex-shrink-0">
                {qrSlots.map((method, index) => renderCard(method, index))}
              </div>
              <div className="flex gap-4 flex-shrink-0">
                {qrSlots.map((method, index) => renderCard(method, index, { duplicate: true }))}
              </div>
            </div>
          </div>

          {/* Desktop: static row (scrollable if needed) */}
          <div ref={desktopCardsRef} className="hidden md:flex gift-registry-qr-row">
            {qrSlots.map((method, index) => renderCard(method, index))}
          </div>

        </div>
      </div>

      {/* Card fullscreen overlay: "QR code here" / actual QR */}
      {cardModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            className="absolute top-4 right-4 text-white p-2"
            onClick={() => { setCardModalOpen(false); setSelectedCardIndex(null) }}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full flex flex-col items-center justify-center min-h-[280px]">
            {selectedCardIndex !== null && qrSlots[selectedCardIndex]?.image ? (
              <img
                src={qrSlots[selectedCardIndex].image}
                alt="QR code"
                className="w-full h-auto object-contain"
              />
            ) : (
              <span className="text-gray-400 text-lg">QR code here</span>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Methods modal (unchanged) */}
      {isGiftModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsGiftModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
              <h3 className="text-2xl sm:text-3xl alice-regular font-black text-gray-800 modal-methods-title">Methods</h3>
              <button
                type="button"
                onClick={() => setIsGiftModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              {paymentMethods && paymentMethods.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex flex-col items-center justify-center">
                      {method.image && (
                        <img
                          src={method.image}
                          alt={method.name || 'QR Code'}
                          className="w-full max-w-[280px] h-auto object-contain"
                        />
                      )}
                      {method.name && (
                        <p className="mt-2 text-sm font-albert text-gray-600">{method.name}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default GiftRegistry
