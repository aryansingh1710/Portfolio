import React, { useRef, useState, useEffect } from 'react'
import Logo from '../assets/images/logo.svg' // Ensure this path is correct
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Refs for GSAP scoping and timeline control
  const containerRef = useRef(null)
  const menuRef = useRef(null)
  const tl = useRef(null)

  // 1. Initial Fade-in Animation
  useGSAP(() => {
    gsap.from("nav", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power3.out"
    })

    // Setup the Menu Timeline (Paused initially)
    tl.current = gsap.timeline({ paused: true })
      .to(menuRef.current, {
        y: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      })
      .from('.mobile-link', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      }, "-=0.3") // Overlap slightly with previous animation
  }, { scope: containerRef })

  // 2. Handle Menu Toggle & Body Scroll Lock
  useEffect(() => {
    if (menuOpen) {
      tl.current.play()
      document.body.style.overflow = 'hidden' // Disable scrolling
    } else {
      tl.current.reverse()
      document.body.style.overflow = 'auto'   // Enable scrolling
    }
  }, [menuOpen])

  return (
    <div ref={containerRef}>
      {/* --- NAVBAR --- */}
      <nav className='fixed top-0 w-full mix-blend-difference z-50 text-white px-4 md:px-8'>
        <div className='max-w-7xl mx-auto py-6 flex justify-between items-center'>
          
          {/* Logo */}
          <Link to="/" className='z-50'>
             <img src={Logo} alt="LOGO" className='h-12 w-auto object-contain'/>
          </Link>

          {/* Desktop Menu (Hidden on Mobile/Tablet, Visible on lg screens) */}
          <div className='hidden md:flex gap-10 items-center'>
            {['Home', 'Projects', 'Contact'].map((item) => (
              <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className='hover:opacity-70 transition-opacity text-sm font-medium uppercase tracking-widest'>
                {item}
              </Link>
            ))}
          </div>

          {/* Hamburger Icon (Visible on Mobile/Tablet) */}
          <div 
            onClick={() => setMenuOpen(!menuOpen)} 
            className='flex md:hidden flex-col gap-1.5 cursor-pointer z-50 p-2' // Added padding for better touch target
          >
            <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
            <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </div>

        </div>
      </nav>

      {/* --- MOBILE/TABLET OVERLAY --- */}
      {/* Default translated up (-100%) so it hides off screen */}
      <div 
        ref={menuRef} 
        className='fixed inset-0 bg-black text-white z-40 flex flex-col items-center justify-center gap-8 -translate-y-full'
      >
        <Link 
          to="/" 
          onClick={() => setMenuOpen(false)} 
          className='mobile-link text-4xl md:text-6xl font-bold hover:text-gray-400 transition-colors'
        >
          Home
        </Link>
        <Link 
          to="/projects" 
          onClick={() => setMenuOpen(false)} 
          className='mobile-link text-4xl md:text-6xl font-bold hover:text-gray-400 transition-colors'
        >
          Projects
        </Link>
        <Link 
          to="/contact" 
          onClick={() => setMenuOpen(false)} 
          className='mobile-link text-4xl md:text-6xl font-bold hover:text-gray-400 transition-colors'
        >
          Contact
        </Link>
      </div>
    </div>
  )
}

export default Navbar