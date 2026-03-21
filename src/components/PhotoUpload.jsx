import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import SecondaryButton from './SecondaryButton'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const UPLOAD_QR_SRC = '/assets/images/qr/QR - Mikko and Siekinah.png'

const PhotoUpload = () => {
  const photoUploadRef = useRef(null)

  useEffect(() => {
    // Photo Upload animation
    if (photoUploadRef.current) {
      ScrollTrigger.create({
        trigger: photoUploadRef.current,
        start: "top 80%",
        animation: gsap.fromTo(photoUploadRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === photoUploadRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div className="mt-8 relative">
      <div className="relative overflow-visible">
        <div className="relative overflow-hidden">
          <div 
            ref={photoUploadRef} 
            className="text-center transition-opacity duration-500 ease-in-out"
          >
            {/* Upload Title – centered, spacing below */}
            <div className="upload-title-wrap">
              <h3 className="relative inline-block px-6 upload-title">
                <span className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase upload-title-text">
                  OH SNAP!
                </span>
              </h3>
            </div>

            {/* Single white card: QR left, text + link right */}
            <div className="upload-card">
              <div className="upload-card-inner">
                {/* QR Code – left half */}
                <div className="upload-card-qr">
                  <img
                    src={encodeURI(UPLOAD_QR_SRC)}
                    alt="QR code to upload photos — Mikko and Siekinah"
                    className="upload-card-qr-image"
                  />
                </div>
                {/* Text and link – right half */}
                <div className="upload-card-content">
                  <p className="upload-card-description">
                    Share your photos and videos from our special day.
                  </p>
                  <div className="upload-card-action">
                    <SecondaryButton
                      href="https://drive.google.com/drive/folders/1DfvaoghTurosZsoCh4Wr178Ptw-_-GP5?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={ArrowRight}
                    >
                      Upload Photos
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoUpload
