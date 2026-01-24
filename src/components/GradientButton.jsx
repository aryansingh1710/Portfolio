import React from 'react'

const GradientButton = ({ text, link, className, disabled }) => {
  // If a link is provided, render an <a> tag
  if (link) {
    return (
      <a 
        href={link} 
        className={`inline-block px-8 btn py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 ${className}`}
      >
        {text}
      </a>
    )
  }

  // If NO link is provided, render a <button> (Important for Forms!)
  return (
    <button 
      type="submit" // This triggers the form
      disabled={disabled}
      className={`inline-block btn px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  )
}

export default GradientButton