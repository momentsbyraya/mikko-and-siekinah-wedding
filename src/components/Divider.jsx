import React from 'react'

const Divider = () => {
  return (
    <div className="flex justify-center items-center" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
      {/* Left horizontal line */}
      <div className="w-16 h-px bg-[#333333] opacity-40"></div>
      
      <svg 
        className="w-3 h-3 mx-4"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M50 10 L90 50 L50 90 L10 50 Z" 
          fill="#800020" 
          stroke="#800020" 
          strokeWidth="2"
        />
      </svg>
      
      {/* Right horizontal line */}
      <div className="w-16 h-px bg-[#333333] opacity-40"></div>
    </div>
  )
}

export default Divider
