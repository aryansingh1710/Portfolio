import React from 'react'
import star from '../assets/images/star.svg'

const Marquee = () => {
  // Defining the class once to keep it 100% consistent
  const starClass = "w-[7vw] invert object-contain mx-2 lg:mx-4";

  return (
    <div className='bg-black text-white py-20 lg:py-32 overflow-hidden border-t border-white/10'>
      
      {/* Row 1: Left to Right */}
      <div className='whitespace-nowrap animate-marquee text-6xl lg:text-[7vw] font-heading font-semibold leading-[1] tracking-tight'>
        <span className='flex items-center gap-4 lg:gap-8 mx-8'>
          CREATE <img src={star} alt="*" className={starClass} />
          DESIGN <img src={star} alt="*" className={starClass} />
          INSPIRE <img src={star} alt="*" className={starClass} />
          CREATE <img src={star} alt="*" className={starClass} />
          DESIGN <img src={star} alt="*" className={starClass} />
          INSPIRE <img src={star} alt="*" className={starClass} />
        </span>
      </div>

      {/* Row 2: Right to Left */}
      <div className='whitespace-nowrap animate-marquee-reverse text-6xl lg:text-[7vw] font-heading font-semibold leading-[1] tracking-tight mt-4 lg:mt-6'>
        <span className='flex items-center gap-4 lg:gap-8 mx-8'>
          CREATE <img src={star} alt="*" className={starClass } />
          DESIGN <img src={star} alt="*" className={starClass } />
          INSPIRE <img src={star} alt="*" className={starClass } />
          CREATE <img src={star} alt="*" className={starClass} />
          DESIGN <img src={star} alt="*" className={starClass} />
          INSPIRE <img src={star} alt="*" className={starClass} />
        </span>
      </div>

    </div>
  )
}

export default Marquee