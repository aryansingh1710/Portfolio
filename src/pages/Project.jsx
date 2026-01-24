import React from 'react'
import projects from '../components/ProjectsData'
import { ArrowUpRight } from 'lucide-react' // Using Lucide icons for the arrow

const Project = () => {
  return (
    // changed bg-white to dark gradient
    <div className='min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white relative overflow-hidden'>
      
      {/* Ambient Background Glow */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none' />

      <div className='main-container py-24 lg:py-32 relative z-10'>
        
        {/* Header Section */}
        <div className='flex flex-col items-center text-center mb-16 lg:mb-24'>
            <span className='text-gray-500 uppercase tracking-[0.2em] text-sm font-bold mb-4'>Archive</span>
            <h2 className='text-6xl md:text-8xl lg:text-[7vw] font-heading font-bold leading-[0.9] tracking-tighter'>
              All <span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600'>Projects.</span>
            </h2>
        </div>

        {/* Grid Layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24'>
            {projects.map(({ id, name, category, image, link }, index) => (
                <a 
                  href={link} 
                  key={id} 
                  className='group flex flex-col gap-6'
                >
                    {/* Image Container with Border & Glow */}
                    <div className='relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 group-hover:shadow-purple-900/20'>
                        
                        {/* Overlay that appears on hover */}
                        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center'>
                           <div className='w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-100'>
                              <ArrowUpRight className='w-8 h-8 text-white' />
                           </div>
                        </div>

                        <img 
                          src={image} 
                          alt={name} 
                          className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100' 
                        />
                    </div>

                    {/* Text Details */}
                    <div className='flex justify-between items-start border-b border-white/10 pb-6 group-hover:border-white/30 transition-colors duration-300'>
                       <div>
                          <div className='flex items-center gap-3 mb-2'>
                             <span className='text-xs font-bold text-[#7B2FF7] uppercase tracking-wider'>
                               {category || 'Development'}
                             </span>
                             <span className='w-1 h-1 rounded-full bg-gray-600'></span>
                             <span className='text-xs text-gray-500 font-mono'>2024</span>
                          </div>
                          <h3 className='text-3xl md:text-4xl font-heading font-bold text-gray-200 group-hover:text-white transition-colors'>
                            {name}
                          </h3>
                       </div>

                       {/* Mobile-only arrow (since desktop has the hover overlay) */}
                       <ArrowUpRight className='md:hidden w-6 h-6 text-gray-500 group-hover:text-white transition-colors' />
                    </div>
                </a>
            ))}
        </div>

        {/* Bottom "Let's work" teaser */}
        <div className='mt-32 text-center'>
           <p className='text-gray-500 mb-4'>Seen enough?</p>
           <a href="/contact" className='inline-block text-2xl font-bold border-b border-white pb-1 hover:text-gray-300 transition-colors'>
             Let's start a project
           </a>
        </div>

      </div>
    </div>
  )
}

export default Project