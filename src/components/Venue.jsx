import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { venues as venuesData } from '../data'
import SecondaryButton from './SecondaryButton'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

// Venue images for carousel (order: rece1, rece2, rece3, rece5, rece4, rece6)
const VENUE_CAROUSEL_IMAGES = [
  '/assets/images/venues/rece1.jpg',
  '/assets/images/venues/rece2.jpg',
  '/assets/images/venues/rece3.jpg',
  '/assets/images/venues/rece5.jpg',
  '/assets/images/venues/rece4.jpg',
  '/assets/images/venues/rece6.png'
]

const Venue = () => {
  const venueTitleRef = useRef(null)
  const venueBlockRef = useRef(null)
  const venue = venuesData.ceremony

  useEffect(() => {
    if (venueTitleRef.current) {
      ScrollTrigger.create({
        trigger: venueTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(venueTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    if (venueBlockRef.current) {
      gsap.set(venueBlockRef.current, { opacity: 0, y: 24 })
      ScrollTrigger.create({
        trigger: venueBlockRef.current,
        start: "top 78%",
        onEnter: () => {
          gsap.to(venueBlockRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          })
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === venueTitleRef.current ||
          trigger.vars.trigger === venueBlockRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title text-center w-full">
          <span className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase venue-title-text">
            WHERE TO GO
          </span>
        </h3>
      </div>

      <div ref={venueBlockRef} className="flex flex-col gap-6 px-4 sm:px-6">
        {/* Carousel - movie-style scroll to the left */}
        <div className="venue-carousel-wrap">
          <div className="venue-carousel-track">
            {[...VENUE_CAROUSEL_IMAGES, ...VENUE_CAROUSEL_IMAGES].map((src, i) => (
              <img
                key={`${src}-${i}`}
                src={src}
                alt={`Viridis Countryside Garden – ${i % VENUE_CAROUSEL_IMAGES.length + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Single venue: Viridis Countryside Garden – Ceremony & Reception */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
          <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333] mb-1">
            {venue.name}
          </div>
          <p className="text-sm sm:text-base font-albert font-thin text-[#333333] mb-4">
            {venue.city}
            {venue.address && ` · ${venue.address}`}
            {venue.state && `, ${venue.state}`}
            {venue.zip && ` ${venue.zip}`}
          </p>
          <SecondaryButton
            href={venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={ArrowRight}
          >
            Get Direction
          </SecondaryButton>
        </div>
      </div>
    </>
  )
}

export default Venue
