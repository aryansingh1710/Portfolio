import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// --- STATIC DATA (Moved outside component) ---
const skillsData = [
    {
        name: "JavaScript", 
        img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        border: "hover:border-[#FFD600]/60", bg: "hover:bg-[#FFD600]/10"
    },
    {
        name: "React", 
        img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        border: "hover:border-[#61dafb]/60", bg: "hover:bg-[#61dafb]/10"
    },
    {
        name: "Node.js", 
        img: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
        border: "hover:border-[#83CD29]/60", bg: "hover:bg-[#83CD29]/10"
    },
    {
        name: "Java", 
        img: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
        border: "hover:border-[#5382a1]/60", bg: "hover:bg-[#5382a1]/10"
    },
    {
        name: "PostgreSQL", 
        img: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
        border: "hover:border-[#336791]/60", bg: "hover:bg-[#336791]/10"
    },
];

const educationData = [
    {
        year: "2023 - 2027", 
        degree: "B.Tech in Computer Science", 
        school: "Kashi Institute of Technology", 
        desc: "Specializing in Artificial Intelligence and Full Stack Development.", 
        color: "text-cyan-400", 
        border: "group-hover:border-cyan-500/50"
    },
    {
        year: "2023 - Present", 
        degree: "Web Development", 
        school: "Freelance & Personal Projects",
        desc: "Creating responsive, modern web interfaces with React, Tailwind, and Node.js.", 
        color: "text-blue-400", 
        border: "group-hover:border-blue-500/50"
    },
    {
        year: "2024 - Present", 
        degree: "Java Developer", 
        school: "Self-Initiated / Projects",
        desc: "Mastering Data Structures & Algorithms (DSA) and building scalable backend systems with Java.", 
        color: "text-orange-400", 
        border: "group-hover:border-orange-500/50"
    }
];

const SkillCard = ({ data }) => {
    return (
        <div 
            // OPTIMIZATION: Removed 'backdrop-blur-sm' for performance. 
            // Use 'transform-gpu' to ensure hover state is smooth.
            className={`group relative h-14 w-full rounded-xl border border-white/10 bg-zinc-900/80 flex items-center justify-start px-4 gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg transform-gpu ${data.border} ${data.bg}`}
        >
            <div className="w-6 h-6 flex-shrink-0">
                <img 
                    src={data.img} 
                    alt={data.name} 
                    loading="lazy" 
                    decoding="async"
                    className="w-full h-full object-contain"
                />
            </div>
            <span className="text-sm font-bold tracking-wide text-gray-300 group-hover:text-white transition-colors">
                {data.name}
            </span>
        </div>
    );
};

const Education = () => { 
    const containerRef = useRef(null)
    const lineRef = useRef(null)
    const glowRef = useRef(null)

    useGSAP(() => {
        // Header
        gsap.from(".edu-header", {
            y: 50, opacity: 0, duration: 1, ease: "power3.out",
            force3D: true, // OPTIMIZATION
            scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
        });

        // Background Blob Animation (Simpler movement)
        gsap.to(".bg-blob", {
            y: "30%", ease: "none",
            force3D: true, // OPTIMIZATION
            scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
        });

        // Timeline Line
        const tl = gsap.timeline({
            scrollTrigger: { trigger: ".timeline-container", start: "top 70%", end: "bottom 80%", scrub: 1 }
        });

        tl.fromTo(lineRef.current, 
            { scaleY: 0, transformOrigin: "top" }, 
            { scaleY: 1, ease: "none", force3D: true }
        );
        
        // Glowing Dot
        tl.fromTo(glowRef.current,
            { y: 0 },
            { y: "100%", ease: "none", force3D: true }, 
            "<"
        );

        // Education Cards
        gsap.from(".edu-card", {
            y: 50, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power3.out",
            force3D: true, // OPTIMIZATION
            scrollTrigger: { trigger: ".timeline-container", start: "top 75%" }
        });

        // Skills
        gsap.from(".skill-card-anim", {
            y: 20, opacity: 0, stagger: 0.05, duration: 0.5, ease: "power2.out",
            force3D: true, // OPTIMIZATION
            scrollTrigger: { trigger: ".skills-container", start: "top 85%" }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className='relative z-10 bg-zinc-950 text-white py-20 lg:py-32 overflow-hidden rounded-t-[50px] -mt-10'>
            
            {/* OPTIMIZATION: Replaced CSS Blur with Radial Gradients */}
            {/* This mimics the glow without the heavy render cost */}
            <div 
                className='bg-blob absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none will-change-transform opacity-30'
                style={{ background: 'radial-gradient(circle, rgba(22, 78, 99, 0.6) 0%, rgba(9, 9, 11, 0) 70%)' }}
            ></div>
            
            <div 
                className='bg-blob absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none will-change-transform opacity-30'
                style={{ background: 'radial-gradient(circle, rgba(88, 28, 135, 0.6) 0%, rgba(9, 9, 11, 0) 70%)' }}
            ></div>

            <div className='container mx-auto px-6 md:px-12'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24'>

                    {/* Left Side */}
                    <div className='lg:col-span-4 relative'>
                        <div className='lg:sticky lg:top-32'>
                            
                            <div className='edu-header mb-12'>
                                <div className='flex items-center gap-4 mb-6'>
                                    <span className='h-[1px] w-12 bg-gray-500'></span>
                                    <span className='text-sm font-bold uppercase tracking-[0.3em] text-gray-500'>Overview</span>
                                </div>
                                <h2 className='text-4xl md:text-5xl font-heading font-bold leading-tight mb-6'>
                                    Education & <br />
                                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400'>
                                        My Journey.
                                    </span>
                                </h2>
                                <p className='text-gray-400 text-lg leading-relaxed max-w-sm'>
                                    A timeline of my academic path and the milestones that have shaped my technical expertise.
                                </p>
                            </div>

                            <div className="skills-container">
                                <h4 className='text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6'>Core Technologies</h4>
                                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3'>
                                    {skillsData.map((skill, index) => (
                                        <div key={index} className="skill-card-anim">
                                            <SkillCard data={skill} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Side: Timeline */}
                    <div className='lg:col-span-8 timeline-container relative py-4'>
                        {/* Static Line */}
                        <div className='absolute left-[27px] top-0 bottom-0 w-[2px] bg-zinc-800 rounded-full'></div>
                        
                        {/* Animated Line */}
                        <div ref={lineRef} className='absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(34,211,238,0.4)] rounded-full z-10 origin-top will-change-transform'></div>
                        
                        {/* Glowing Dot */}
                        <div className="absolute left-[21px] top-0 bottom-0 w-3.5 pointer-events-none z-20">
                             <div ref={glowRef} className='w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] will-change-transform'></div>
                        </div>

                        <div className='flex flex-col gap-16'>
                            {educationData.map((item, index) => (
                                <div key={index} className='edu-card relative grid grid-cols-[auto_1fr] gap-6 md:gap-10 group'>
                                    <div className='relative w-14'>
                                        <div className='w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center z-10 relative group-hover:scale-110 group-hover:border-white/30 transition-transform duration-500'>
                                            <svg className={`w-6 h-6 ${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                                        </div>
                                    </div>
                                    {/* OPTIMIZATION: Removed backdrop-blur-sm, increased bg opacity */}
                                    <div className={`p-6 md:p-8 rounded-2xl bg-zinc-900/80 border border-white/5 ${item.border} hover:bg-zinc-900 transition-colors duration-300 transform-gpu group-hover:-translate-y-2`}>
                                        <span className={`inline-block px-3 py-1 rounded-full bg-white/5 ${item.color} text-xs font-bold uppercase tracking-wider mb-3`}>{item.year}</span>
                                        <h3 className='text-xl md:text-2xl font-bold text-white mb-1'>{item.degree}</h3>
                                        <h4 className='text-gray-400 font-medium text-sm md:text-base mb-4'>{item.school}</h4>
                                        <p className='text-gray-400 text-sm leading-relaxed'>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Education;