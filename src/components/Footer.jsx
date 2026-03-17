import React from 'react'
import { themeConfig } from '../config/themeConfig'

const Footer = () => {
  const handleFooterClick = () => {
    window.open('https://www.facebook.com/profile.php?id=61571540978411', '_blank', 'noopener,noreferrer')
  }

  return (
    <footer 
      className="w-full pb-4 transition-colors duration-300 hover:bg-[#600018] active:bg-[#600018] cursor-pointer"
      onClick={handleFooterClick}
    >
      {/* Divider line on top */}
      <div className="w-full h-px bg-[#800020] opacity-40 mb-4"></div>
      
      {/* Footer text */}
      <div className="text-center">
        <p className="text-sm sm:text-base font-albert font-thin transition-colors duration-300 hover:!text-[#f5f5f0] active:!text-[#f5f5f0]" style={{ color: themeConfig.cssVariables['--accent-text'] }}>
          Made with <ion-icon name="heart" className="inline-block mx-1 align-middle" style={{ fontSize: '1em', verticalAlign: 'middle' }}></ion-icon> by Moments by Raya
        </p>
      </div>
    </footer>
  )
}

export default Footer

