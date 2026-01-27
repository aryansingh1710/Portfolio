import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Aryan from '../assets/images/Aryan.png'

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null)

  useGSAP(
    () => {
      // 1. Image Animation
      // FIX: Changed to .fromTo() to handle the initial 'invisible' state
      gsap.fromTo(".about-img", 
        { 
          clipPath: "inset(0 100% 0 0)", // START: Hidden (clipped completely)
          autoAlpha: 0 // START: Invisible (opacity 0 + visibility hidden)
        },
        { 
          clipPath: "inset(0 0% 0 0)",   // END: Revealed (no clip)
          autoAlpha: 1, // END: Visible
          duration: 1.5,
          ease: "power4.out",
          force3D: true,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 60%", 
          }
        }
      );

      // 2. Text Animation
      const textElements = gsap.utils.toArray('.about-text-line');
      
      // FIX: Changed to .fromTo()
      gsap.fromTo(textElements, 
        {
          y: 50,          // START: Down 50px
          autoAlpha: 0    // START: Invisible
        },
        {
          y: 0,           // END: Normal position
          autoAlpha: 1,   // END: Visible
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: ".about-text-container",
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    },
    { scope: aboutRef }
  )

  return (
    <div 
      ref={aboutRef} 
      className='min-h-screen relative z-10 bg-gradient-to-b from-[#1f1f1f] to-black text-white rounded-tl-[60px] rounded-tr-[60px] py-12 lg:py-24 overflow-hidden flex flex-col will-change-transform'
    >
      
      <div className='main-container px-6 md:px-12 flex-grow flex flex-col justify-center'>
        
        <h2 className='text-gray-400 text-sm md:text-md font-bold uppercase tracking-widest mb-10 md:mb-16 border-b border-white/20 pb-4'>
          About Me
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-center'>

          {/* Left: Image */}
          <div className='md:col-span-5 w-full flex justify-center md:justify-start'>
            {/* FIX: Added 'invisible' class here. 
                This hides the element immediately via CSS before JS even loads. */}
            <div className='about-img invisible relative w-full aspect-[3/4] max-w-[400px] bg-gray-800 rounded-2xl overflow-hidden will-change-transform'>
              <img 
                src={Aryan} 
                alt="Portrait of me"
                loading="lazy"
                decoding="async"
                className='w-full h-full object-cover opacity-90' 
              />
            </div>
          </div>

          {/* Right: Text */}
          <div className='md:col-span-7 about-text-container'>
            
            <div className="overflow-hidden mb-8">
                {/* FIX: Added 'invisible' class here too */}
                <p className='about-text-line invisible font-heading text-gray-300 text-base leading-relaxed md:text-lg xl:text-xl transform-gpu'>
                  I’m a web developer who focuses on building <span className="text-white font-semibold">clean, functional, and performance-driven</span> web experiences. I work with <span className="text-cyan-400">React, JavaScript, and GSAP</span>, and I care deeply about writing readable code and creating intuitive user interfaces.
                </p>
            </div>

            <div className="overflow-hidden">
                {/* FIX: Added 'invisible' class here too */}
                <p className='about-text-line invisible font-heading text-gray-300 text-base leading-relaxed md:text-lg xl:text-xl transform-gpu'>
                  I believe good software is not just about working code—it’s about solving the right problem efficiently. I actively build projects, explore new technologies, and sharpen my fundamentals in <span className="text-white font-semibold">System Design and Databases</span> to grow as a well-rounded developer.
                </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default About