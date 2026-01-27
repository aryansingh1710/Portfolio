import React, { useRef } from 'react'
import projects from '../components/ProjectsData'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Code2 } from 'lucide-react'
// 1. Ensure this import is here
import { Link } from 'react-router-dom'

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  const workRef = useRef(null)
  const projectRef = useRef(null)

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // --- DESKTOP ANIMATION ONLY (> 768px) ---
    mm.add("(min-width: 768px)", () => {
        const projectList = projectRef.current;
        
        const getScrollAmount = () => {
          const projectsWidth = projectList.scrollWidth;
          return -(projectsWidth - window.innerWidth + 100); 
        };

        const tween = gsap.to(projectList, {
          x: getScrollAmount,
          ease: "none",
          force3D: true, // Forces GPU acceleration
          scrollTrigger: {
            trigger: workRef.current,
            start: "top top",
            end: () => `+=${Math.abs(getScrollAmount())}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
    });

  }, { scope: workRef })

  return (
    <div ref={workRef} className='bg-black text-white min-h-screen md:h-screen flex flex-col justify-center relative py-12'>
      
      {/* --- LIGHTWEIGHT BACKGROUND --- */}
      <div 
        className='absolute top-[-20%] left-[-10%] w-[600px] h-[600px] pointer-events-none opacity-15'
        style={{ background: 'radial-gradient(circle, rgba(88, 28, 135, 0.8) 0%, rgba(0, 0, 0, 0) 70%)' }}
      />
      
      {/* --- HEADER --- */}
      <div className='main-container px-6 md:px-12 mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end w-full z-10 relative'>
        <div className='max-w-3xl'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='h-[1px] w-12 bg-gradient-to-r from-[#FF4D6D] to-[#7B2FF7]'></div>
            <span className='text-gray-400 font-medium tracking-widest uppercase text-sm flex items-center gap-2'>
              <Code2 className="w-4 h-4 text-[#7B2FF7]" />
              My Creative Works
            </span>
          </div>
          
          <h3 className='text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-none mb-6'>
            Featured <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-white'>Projects.</span>
          </h3>
          
          <p className='text-gray-400 text-base md:text-xl max-w-lg leading-relaxed'>
             A glimpse into my coding journey. Swipe to explore.
          </p>
        </div>

        {/* --- DESKTOP BUTTON --- */}
        <div className='mt-10 md:mt-0 hidden md:block'>
           <Link 
             to="/projects" 
             className='group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300'
           >
             <span className='relative z-10 text-white font-medium text-lg tracking-wide group-hover:font-bold transition-all'>
                View All Works
             </span>
             <ArrowUpRight className='relative z-10 w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300' />
           </Link>
        </div>
      </div>

      {/* --- SCROLL SECTION --- */}
      <div className='w-full relative z-10'>
        <div 
          ref={projectRef} 
          className='flex gap-6 md:gap-16 w-full md:w-fit items-center 
                     px-6 md:px-4 md:pl-[10vw]
                     overflow-x-auto snap-x snap-mandatory scroll-smooth touch-pan-y overscroll-x-contain
                     md:overflow-visible md:snap-none
                     pb-10 md:pb-0'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          
          {projects.map(({ id, name, category, image, link }, index) => (
            <a 
              key={id} 
              href={link} 
              className='group relative block shrink-0 rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 
                         shadow-md md:shadow-2xl 
                         snap-center transition-transform duration-500 hover:-translate-y-2
                         w-[85vw] md:w-[50vw] lg:w-[40vw]
                         will-change-transform'
            >
              <div className='w-full aspect-[16/10] overflow-hidden'>
                <img 
                  src={image} 
                  alt={name} 
                  loading="lazy"
                  decoding="async" 
                  className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100' 
                />
              </div>

              {/* Card Overlay */}
              <div className='absolute inset-x-0 bottom-0 p-6 md:p-8 bg-zinc-900/90 md:bg-black/60 md:backdrop-blur-md border-t border-white/10 flex flex-col justify-between transition-all duration-300'>
                <div className='flex justify-between items-start'>
                   <div>
                      <div className='flex items-center gap-3 mb-2'>
                        <span className='text-xs font-bold text-black bg-[#2FF7ED] px-2 py-1 rounded'>
                          {category || 'Development'} 
                        </span>
                        <span className='text-gray-400 text-sm'>2024</span>
                      </div>
                      <h4 className='text-2xl md:text-4xl font-heading font-bold text-white leading-tight'>
                        {name}
                      </h4>
                   </div>
                   <div className='hidden md:flex h-12 w-12 rounded-full border border-white/20 items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300'>
                      <ArrowUpRight className='w-5 h-5' />
                   </div>
                </div>
                <div className='absolute right-6 top-[-3rem] text-8xl font-bold text-white/5 pointer-events-none'>
                   0{index + 1}
                </div>
              </div>
            </a>
          ))}
          
          {/* Spacer for mobile */}
          <div className="md:hidden w-4 shrink-0"></div>
        </div>
        
        {/* --- MOBILE ONLY BUTTON --- */}
        <div className='md:hidden w-full flex justify-center mt-8 pb-8'>
            {/* UPDATED: Changed from <a> to <Link> for smoother navigation */}
            <Link 
              to="/projects" 
              className='inline-flex items-center gap-2 text-gray-400 border-b border-gray-400 pb-1 text-sm tracking-widest uppercase'
            >
                View All Works <ArrowUpRight className='w-4 h-4' />
            </Link>
        </div>

      </div>
    </div>
  )
}

export default Work