import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// OPTIMIZATION: Move static data outside the component to prevent re-creation on render
const STAR_PATH = "M290.361 1.55586L333.686 284.91L333.88 286.179L334.595 285.113L496.712 43.717L530.894 66.1539L354.53 298.389L353.719 299.458L355.031 299.181L644.781 238.164L651.693 276.115L359.086 321.397L357.759 321.603L358.897 322.315L605.849 476.828L581.885 510.335L344.939 341.783L343.894 341.039L344.16 342.294L403.733 622.684L363.139 630.093L319.819 346.737L319.626 345.469L318.911 346.533L156.783 587.928L122.522 565.048L298.964 333.261L299.777 332.192L298.463 332.469L8.73027 393.473L1.564 354.211L294.405 310.246L295.74 310.046L294.596 309.329L47.5646 154.374L71.6092 121.305L308.567 289.864L309.612 290.609L309.345 289.353L249.767 8.96535L290.361 1.55586Z";

// OPTIMIZATION: Memoize the noise background to avoid recalculating the string
const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const Hero = () => {
  const heroRef = useRef(null)

  useGSAP(() => {
      // Pinning
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: 1
      })

      // 1. Name Animation
      // Check if SplitText is available to prevent crashing if plugin fails to load
      if (typeof SplitText !== "undefined") {
          const splitName = new SplitText("h1", { type: "lines,words", linesClass: "overflow-hidden" });
          gsap.from(splitName.words, {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: "power4.out"
          });

          const splitTitle = new SplitText("h2", { type: "lines,words", linesClass: "overflow-hidden" });
          gsap.from(splitTitle.words, {
            y: 150,
            rotation: 5,
            opacity: 0,
            stagger: 0.1,
            delay: 0.2,
            duration: 1.2,
            ease: "power3.out"
          });
      } else {
          // Fallback if SplitText isn't loaded
          gsap.from("h1, h2", { y: 50, opacity: 0, duration: 1 });
      }

      // Button Animation
      gsap.from(".gradien-btn", {
        y: 50,
        opacity: 0,
        delay: 1,
        duration: 1,
        ease: "power3.out"
      })

      // Star Animation
      gsap.from(".star-container", {
        scale: 0,
        rotate: 180,
        opacity: 0,
        transformOrigin: "center",
        duration: 1.5,
        ease: "back.out(1.7)",
        onComplete: () => {
          // OPTIMIZATION: Animating the SVG specifically
          gsap.to(".star-svg", {
            rotate: "+=360",
            duration: 25,
            repeat: -1,
            ease: "linear"
          })
        }
      })
    }, { scope: heroRef }
  )

  return (
    <>
      <div ref={heroRef} className="
        relative w-full 
        h-[100dvh]
        flex flex-col 
        justify-center 
        items-start 
        text-left 
        px-6 md:px-12 lg:px-24
        overflow-hidden
        bg-[#050505]
      ">

        {/* --- Background Effects --- */}
        {/* OPTIMIZATION: Reduced blur radius slightly for performance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-purple-900/10 rounded-full blur-[80px] pointer-events-none z-0"></div>
        
        <div className='absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay' 
             style={{backgroundImage: NOISE_BG}}>
        </div>

        {/* --- Content --- */}

        {/* 1. Name */}
        <h1 className="
          relative z-20 
          text-sm sm:text-lg md:text-xl
          uppercase font-heading font-medium 
          tracking-[0.2em]
          text-gray-400
          mb-6 pl-1
        ">
          Aryan Singh
        </h1>

        {/* 2. Main Title */}
        <h2 className="
          relative z-10
          text-6xl sm:text-7xl md:text-8xl lg:text-[8.5vw] 
          font-heading font-bold 
          leading-[0.9] 
          tracking-tighter 
          text-white
          mb-8 md:mb-12
        ">
          Full Stack <br />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-0">
            <span className="font-light text-gray-400 italic text-4xl sm:text-6xl lg:text-[5vw]">
            </span>
            <span>Developer</span>
          </div>
        </h2>

        {/* 3. Button */}
        <div className="relative z-10 w-full sm:w-auto gradien-btn">
          <a href="/resume.pdf" className="group relative inline-block p-[2px] rounded-full bg-gradient-to-r from-[#FF4D6D] via-[#7B2FF7] to-[#2FF7ED]">
            <span className="
              block px-8 py-3 rounded-full 
              bg-[#050505] text-white font-bold tracking-widest uppercase 
              transition-all duration-300 
              group-hover:bg-transparent group-hover:text-black
              relative z-10
            ">
              Download Resume
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF4D6D] via-[#7B2FF7] to-[#2FF7ED] opacity-0 blur-lg group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
          </a>
        </div>

        {/* 4. Optimized Star (Glow Removed) */}
        {/* OPTIMIZATION: Added 'will-change-transform' to hint the browser */}
        <div className="star-container absolute -z-10 pointer-events-none
          w-[140vw] right-[-50%] top-[15%] opacity-40
          sm:w-[80vw] sm:right-[-30%] sm:top-auto sm:opacity-80
          lg:w-[50vw] lg:right-[-12%] lg:top-[10%] lg:opacity-100
        ">
           {/* The blurred div that created the glow has been removed from here. */}

           <svg className="star-svg w-full h-full will-change-transform"
            viewBox="0 0 653 631" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d={STAR_PATH}
              stroke="url(#paint0_linear_1074_2)" 
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="paint0_linear_1074_2" x1="4.77595" y1="374.593" x2="648.724"
                y2="257.055" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4D6D" />
                <stop offset="0.25" stopColor="#BD3EB2" />
                <stop offset="0.5" stopColor="#7B2FF7" />
                <stop offset="0.75" stopColor="#2F86F7" />
                <stop offset="1" stopColor="#2FF7ED" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  )
}

export default Hero