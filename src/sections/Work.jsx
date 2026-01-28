import React, { useRef } from 'react'
import projects from '../components/ProjectsData'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Code2 } from 'lucide-react' // Added Code2 icon for extra flair

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  const workRef = useRef(null)
  const projectRef = useRef(null)

  useGSAP(() => {
    const projectList = projectRef.current;
    
    const getScrollAmount = () => {
      const projectsWidth = projectList.scrollWidth;
      return -(projectsWidth - window.innerWidth + 100); 
    };

    const tween = gsap.to(projectList, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: workRef.current,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 1, 
        invalidateOnRefresh: true,
      }
    });

    return () => {
        tween.kill();
    };

  }, { scope: workRef })

  return (
    <div ref={workRef} className='bg-black text-white h-screen flex flex-col justify-center overflow-hidden relative py-12'>
      
      {/* --- BACKGROUND GLOW EFFECT --- */}
      <div className='absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none' />
      
      {/* --- HEADER SECTION --- */}
      <div className='main-container px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end w-full z-10 relative'>
        
        {/* Left Text */}
        <div className='max-w-3xl'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='h-[1px] w-12 bg-gradient-to-r from-[#FF4D6D] to-[#7B2FF7]'></div>
            <span className='text-gray-400 font-medium tracking-widest uppercase text-sm flex items-center gap-2'>
              <Code2 className="w-4 h-4 text-[#7B2FF7]" /> {/* Icon Added */}
              My Creative Works
            </span>
          </div>
          
          {/* RENAMED: 'Selected Work' -> 'Featured Projects' */}
          <h3 className='text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-none mb-6'>
            Featured <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-white'>Projects.</span>
          </h3>
          
          {/* UPDATED: More personal description */}
          <p className='text-gray-400 text-base md:text-xl max-w-lg leading-relaxed'>
             A glimpse into my coding journey. These are the applications and interfaces I've built with a focus on clean code and user experience.
          </p>
        </div>

        {/* --- FIXED BUTTON --- */}
        <div className='mt-10 md:mt-0'>
           <a 
             href="/projects" 
             className='group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden'
           >
             <div className='absolute inset-0 bg-gradient-to-r from-[#FF4D6D] via-[#7B2FF7] to-[#2FF7ED] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out'></div>
             
             <span className='relative z-10 text-white font-medium text-lg tracking-wide group-hover:font-bold transition-all'>
               View All Works
             </span>
             <ArrowUpRight className='relative z-10 w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300' />
           </a>
        </div>
      </div>

      {/* --- HORIZONTAL SCROLL SECTION --- */}
      <div className='w-full relative z-10'>
        <div 
          ref={projectRef} 
          className='flex gap-8 md:gap-16 w-fit items-center px-4 pl-[5vw] md:pl-[10vw]'
        >
          
          {projects.map(({ id, name, category, image, link }, index) => (
            <a 
              key={id} 
              href={link} 
              className='group relative block shrink-0 rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl transition-transform duration-500 hover:-translate-y-2'
            >
              {/* Responsive Card Sizing */}
              <div className='w-[85vw] md:w-[50vw] lg:w-[40vw] aspect-[16/10] overflow-hidden'>
                <img 
                  src={image} 
                  alt={name} 
                  className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100' 
                />
              </div>

              {/* Glass Overlay Content */}
              <div className='absolute inset-x-0 bottom-0 p-6 md:p-8 bg-black/60 backdrop-blur-md border-t border-white/10 flex flex-col justify-between transition-all duration-300'>
                
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

        </div>
      </div>
    </div>
  )
}

export default Work