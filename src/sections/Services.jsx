import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// --- 1. Official Skill Data & FIXED Logos ---
const skillsData = [
    {
        name: "JavaScript", 
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="#FFD600" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42 1.125.75.465-.675.87-1.35 1.29-2.025-.525-.435-1.065-.825-1.68-1.08-1.02-.42-2.31-.3-3.345.105-1.275.54-1.92 1.635-1.785 2.925.105 1.2.825 2.055 2.235 2.58 1.155.42 1.74.585 1.815 1.185.06.435-.15.78-.795.885-.63.12-1.35-.09-1.935-.555-.45.72-.9 1.44-1.395 2.115.84.6 1.83.945 2.865.915 1.785.03 3.03-.765 3.3-2.425zm-8.25-8.52H11.55v7.02c0 .36.015.63.135.855.18.255.495.345.9.345.39 0 .81-.075 1.185-.225l.495 2.055c-.615.27-1.365.405-2.085.345-1.335-.09-2.22-.72-2.475-2.04-.15-.81-.105-1.68-.105-2.52V9.756z"/></svg>,
        border: "hover:border-[#FFD600]/60", bg: "hover:bg-[#FFD600]/10"
    },
    {
        name: "React", 
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" width="100%" height="100%"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>,
        border: "hover:border-[#61dafb]/60", bg: "hover:bg-[#61dafb]/10"
    },
    {
        name: "Node.js", 
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="#83CD29" d="M12.007 0C5.376 0 0 5.373 0 12.003c0 6.634 5.376 12.007 12.007 12.007 6.628 0 12.004-5.373 12.004-12.007C24.01 5.373 18.635 0 12.007 0zm5.176 17.513l-5.176-2.924-5.176 2.924v-5.848l5.176-2.924 5.176 2.924v5.848z"/></svg>,
        border: "hover:border-[#83CD29]/60", bg: "hover:bg-[#83CD29]/10"
    },
    {
        name: "Java", 
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="#5382a1" d="M11.64 12.78c-.26-.14-2.82-1.28-3.32-1.39a17.2 17.2 0 0 0-2.38-.28c-1.46 0-2.44.38-2.44 2.22 0 2.21 2.39 3.32 5.09 3.58 2.3.22 4.1-.73 4.1-2.48-.02-.85-.3-1.38-1.05-1.65zm5.56.09c-1.36-.72-3.15-1.1-4.7-1.1-2.45 0-4.64 1-5.06 2.31-.2.62.24 1.49.52 1.95.83 1.34 2.96 1.99 5.56 1.99 1.77 0 3.34-.34 4.31-.96 1.11-.7 1.25-2.22.8-3.13-.12-.25-.3-.51-.51-.76a5.53 5.53 0 0 0-.92-.3zM12.44.02C8.32 1.7 6.8 5.76 8.56 7.82c-2.02-3.03.35-6.72 3.88-7.8zM15.42 0c-3.18 2.5-3.33 6.04-1.32 7.74-2.2-3.03-.41-6.72 3.03-7.55-.57-.06-1.15-.13-1.71-.19zM6.92 20.37c3.84 1.78 8.44.88 10.3-.77.34-.3.65-.63.92-.98 1.17 1.05 3.59 1.05 3.59 1.05.57 3.32-2.14 4.19-3.21 4.33H18.5c-4.13 0-8.23-1.4-11.58-3.63zM21.73 17.5c-.14-1.36-.77-2.61-1.77-3.51.52-.28 1.02-.56 1.5-.86.92-.58 1.63-1.42 1.9-2.21.37-1.07.12-2.31-.97-3.21-1.4-1.14-3.56-1.55-5.91-1.28.32-.87.41-1.5.09-2.09-.54-.98-1.84-1.42-3.37-1.36-2.9.11-4.66 1.88-5.75 3.65C6.44 5.95 6.27 5.43 6.13 5c-2.46.22-4.22.95-4.8 1.95-.69 1.19-.07 2.76 1.57 4.14.7.6 1.53 1.08 2.45 1.46-2.9 1.16-4.5 3.16-4.5 5.57C.85 22.82 5.99 24 11.4 24c5.07 0 9.21-1.79 9.21-3.98 0-.3-.08-.59-.22-.87.5-.47.96-1.01 1.34-1.65z"/></svg>,
        border: "hover:border-[#5382a1]/60", bg: "hover:bg-[#5382a1]/10"
    },
    {
        name: "PostgreSQL", 
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="#336791" d="M11.95 0C5.35 0 0 5.35 0 11.95c0 6.6 5.35 11.95 11.95 11.95 6.6 0 11.95-5.35 11.95-11.95S18.55 0 11.95 0zm6.65 6c-2.25 0-3.9 1.25-5.15 3.55h-2.1v2.1h1.1v1.1h-1.1v2.1h1.1v1.1h-1.1v2.2c0 1.9 2.15 2.5 4.5 2.5 3.2 0 6.05-1.4 8.05-3.6-.65-1.75-2.55-3-4.7-3-.75 0-1.45.15-2.1.4-.5-.4-.9-1.1-.9-1.85 0-.9.7-1.5 2.1-1.5h1.75v-1.1c-2.4 0-3.85 1.3-3.85 3.25 0 1.25.75 2.2 1.7 2.85h1.25c.75-.25 1.5-.4 2.3-.4 1.35 0 2.65.4 3.7 1.1.2-1.35.35-2.75.35-4.2C24.35 8.3 21.05 6 18.6 6zM7.85 15.6c-.95 0-1.75-.2-2.45-.55v-1.1h1.1v-1.1h-1.1v-1.1h1.1v-1.1h-1.1V9.5h3.35c2.35 0 4.3 1.1 5.25 3.35.1 1.05.2 2.1.2 3.2 0 2.1-1.4 3.25-4.25 3.25-1.95 0-3.05-.25-4.1-.7v-1.85c1 .55 1.45.85 2 .85z"/></svg>,
        border: "hover:border-[#336791]/60", bg: "hover:bg-[#336791]/10"
    },
];

const SkillCard = ({ data }) => {
    return (
        <div 
            className={`group relative h-14 w-full rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm flex items-center justify-start px-4 gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${data.border} ${data.bg}`}
        >
            <div className="w-6 h-6 flex-shrink-0">
                {data.icon}
            </div>
            <span className="text-sm font-bold tracking-wide text-gray-300 group-hover:text-white transition-colors">
                {data.name}
            </span>
        </div>
    );
};

const About = () => {
    const containerRef = useRef(null)
    const lineRef = useRef(null)
    const glowRef = useRef(null)

    // --- CHRONOLOGICAL ORDER (Oldest to Newest) ---
    const educationData = [
        {
            year: "2023 - 2027 (Expected)", 
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

    useGSAP(() => {
        gsap.from(".edu-header", {
            y: 50, opacity: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
        });

        gsap.to(".bg-blob", {
            y: "30%", ease: "none",
            scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
        });

        const tl = gsap.timeline({
            scrollTrigger: { trigger: ".timeline-container", start: "top 70%", end: "bottom 80%", scrub: 1 }
        });
        tl.to(lineRef.current, { height: "100%", ease: "none" });
        tl.to(glowRef.current, { top: "100%", ease: "none" }, "<");

        gsap.from(".edu-card", {
            y: 50, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: ".timeline-container", start: "top 75%" }
        });

        gsap.from(".skill-card-anim", {
            y: 20, opacity: 0, stagger: 0.05, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: ".skills-container", start: "top 85%" }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className='relative z-10 bg-zinc-950 text-white py-20 lg:py-32 overflow-hidden rounded-t-[50px] -mt-10'>
            
            <div className='bg-blob absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none'></div>
            <div className='bg-blob absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none'></div>

            <div className='container mx-auto px-6 md:px-12'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24'>

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

                    <div className='lg:col-span-8 timeline-container relative py-4'>
                        <div className='absolute left-[27px] top-0 bottom-0 w-[2px] bg-zinc-800 rounded-full'></div>
                        <div ref={lineRef} className='absolute left-[27px] top-0 w-[2px] h-0 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(34,211,238,0.6)] rounded-full z-10'></div>
                        <div ref={glowRef} className='absolute left-[21px] top-0 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)] z-20 -translate-y-1/2'></div>

                        <div className='flex flex-col gap-16'>
                            {educationData.map((item, index) => (
                                <div key={index} className='edu-card relative grid grid-cols-[auto_1fr] gap-6 md:gap-10 group'>
                                    <div className='relative w-14'>
                                        <div className='w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center z-10 relative group-hover:scale-110 group-hover:border-white/30 transition-transform duration-500'>
                                            <svg className={`w-6 h-6 ${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                                        </div>
                                    </div>
                                    <div className={`p-6 md:p-8 rounded-2xl bg-zinc-900/40 border border-white/5 ${item.border} backdrop-blur-sm hover:bg-zinc-900/60 transition-all duration-500 group-hover:-translate-y-2`}>
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

export default About;