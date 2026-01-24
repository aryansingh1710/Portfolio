import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Aryan from '../assets/images/Aryan.png'

// Note: SplitText is a Club GSAP (paid) plugin. 
// If you are using the free version, this specific animation won't work without a trial/license.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const About = () => {
  const aboutRef = useRef(null)

  useGSAP(
    () => {
      // Reverted to lines only for smoother resizing, or keep lines,chars if you prefer
      const split = SplitText.create(".about-text", {
        type: "lines,chars", 
      });

      gsap.set(split.chars, { opacity: 0.25 });

      gsap.to(split.chars, {
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 60%",
          end: "center center",
          scrub: 1
        }
      });

      gsap.from(".about-img", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 60%",
        }
      });
    },
    { scope: aboutRef }
  )

  return (
    <div 
      ref={aboutRef} 
      // UPDATED: Added Gradient Background and Text White
      className='min-h-screen relative z-10 bg-gradient-to-b from-[#1f1f1f] to-black text-white rounded-tl-[60px] rounded-tr-[60px] py-12 lg:py-24 overflow-hidden flex flex-col'
    >
      
      <div className='main-container px-6 md:px-12 flex-grow flex flex-col justify-center'>
        
        {/* UPDATED: Changed text to gray-400 and border to white/20 for dark mode contrast */}
        <h2 className='text-gray-400 text-sm md:text-md font-bold uppercase tracking-widest mb-10 md:mb-16 border-b border-white/20 pb-4'>
          About Me
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-center'>

          {/* Left: Image */}
          <div className='md:col-span-5 w-full flex justify-center md:justify-start'>
            {/* UPDATED: Changed bg-gray-200 to bg-gray-800 for the placeholder */}
            <div className='about-img relative w-full aspect-[3/4] max-w-[400px] bg-gray-800 rounded-2xl overflow-hidden'>
              <img 
                src={Aryan} 
                alt="Portrait of me" 
                className='w-full h-full object-cover opacity-90' // Added slight opacity to blend better
              />
            </div>
          </div>

          {/* Right: Text */}
          <div className='md:col-span-7'>
            {/* UPDATED: Decreased text sizes and set color to gray-200 */}
            <p className='about-text font-heading text-gray-200 text-base leading-relaxed md:text-lg xl:text-xl'>
              I’m a web developer who focuses on building clean, functional, and performance-driven web experiences. I work with HTML, CSS, JavaScript, and React, and I care deeply about writing readable code and creating intuitive user interfaces.
              <br /><br />
              I believe good software is not just about working code—it’s about solving the right problem efficiently. I actively build projects, explore new technologies, and sharpen my fundamentals in data structures, databases, and system design to grow as a well-rounded developer.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About