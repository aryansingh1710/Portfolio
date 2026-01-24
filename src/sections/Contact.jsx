import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
// Assuming GradientButton is in your components folder. 
// If not, I have styled a native button inside the form as a fallback/example.
import GradientButton from '../components/GradientButton' 

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      await emailjs.sendForm(
        'service_r8umtsg',      // Your Service ID
        'template_wgg8pto',     // Your Template ID
        formRef.current,
        '1258sVR2M2-vUDiFl'     // Your Public Key
      );
      
      alert("Message sent successfully!"); 
      e.target.reset(); 

    } catch (error) {
      console.error('FAILED...', error);
      alert("Failed to send. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  useGSAP(() => {
    // Staggered reveal for text elements
    gsap.from(".contact-text-anim", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    // Slide in animation for the form
    gsap.from(".contact-form-anim", {
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='min-h-screen relative bg-black text-white pt-32 pb-20 px-6 lg:px-12 overflow-hidden flex items-center'>
      
      {/* 1. Background Glow Effect (Adds Depth) */}
      <div className='absolute top-[-10%] right-[-5%] w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-purple-900/30 rounded-full blur-[80px] lg:blur-[140px] pointer-events-none' />
      <div className='absolute bottom-[-10%] left-[-5%] w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] bg-blue-900/20 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none' />

      <div className='main-container max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start'>
        
        {/* Left Side: Professional Info & Call to Action */}
        <div className='flex flex-col justify-between h-full order-2 lg:order-1 mt-8 lg:mt-0'>
          <div>
            <h2 className='contact-text-anim text-4xl md:text-6xl xl:text-7xl font-heading font-bold tracking-tighter mb-6'>
              Let's start a <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500'>project together.</span>
            </h2>
            <p className='contact-text-anim text-gray-400 text-base md:text-lg lg:text-xl max-w-lg mb-12 leading-relaxed'>
              I am currently available for freelance projects and full-time roles. If you're looking for a developer who cares about performance and design, let's chat.
            </p>
          </div>

          <div className='contact-text-anim space-y-10'>
            <div>
              <span className='block text-xs md:text-sm text-gray-500 uppercase tracking-widest mb-2'>Contact Details</span>
              <a href="mailto:aryansingh171019@gmail.com" className='text-xl md:text-2xl lg:text-3xl font-semibold hover:text-purple-400 transition-colors break-all'>
                aryansingh171019@gmail.com
              </a>
            </div>

            {/* Socials */}
            <div>
              <span className='block text-xs md:text-sm text-gray-500 uppercase tracking-widest mb-4'>Social Profiles</span>
              <div className='flex flex-wrap gap-6'>
                {['LinkedIn', 'GitHub', 'Instagram'].map((social, index) => (
                  <a 
                    key={index}
                    href="#" // Replace with your actual URLs
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='text-lg text-gray-400 hover:text-white transition-colors underline decoration-gray-700 hover:decoration-white underline-offset-4'
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className='contact-form-anim w-full order-1 lg:order-2'>
          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            // Glassmorphism Style
            className='bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden'
          >
            {/* Subtle sheen inside the card */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className='space-y-6 md:space-y-8'>
              
              <div className='group'>
                <label htmlFor="name" className='block text-sm text-gray-400 mb-2 uppercase tracking-wide font-medium group-focus-within:text-purple-400 transition-colors'>What's your name?</label>
                <input 
                  required
                  type="text" 
                  id="name"
                  name="user_name" 
                  placeholder="John Doe" 
                  className='w-full bg-black/20 border-b border-white/20 rounded-t-lg py-4 px-4 text-lg text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all'
                />
              </div>

              <div className='group'>
                <label htmlFor="email" className='block text-sm text-gray-400 mb-2 uppercase tracking-wide font-medium group-focus-within:text-purple-400 transition-colors'>Your Email</label>
                <input 
                  required
                  type="email" 
                  id="email"
                  name="user_email" 
                  placeholder="john@example.com" 
                  className='w-full bg-black/20 border-b border-white/20 rounded-t-lg py-4 px-4 text-lg text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all'
                />
              </div>

              <div className='group'>
                <label htmlFor="message" className='block text-sm text-gray-400 mb-2 uppercase tracking-wide font-medium group-focus-within:text-purple-400 transition-colors'>Your Message</label>
                <textarea 
                  required
                  id="message"
                  name="message" 
                  rows="4"
                  placeholder="Tell me about your project..." 
                  className='w-full bg-black/20 border-b border-white/20 rounded-t-lg py-4 px-4 text-lg text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all resize-none'
                />
              </div>

              <div className='pt-4'>
                <button 
                  disabled={loading}
                  type="submit"
                  className='w-full relative group overflow-hidden bg-white text-black font-bold text-lg py-4 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70'
                >
                  <span className='relative z-10'>{loading ? 'Sending...' : 'Send Message'}</span>
                  {/* Hover Gradient Effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <span className='absolute inset-0 z-10 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300'>
                    {loading ? 'Sending...' : 'Send Message'}
                  </span>
                </button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Contact