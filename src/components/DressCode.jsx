import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dresscode } from '../data'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const dressCodeTitleRef = useRef(null)
  const dressCodeContentRef = useRef(null)

  useEffect(() => {
    // Dress Code Title animation
    if (dressCodeTitleRef.current) {
      ScrollTrigger.create({
        trigger: dressCodeTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(dressCodeTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Dress Code Content animation
    if (dressCodeContentRef.current) {
      ScrollTrigger.create({
        trigger: dressCodeContentRef.current,
        start: "top 70%",
        animation: gsap.fromTo(dressCodeContentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === dressCodeTitleRef.current ||
          trigger.vars.trigger === dressCodeContentRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div className="relative">
      {/* Dress Code Title */}
      <div ref={dressCodeTitleRef} className="text-center mb-6 sm:mb-8">
        <div>
          <h3 className="relative inline-block px-6 py-3">
            <span 
              className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase dress-code-title-text"
            >
              Dress Code
            </span>
          </h3>
          {/* General Dress Code Description */}
          <p className="text-base sm:text-lg font-albert font-thin mt-4 mb-4 dress-code-description">
            Strictly formal. No slippers, shorts, jeans, tshirt, or white color.
          </p>
        </div>
      </div>

      {/* Dress Code Content */}
      <div ref={dressCodeContentRef} className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
        {/* Image and Swatches Side by Side */}
        {dresscode.sections && dresscode.sections.length > 0 && (
          <div className="flex flex-row items-center justify-center gap-6 sm:gap-8 w-full">
            {/* Section Image */}
            <div className="flex-shrink-0 dress-code-image-container">
              <img 
                src="/assets/images/dresscode/dress.png" 
                alt="Dress Code" 
                className="w-full h-auto object-contain dress-code-image"
              />
            </div>
            
            {/* Color Palette - Burgundy Red and Black */}
            {(() => {
              const dressCodeColors = [
                { name: "Burgundy Red", hex: "#800020" },
                { name: "Black", hex: "#000000" },
                { name: "Dark Burgundy", hex: "#722F37" }
              ];
              return (
                <div className="flex flex-col items-center justify-center flex-shrink-0">
                  {dressCodeColors.map((color, colorIndex) => (
                    <div 
                      key={colorIndex} 
                      className={`relative group cursor-pointer ${colorIndex > 0 ? 'color-swatch' : ''}`}
                      title={color.name}
                    >
                      <div 
                        className="w-12 h-12 sm:w-16 sm:h-16 max-w-12 max-h-12 rounded-full border-2 border-white/30 shadow-md transition-transform duration-200 hover:scale-110"
                        style={{ backgroundColor: color.hex }}
                      />
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#171717] text-white text-xs font-albert rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {color.name}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

export default DressCode
