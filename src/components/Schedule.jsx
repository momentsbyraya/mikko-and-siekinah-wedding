import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { couple } from '../data'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Schedule = () => {
  const scheduleTitleRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const eventsRef = useRef(null)
  const dateSelectorRef = useRef(null)

  useEffect(() => {
    // Schedule title animation
    if (scheduleTitleRef.current) {
      ScrollTrigger.create({
        trigger: scheduleTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(scheduleTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Date Selector animation - heart, number, nearest boxes, furthest boxes
    if (dateSelectorRef.current) {
      const flexContainer = dateSelectorRef.current.querySelector('.flex.items-center')
      if (flexContainer) {
        const allItems = Array.from(flexContainer.children)
        const heartContainer = allItems.find(item => item.querySelector('svg'))
        const heartSvg = heartContainer?.querySelector('svg')
        const heartNumber = heartContainer?.querySelector('.heart-day-number')
        
        // Find boxes by their position in the array
        const nearestBoxes = allItems.filter((item, idx) => {
          const isHeart = item.querySelector('svg')
          if (isHeart) return false
          // Find the heart's index
          const heartIndex = allItems.findIndex(i => i.querySelector('svg'))
          return idx === heartIndex - 1 || idx === heartIndex + 1
        })
        
        const furthestBoxes = allItems.filter((item, idx) => {
          const isHeart = item.querySelector('svg')
          if (isHeart) return false
          // Find the heart's index
          const heartIndex = allItems.findIndex(i => i.querySelector('svg'))
          return idx === 0 || idx === allItems.length - 1
        })
        
        // Set initial states
        if (heartSvg) {
          gsap.set(heartSvg, { opacity: 0, scale: 0 })
        }
        if (heartNumber) {
          gsap.set(heartNumber, { opacity: 0, scale: 0 })
        }
        nearestBoxes.forEach(box => {
          gsap.set(box, { opacity: 0, x: -20 })
        })
        furthestBoxes.forEach(box => {
          gsap.set(box, { opacity: 0, x: -20 })
        })
        
        ScrollTrigger.create({
          trigger: dateSelectorRef.current,
          start: "top 75%",
          onEnter: () => {
            // 1. Animate heart SVG first
            if (heartSvg) {
              gsap.to(heartSvg, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)"
              })
            }
            
            // 2. Animate number inside heart
            if (heartNumber) {
              gsap.to(heartNumber, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                delay: 0.3
              })
            }
            
            // 3. Animate nearest boxes
            gsap.to(nearestBoxes, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.6,
              stagger: 0.1
            })
            
            // 4. Animate furthest boxes
            gsap.to(furthestBoxes, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.9,
              stagger: 0.1
            })
          }
        })
      }
    }

    // Timeline line expansion from top to bottom
    if (lineRef.current) {
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 70%",
        animation: gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: 1.5, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Events animate in with stagger
    if (eventsRef.current) {
      const eventItems = eventsRef.current.querySelectorAll('div.flex.items-center')
      if (eventItems.length > 0) {
        gsap.set(eventItems, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: eventsRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(eventItems, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.2
            })
          }
        })
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === scheduleTitleRef.current ||
          trigger.vars.trigger === dateSelectorRef.current ||
          trigger.vars.trigger === timelineRef.current ||
          trigger.vars.trigger === eventsRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div className="relative program-section">
      {/* Program Title */}
      <div ref={scheduleTitleRef} className="relative z-10 mb-12 sm:mb-16 program-title-container">
        <h3 className="px-6 py-3">
          <span 
            className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none uppercase program-title-text"
          >
            Order of Events
          </span>
        </h3>
        <p className="text-sm sm:text-base md:text-lg font-albert text-[#722F37] text-center mt-4 mx-auto px-4 program-description">
          Join us as we celebrate this special day together
        </p>
        
        {/* Date Selector */}
        <div ref={dateSelectorRef} className="flex flex-col items-center mt-8">
          <p className="text-base sm:text-lg font-boska mb-4 date-month-year">
            {couple.wedding.month} {couple.wedding.year}
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            {[parseInt(couple.wedding.day) - 2, parseInt(couple.wedding.day) - 1, parseInt(couple.wedding.day), parseInt(couple.wedding.day) + 1, parseInt(couple.wedding.day) + 2].map((day, index) => {
              const isWeddingDay = day === parseInt(couple.wedding.day)
              const isBesideHeart = index === 1 || index === 3
              return (
                <div key={index} className="relative">
                  {isWeddingDay ? (
                    <div className="relative flex items-center justify-center">
                      <svg 
                        className="w-20 h-20 sm:w-24 sm:h-24"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M50,85 C30,70 10,50 10,30 C10,15 22,5 35,5 C42,5 48,8 50,12 C52,8 58,5 65,5 C78,5 90,15 90,30 C90,50 70,70 50,85 Z" 
                          fill="#800020"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-white font-boska font-semibold text-xl sm:text-2xl heart-day-number">
                        {day}
                      </span>
                    </div>
                  ) : (
                    <div 
                      className={`flex items-center justify-center rounded-lg border ${isBesideHeart ? 'w-12 h-12 sm:w-14 sm:h-14 border-[#800020]/60' : 'w-10 h-10 sm:w-12 sm:h-12 border-[#800020]/30'}`}
                    >
                      <span className="text-[#722F37] font-boska text-base sm:text-lg">
                        {day}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div ref={timelineRef} className="relative max-w-md sm:max-w-xl lg:max-w-2xl w-full mx-auto z-10 timeline-container">
        {/* Central Vertical Line - Dark Grey */}
        <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-[#666666] transform -translate-x-1/2"></div>

        {/* Timeline Events */}
        <div ref={eventsRef} className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {/* Event 1 - Guest Gathering */}
          <div className="flex items-center relative min-h-[60px]">
            <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                3:00 PM
              </div>
              <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                Guest Gathering
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
            <div className="w-1/2 pl-6 text-left flex items-center justify-start">
              <img 
                src="/assets/images/graphics/welcome-2.png" 
                alt="Guest Gathering" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
          </div>

          {/* Event 2 - Wedding Ceremony */}
          <div className="flex items-center relative min-h-[60px]">
            <div className="w-1/2 pr-6 text-right flex items-center justify-end">
              <img 
                src="/assets/images/schedule/end.png" 
                alt="Wedding Ceremony" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
            <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                4:00 PM
              </div>
              <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                Wedding Ceremony
              </div>
            </div>
          </div>

          {/* Event 3 - Cocktail Hour */}
          <div className="flex items-center relative min-h-[60px]">
            <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                5:00 PM
              </div>
              <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                Cocktail Hour
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
            <div className="w-1/2 pl-6 text-left flex items-center justify-start">
              <img 
                src="/assets/images/schedule/cocktail.png" 
                alt="Cocktail Hour" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
          </div>

          {/* Event 4 - Grand Entrance */}
          <div className="flex items-center relative min-h-[60px]">
            <div className="w-1/2 pr-6 text-right flex items-center justify-end">
              <img 
                src="/assets/images/schedule/walking.png" 
                alt="Grand Entrance of the couple" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
            <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                6:00 PM
              </div>
              <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                Grand Entrance of the couple
              </div>
            </div>
          </div>

          {/* Event 5 - Dinner */}
          <div className="flex items-center relative min-h-[60px]">
            <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                7:00 PM
              </div>
              <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                Dinner
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
            <div className="w-1/2 pl-6 text-left flex items-center justify-start">
              <img 
                src="/assets/images/schedule/food.png" 
                alt="Dinner" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
          </div>

          {/* Event 6 - Wedding Toast */}
          <div className="flex items-center relative min-h-[60px]">
            <div className="w-1/2 pr-6 text-right flex items-center justify-end">
              <img 
                src="/assets/images/schedule/cocktail2.png" 
                alt="Wedding Toast" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
            <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                7:30 PM
              </div>
              <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                Wedding Toast
              </div>
            </div>
          </div>

          {/* Event 7 - Dance */}
          <div className="flex items-center relative min-h-[60px]">
            <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                8:00 PM
              </div>
              <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                Dance
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
            <div className="w-1/2 pl-6 text-left flex items-center justify-start">
              <img 
                src="/assets/images/schedule/dance.png" 
                alt="Dance" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
          </div>

          {/* Event 8 - Send Off */}
          <div className="flex items-center relative min-h-[60px]">
            <div className="w-1/2 pr-6 text-right flex items-center justify-end">
              <img 
                src="/assets/images/graphics/car-2.png" 
                alt="Send Off" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
            <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                9:00 PM
              </div>
              <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                Send Off
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
