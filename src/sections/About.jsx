import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Aryan from '../assets/images/Aryan.png'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const About = () => {
  const aboutRef = useRef(null)

  useGSAP(
    () => {
      // 1. Image Animation (unchanged, acts as the anchor)
      gsap.from(".about-img", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 60%",
        }
      });

      // 2. Strong Text Animation (Words + Blur + Slide)
      if (typeof SplitText !== "undefined") {
          // We split by words for better performance than chars, but more detail than lines
          const split = new SplitText(".about-text-p", { type: "words" });

          gsap.from(split.words, {
            opacity: 0,
            y: 30, // Move up by 30px
            filter: "blur(10px)", // Cinematic blur effect
            duration: 0.8,
            stagger: 0.02, // Fast ripple effect
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".about-text-container",
              start: "top 75%", // Starts when text is 75% down the screen
              toggleActions: "play none none reverse" // Plays naturally, reverses if you scroll back up
              // NOTE: 'scrub' is removed to make the animation feel "stronger" and smoother
            }
          });
      } else {
          // Fallback
          gsap.from(".about-text-p", { opacity: 0, y: 20, duration: 1, stagger: 0.2 });
      }

    },
    { scope: aboutRef }
  )

  return (
    <div 
      ref={aboutRef} 
      className='min-h-screen relative z-10 bg-gradient-to-b from-[#1f1f1f] to-black text-white rounded-tl-[60px] rounded-tr-[60px] py-12 lg:py-24 overflow-hidden flex flex-col'
    >
      
      <div className='main-container px-6 md:px-12 flex-grow flex flex-col justify-center'>
        
        <h2 className='text-gray-400 text-sm md:text-md font-bold uppercase tracking-widest mb-10 md:mb-16 border-b border-white/20 pb-4'>
          About Me
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-center'>

          {/* Left: Image */}
          <div className='md:col-span-5 w-full flex justify-center md:justify-start'>
            <div className='about-img relative w-full aspect-[3/4] max-w-[400px] bg-gray-800 rounded-2xl overflow-hidden will-change-[clip-path]'>
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
            {/* STRUCTURED CONTENT:
               I have broken the text into two distinct paragraphs with a gap.
               I also added highlight classes (text-white/font-semibold) to key terms 
               to make the portfolio scanable.
            */}
            
            <p className='about-text-p font-heading text-gray-300 text-base leading-relaxed md:text-lg xl:text-xl mb-8'>
              I’m a web developer who focuses on building <span className="text-white font-semibold">clean, functional, and performance-driven</span> web experiences. I work with <span className="text-cyan-400">React, JavaScript, and GSAP</span>, and I care deeply about writing readable code and creating intuitive user interfaces.
            </p>

            <p className='about-text-p font-heading text-gray-300 text-base leading-relaxed md:text-lg xl:text-xl'>
              I believe good software is not just about working code—it’s about solving the right problem efficiently. I actively build projects, explore new technologies, and sharpen my fundamentals in <span className="text-white font-semibold">System Design and Databases</span> to grow as a well-rounded developer.
            </p>

          </div>

        </div>
      </div>
    </div>
  )
}

export default About