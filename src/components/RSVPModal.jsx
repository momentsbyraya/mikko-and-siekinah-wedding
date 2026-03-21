import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'

/** Public short link (share / fallback) */
const RSVP_FORM_URL = 'https://forms.gle/8BX9P21cNodSRbxw6'
/** Same form, embeddable in an iframe */
const RSVP_FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeSRC5DBj-CYSADxE9Zjm31n_7vEk0feBDM9PWPoYUV0MinVg/viewform?embedded=true'

const RSVPModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      
      // Modal entrance animation
      gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
      gsap.set(contentRef.current, { scale: 0.8, y: 50 })
      
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(contentRef.current, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.4, 
        ease: "back.out(1.7)" 
      })
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'unset'
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    // Modal exit animation
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" })
    gsap.to(contentRef.current, { 
      opacity: 0, 
      scale: 0.8, 
      y: 50, 
      duration: 0.3, 
      ease: "power2.out" 
    }).then(() => {
      onClose()
    })
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Content */}
      <div
        ref={contentRef}
        className={`relative ${themeConfig.paragraph.background} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300/50">
          <h2 className="text-2xl font-leckerli font-light text-gray-900/70">RSVP</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200/50 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 min-h-0 flex flex-col">
          <div className="w-full flex-1 min-h-[min(70vh,720px)] rounded-lg border border-gray-300/60 bg-white overflow-hidden flex flex-col">
            <iframe
              title="RSVP — Google Form"
              src={RSVP_FORM_EMBED_URL}
              className="w-full flex-1 min-h-[480px] border-0"
            />
            <p className="text-center text-sm font-albert text-gray-600 py-2 px-3 border-t border-gray-200/80 bg-white/90 shrink-0">
              <a
                href={RSVP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#800020] hover:underline underline-offset-2"
              >
                Open RSVP form in a new tab
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal 