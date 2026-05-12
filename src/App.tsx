import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { ArrowUpRight, Cpu, Network, Database, Terminal, Code2, ChevronRight, Activity, Layers } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { trackEvent, useAnalyticsTracking } from './lib/analytics';
import { CookieConsent } from './components/CookieConsent';

const DATA = {
  name: 'Bechir Guerriche',
  title: 'Data Intelligence & System Architect',
  email: 'bechirguerriche@gmail.com',
  instagram: '@bechirg',
  linkedin: 'https://linkedin.com/in/guerriche-bechir',
  city: 'Tunis, Tunisia',
  years: '3+',
  intro: "I am a curious mind driven by innovation, data, and purpose. After building a solid foundation in Full-Stack development, I realized that writing code was just the beginning. Today, I'm pursuing a Master's degree in Business Intelligence at Iset Rades, deepening my understanding of how technology and data come together to tell meaningful stories, optimize performance, and guide strategy. I believe in the power of data with purpose, technology with meaning, and bridging technical expertise with human impact.",
  skills: {
    core: ['React', 'Node.js', 'Python', 'Java', 'PHP', 'Angular', 'Symfony'],
    database: ['MongoDB', 'SQL', 'Data Analytics', 'BI'],
    tools: ['Git', 'Scrum', 'UML', 'Data Scraping', 'OpenAI Integrations']
  },
  experience: [
    {
      role: 'Software Engineering Intern',
      company: 'Access Content Agency',
      period: 'Jan 2025 – May 2025',
      description: 'Developed "Colab", a platform for collaborations between advertisers and content creators. Implemented automated scoring using Instagram data scraping and OpenAI GPT. Built with MERN stack.'
    },
    {
      role: 'Advanced Intern',
      company: 'Soroubat',
      period: 'Jan 2024 – Feb 2024',
      description: 'Designed and deployed a Real Estate Management Application with complete technical specifications, intuitive dashboards, and system modeling.'
    },
    {
      role: 'Swimming Coach',
      company: 'CNBA',
      period: 'Nov 2023 – Present',
      description: 'Planning and leading training sessions for different skill levels. Helping others build discipline, motor skills, and self-confidence.'
    },
    {
      role: 'Summer Intern',
      company: 'Smartitek',
      period: 'Jun 2023 – Aug 2023',
      description: 'Analyzed requirements, designed UML diagrams, and deployed a Stock Management Application.'
    }
  ],
  education: [
    {
      degree: "Master's Degree in Business Intelligence",
      institution: 'Higher Institute of Technological Studies of Rades (Iset Rades)',
      period: '2025 – Present'
    },
    {
      degree: "Bachelor's Degree in Computer Science and Technology",
      institution: 'Higher Institute of Technological Studies of Zaghouan',
      period: '2022 – 2025'
    },
    {
      degree: "Baccalaureate Diploma in Computer Science",
      institution: 'Ben Arous High School',
      period: '2021 – 2022'
    }
  ],
  activities: [
    {
      title: 'Hackathon Mission 3.0 Winner',
      description: 'Secured 1st spot with "Chahrity", a solution addressing employment injustice, powered by HiiL.'
    },
    {
      title: 'Finance & Sponsorship Manager',
      organization: 'Enactus ISET Zaghouan',
      description: 'Lead Nopaleer, a sustainable cactus leather alternative (90% less water, 86% less CO2). Secured 3rd place National Exposition, Race4Green Finalist, and featured on IFM radio.'
    },
    {
      title: 'Hack for Heritage',
      description: 'Participated in the Hack for Heritage Hackathon, building tech solutions to preserve cultural heritage.'
    }
  ],
  projects: [
    {
      id: 1,
      name: 'Colab',
      category: 'Platform / AI',
      description: 'Analysis and Management Platform for Advertiser-Content Creator Collaborations. Features an automated creator scoring system using public Instagram scraping and OpenAI GPT for content analysis.',
      image: '/acces-pfe-project.jpg',
    },
    {
      id: 2,
      name: 'Nopaleer',
      category: 'Sustainable Tech',
      description: 'Sustainable cactus-based vegan leather alternative. 90% less water usage, 86% reduced carbon emissions. 3rd place at Enactus Tunisia National Exposition 2024.',
      image: '/nopaleer.png',
    },
    {
      id: 3,
      name: 'Soroubat Real Estate',
      category: 'Web App',
      description: 'Custom Real Estate Management System with intuitive dashboards for project monitoring and document management. Built with MongoDB, React, Node.js.',
      image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1600&auto=format&fit=crop',
    },
    {
      id: 4,
      name: 'The Parisian',
      category: 'E-commerce',
      description: 'Specialized makeup retailer management platform with real-time interactive sales and stock dashboards.',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1600&auto=format&fit=crop',
    },
  ],
  highlights: [
    {
      id: 1,
      title: "Hackathon Triumphs",
      description: "Participated in 5+ hackathons including Hack for Heritage and emerged as the winner of the Gotham Hackathon Mission 3.0.",
      image: '/hakathon-wining-mission.3.0.jpg'
    },
    {
      id: 2,
      title: "Radio Feature",
      description: "Featured on Express FM and IFM's 'Etudionet' with Aziz Bachtarzi, presenting Nopaleer and discussing the future of sustainable vegan leather.",
      image: '/radio-talk-about-our-club-expressfm.jpg'
    },
    {
      id: 3,
      title: "Ambassadorial Visit",
      description: "Honored to welcome Ambassadrice Anne Guéguen at ISET Zaghouan to present Nopaleer's eco-friendly innovations in vegan leather production.",
      image: '/ambassadrice.png',
    },
    {
      id: 4,
      title: "National Podium",
      description: "Secured 3rd place at the Enactus Tunisia National Exposition 2024 presenting Nopaleer, our sustainable vegan leather.",
      image: '/third-place-in-national-compet-enactus.jpg',
    }
  ],
  images: {
    hero: '/hero.JPG',
  }
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`perspective-1000 w-full rounded-2xl ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none transform translate-z-20 mix-blend-overlay"></div>
      {children}
    </motion.div>
  );
};


export default function App() {
  useAnalyticsTracking();

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text bg-grid-texture selection:bg-brand-accent selection:text-brand-bg relative overflow-x-hidden flex flex-col font-sans">
      <Helmet>
        <title>{DATA.name} | {DATA.title}</title>
        <meta name="description" content={DATA.intro} />
        <meta name="keywords" content="Portfolio, Software Engineer, Business Intelligence, Data Analytics, React, Node.js" />
        <meta property="og:title" content={`${DATA.name} | ${DATA.title}`} />
        <meta property="og:description" content={DATA.intro} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DATA.images.hero} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${DATA.name} | ${DATA.title}`} />
        <meta name="twitter:description" content={DATA.intro} />
        <meta name="twitter:image" content={DATA.images.hero} />
        <link rel="canonical" href="https://guerriche.dev" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": DATA.name,
            "jobTitle": DATA.title,
            "url": "https://guerriche.dev",
            "sameAs": [
              DATA.linkedin,
              `https://instagram.com/${DATA.instagram.replace('@', '')}`
            ],
            "knowsAbout": [
              "Business Intelligence",
              "System Architecture",
              "Data Analytics",
              "Software Engineering",
              "React",
              "Node.js",
              "Artificial Intelligence"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": `${DATA.name} | Portfolio`,
            "url": "https://guerriche.dev",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://guerriche.dev/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <CustomCursor />
      
      {/* 3D Deep Space Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none perspective-1000 opacity-30">
        <motion.div 
          animate={{ rotateX: [60, 60], translateY: [0, 50] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-100%] border-brand-accent/10 bg-[linear-gradient(rgba(255,106,0,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(255,106,0,0.1)_2px,transparent_2px)] bg-[size:100px_100px]"
          style={{ transformOrigin: 'top center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent" />
      </div>

      {/* Cyber glowing orb background */}
      <motion.div 
        className="fixed top-[-20%] left-[20%] w-[60%] h-[60%] bg-brand-accent/10 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <main className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex flex-col flex-1">
        {/* TOP HUD HEADER */}
        <header className="flex justify-between items-end border-b border-brand-accent/10 pb-4 mb-24 relative backdrop-blur-md sticky top-0 z-50 pt-4">
          <div className="flex flex-col">
            <span className="text-brand-accent text-[10px] font-mono tracking-widest uppercase mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-accent animate-pulse rounded-full shadow-[0_0_10px_var(--color-brand-accent)]" />
              Intelligence Core Active
            </span>
            <div className="text-2xl font-bold tracking-tighter uppercase neon-glow flex items-center gap-2">
              <Layers className="text-brand-accent w-6 h-6" />
              {DATA.name}
            </div>
          </div>
          <nav className="hidden md:flex gap-12 text-xs uppercase font-mono tracking-[0.2em] text-brand-muted font-bold">
            <a href="#projects" className="hover:text-brand-accent hover:neon-glow transition-all hover-target translate-y-0 hover:-translate-y-1">Projects</a>
            <a href="#about" className="hover:text-brand-accent hover:neon-glow transition-all hover-target translate-y-0 hover:-translate-y-1">Architecture</a>
            <a href="#contact" className="text-brand-accent hover:text-white hover:neon-glow transition-all hover-target translate-y-0 hover:-translate-y-1">Connect</a>
          </nav>
        </header>

        {/* HERO - 3D Layout */}
        <motion.section 
          style={{ y: heroY, opacity: opacityHero, scale: scaleHero }}
          className="flex-1 min-h-[70vh] flex flex-col justify-center relative z-10 mb-32 perspective-1000"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center preserve-3d">
            <div className="md:col-span-7 flex flex-col justify-center relative z-20">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="mb-8 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-brand-accent flex flex-wrap items-center gap-3 drop-shadow-[0_0_15px_rgba(255,106,0,0.5)]"
              >
                <Terminal size={16} className="flex-shrink-0" />
                <span className="leading-relaxed">{DATA.title}</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[5.5rem] leading-[1.1] font-black uppercase tracking-tighter mb-8 text-white relative z-10 text-glow">
                <div className="overflow-hidden py-2">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, type: "spring", bounce: 0.4 }}>
                    Next Level
                  </motion.div>
                </div>
                <div className="overflow-hidden py-2">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.1 }} className="flex flex-wrap items-center gap-x-4">
                    Data <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-accent to-orange-700 select-none">Systems.</span>
                  </motion.div>
                </div>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
                className="max-w-xl text-lg opacity-90 leading-relaxed font-sans border-l-4 border-brand-accent pl-6 py-2 glass-3d rounded-r-2xl"
              >
                Building scalable software architectures, optimizing business intelligence models, and engineering sustainable technical solutions. Based in {DATA.city}.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
                className="mt-12 flex gap-4 flex-wrap preserve-3d translate-z-20"
              >
                {["System Architecture", "BI Models", "Full-Stack"].map((tag, i) => (
                  <div key={i} className="glass-3d px-6 py-3 text-xs font-bold font-mono uppercase tracking-widest text-brand-accent flex items-center gap-2 rounded-xl border border-brand-accent/20 hover:border-brand-accent hover:bg-brand-accent/10 transition-all hover:scale-105 hover:-translate-y-1 shadow-lg">
                    <Activity size={14} />
                    {tag}
                  </div>
                ))}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
                className="mt-8 flex gap-4 preserve-3d translate-z-20"
              >
                <a 
                  href="/CV_Bechir_Guerriche.pdf" 
                  download="CV_Bechir_Guerriche.pdf"
                  onClick={() => trackEvent('resume_download', { file_name: 'CV_Bechir_Guerriche.pdf' })}
                  className="px-6 py-3 rounded-xl bg-brand-accent text-brand-bg font-mono text-xs md:text-sm uppercase tracking-widest font-bold hover:shadow-[0_0_20px_rgba(255,106,0,0.6)] hover:bg-brand-accent/90 transition-all flex items-center gap-2 hover-target"
                >
                  Download Data Core [CV]
                </a>
              </motion.div>
            </div>

            {/* 3D Floating Elements */}
            <div className="md:col-span-5 relative h-[350px] md:h-[450px] preserve-3d">
               <TiltCard className="absolute inset-0 group h-full w-full">
                  <div className="w-full h-full glass-3d rounded-3xl overflow-hidden relative border border-brand-accent/30 shadow-[0_20px_50px_rgba(255,106,0,0.15)] flex items-center justify-center">
                     {/* Inner glowing core */}
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                       className="absolute w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,106,0,0.4)_360deg)]"
                     />
                     <div className="absolute inset-1 bg-brand-bg rounded-3xl z-10 overflow-hidden flex items-center justify-center p-8">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.1)_0%,transparent_70%)]" />
                       
                       {/* Hero Image Container */}
                       <div className="relative w-full h-full preserve-3d translate-z-50 p-2 md:p-4 rounded-2xl overflow-hidden">
                          {/* Tech corner brackets */}
                          <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-brand-accent translate-z-50 pointer-events-none z-30" />
                          <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-brand-accent translate-z-50 pointer-events-none z-30" />
                          <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-brand-accent translate-z-50 pointer-events-none z-30" />
                          <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-brand-accent translate-z-50 pointer-events-none z-30" />
                          
                          <motion.img 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            src={DATA.images.hero} 
                            alt="Hero Portrait" 
                            className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl transform translate-z-20 pointer-events-none filter brightness-50 contrast-125 saturate-50"
                          />
                          
                          {/* Scanning line effect */}
                          <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute left-2 right-2 h-[2px] bg-brand-accent/50 translate-z-50 pointer-events-none blur-[1px] shadow-[0_0_15px_rgba(255,106,0,1)] z-40"
                          />
                          
                          {/* Subtle tech overlays */}
                          <div className="absolute inset-0 bg-black/40 z-10 translate-z-20 pointer-events-none rounded-2xl" />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-transparent z-10 translate-z-20 pointer-events-none rounded-2xl" />
                          <div className="absolute inset-0 mix-blend-overlay z-10 translate-z-20 pointer-events-none rounded-2xl bg-[linear-gradient(rgba(255,106,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] opacity-30" />
                       </div>
                     </div>
                  </div>
                  
                  {/* Floating badge */}
                  <motion.div 
                    className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 md:-bottom-10 md:-left-10 glass-3d p-4 md:p-6 z-50 rounded-2xl border border-brand-accent/50 shadow-2xl translate-z-80 w-[90%] sm:w-auto"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="font-mono text-xs uppercase font-bold text-brand-accent mb-3 tracking-widest flex justify-between items-center bg-brand-accent/10 px-3 py-1 rounded gap-4">
                      <span>Status</span> 
                      <span className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-accent animate-ping rounded-full"/><span className="animate-pulse">[ Active ]</span></span>
                    </div>
                    <div className="text-base font-sans font-bold leading-tight">Master's BI @ Iset Rades</div>
                  </motion.div>
               </TiltCard>
            </div>
          </div>
        </motion.section>

        {/* PROJECTS - 3D Grid */}
        <section id="projects" className="py-32 relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-accent/10 blur-xl rounded-full z-0 pointer-events-none" />
              <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-4 relative z-10">[ DATA.PROJECTS ]</h3>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter relative z-10 text-glow">System Deployments</h2>
            </div>
            <div className="flex gap-8 glass-3d px-8 py-4 rounded-2xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-accent drop-shadow-[0_0_15px_rgba(255,106,0,0.8)]">12+</div>
                <div className="text-xs font-mono uppercase font-bold tracking-widest text-brand-text mt-2">Deployments</div>
              </div>
              <div className="w-[1px] bg-brand-accent/20" />
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-accent drop-shadow-[0_0_15px_rgba(255,106,0,0.8)]">0{DATA.years}</div>
                <div className="text-xs font-mono uppercase font-bold tracking-widest text-brand-text mt-2">Years Exp</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 perspective-1000">
            {DATA.projects.map((project, idx) => (
              <ProjectCard3D key={project.id} project={project} index={idx} />
            ))}
          </div>
        </section>

        {/* HIGHLIGHTS CAROUSEL / GRID (NEW ADDITION) */}
        <section className="py-32 relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
          
          <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-4 text-center">[ SYS.LOG: HIGHLIGHTS ]</h3>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-20 text-center text-glow">Achievement Logs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
             {DATA.highlights.map((item, i) => (
                <TiltCard key={item.id} className="h-full group">
                  <motion.div 
                    initial={{ opacity: 0, y: 50, rotateX: -20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
                    className="glass-3d h-full rounded-2xl overflow-hidden flex flex-col relative preserve-3d border border-brand-accent/20 hover:border-brand-accent/60 transition-colors duration-500"
                  >
                    <div className="h-48 md:h-56 relative overflow-hidden bg-black flex items-center justify-center p-4">
                       <div className="absolute inset-0 bg-brand-accent/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                       {item.image && (
                         <img 
                           src={item.image} 
                           alt={item.title} 
                           className="w-full h-full object-contain filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 relative z-0 pointer-events-none" 
                         />
                       )}
                       <div className="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent z-20 top-1/2 pointer-events-none" />
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col relative preserve-3d translate-z-20 -mt-12 z-30 pointer-events-none">
                       <div className="text-[10px] font-mono tracking-widest text-brand-accent bg-brand-bg border border-brand-accent/50 px-3 py-1 rounded-full w-fit mb-4 shadow-[0_0_10px_rgba(255,106,0,0.2)]">
                         [ RECORD: 0{i+1} ]
                       </div>
                       <h4 className="text-2xl font-bold uppercase mb-4 group-hover:text-brand-accent transition-colors">{item.title}</h4>
                       <p className="text-sm opacity-80 leading-relaxed font-sans">{item.description}</p>
                    </div>
                  </motion.div>
                </TiltCard>
             ))}
          </div>
        </section>

        {/* ARCHITECTURE (About / Skills) */}
        <section id="about" className="py-32 relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5 relative preserve-3d perspective-1000">
               <TiltCard>
                 <div className="glass-3d p-10 rounded-3xl relative overflow-hidden border border-brand-accent/30 shadow-[0_0_50px_rgba(255,106,0,0.1)] translate-z-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 blur-3xl rounded-full pointer-events-none" />
                    <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-8">[ ROOT.BIOGRAPHY ]</h3>
                    <p className="text-xl leading-relaxed opacity-90 font-sans">
                      {DATA.intro}
                    </p>
                 </div>
               </TiltCard>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-12 perspective-1000">
               <TiltCard>
                  <div className="glass-3d p-8 rounded-3xl border border-brand-accent/20 preserve-3d translate-z-20">
                    <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-6 flex items-center gap-3">
                      <Database size={18} /> [ ASSET.DATA_TOOLS ]
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {[...DATA.skills.database, ...DATA.skills.tools].map((tool, i) => (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          key={tool} 
                          className="bg-brand-bg/80 border border-brand-accent/30 px-5 py-3 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-brand-accent hover:text-brand-bg hover:shadow-[0_0_15px_rgba(255,106,0,0.6)] transition-all cursor-default"
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>
               </TiltCard>
               
               <TiltCard>
                  <div className="glass-3d p-8 rounded-3xl border border-brand-accent/20 preserve-3d translate-z-20">
                    <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-6 flex items-center gap-3">
                      <Code2 size={18} /> [ ASSET.CORE_STACK ]
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {DATA.skills.core.map((skill, i) => (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          key={skill} 
                          className="bg-brand-bg/80 border border-brand-accent/30 px-5 py-3 rounded-xl text-xs uppercase font-bold tracking-widest text-brand-text hover:border-brand-accent hover:shadow-[0_0_15px_rgba(255,106,0,0.3)] transition-all cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
               </TiltCard>
            </div>
          </div>
        </section>

        {/* LOGS (Experience & Education) */}
        <section className="py-32 relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Experience */}
            <div>
              <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-12 flex items-center gap-4">
                 <span className="w-12 h-[1px] bg-brand-accent"></span>
                 [ SYS.LOG: EXPERIENCE ]
              </h3>
              <div className="flex flex-col gap-8 relative border-l-2 border-brand-accent/20 pl-8 ml-4">
                {DATA.experience.map((exp, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    key={i} 
                    className="glass-3d p-8 rounded-2xl relative group hover:border-brand-accent/50 transition-colors"
                  >
                    <div className="absolute top-10 -left-[35px] w-4 h-4 rounded-full bg-brand-bg border-2 border-brand-accent group-hover:bg-brand-accent group-hover:shadow-[0_0_15px_rgba(255,106,0,0.8)] transition-all z-10" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                      <div>
                        <div className="text-xs font-mono uppercase font-bold tracking-widest text-brand-accent mb-2">{exp.company}</div>
                        <h4 className="text-2xl font-black">{exp.role}</h4>
                      </div>
                      <div className="text-[10px] font-mono uppercase font-bold tracking-widest bg-brand-accent/10 border border-brand-accent/30 px-3 py-1.5 rounded-full whitespace-nowrap text-brand-accent shadow-[0_0_10px_rgba(255,106,0,0.1)]">
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-base opacity-80 leading-relaxed font-sans">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education & Extracurricular */}
            <div className="flex flex-col gap-20">
               <div>
                 <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-12 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-brand-accent"></span>
                    [ SYS.LOG: EDUCATION ]
                 </h3>
                 <div className="flex flex-col gap-6">
                   {DATA.education.map((edu, i) => (
                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: i * 0.1 }}
                       key={i} 
                       className="glass-3d p-6 rounded-2xl border-l-4 border-l-brand-accent"
                     >
                       <div className="flex justify-between items-start gap-4 mb-3">
                          <h4 className="text-lg font-bold">{edu.degree}</h4>
                          <div className="text-[10px] font-mono uppercase font-bold tracking-widest bg-brand-accent/10 px-2 py-1 rounded text-brand-accent flex-shrink-0">{edu.period}</div>
                       </div>
                       <div className="text-sm opacity-70 font-mono text-brand-muted">{edu.institution}</div>
                     </motion.div>
                   ))}
                 </div>
               </div>

               <div>
                 <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-12 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-brand-accent"></span>
                    [ EXTRA.CURRICULAR ]
                 </h3>
                 <div className="flex flex-col gap-6">
                   {DATA.activities.map((act, i) => (
                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: i * 0.1 }}
                       key={i} 
                       className="glass-3d p-6 rounded-2xl hover:bg-brand-accent/5 transition-all group border border-transparent hover:border-brand-accent/30"
                     >
                       <h4 className="text-xl font-bold mb-3 group-hover:text-brand-accent transition-colors">{act.title}</h4>
                       {act.organization && <div className="text-[10px] font-mono uppercase font-bold tracking-widest text-brand-text mb-4 bg-brand-bg border border-brand-accent/20 w-fit px-3 py-1 rounded-md">{act.organization}</div>}
                       <p className="text-sm opacity-80 leading-relaxed font-sans">{act.description}</p>
                     </motion.div>
                   ))}
                 </div>
               </div>
            </div>
            
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="py-24 relative z-20 flex flex-col items-center gap-12 text-center mt-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50 pointer-events-none" />
          
          <div className="relative">
            <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full pointer-events-none" />
            <div className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-6 relative z-10">[ END OF TRANSMISSION ]</div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 relative z-10 text-glow">Initiate Contact</h2>
            
            <TiltCard className="inline-block relative z-10">
               <a 
                 href={`mailto:${DATA.email}`} 
                 onClick={() => trackEvent('contact_click', { method: 'email' })}
                 className="block glass-3d px-8 md:px-12 py-6 rounded-2xl text-xl md:text-2xl font-bold text-brand-text border border-brand-accent/40 hover:bg-brand-accent hover:text-brand-bg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,106,0,0.6)] hover-target"
               >
                 {DATA.email}
               </a>
            </TiltCard>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <TiltCard>
              <a 
                href={DATA.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => trackEvent('social_click', { platform: 'LinkedIn' })}
                className="flex items-center gap-4 glass-3d px-8 py-4 rounded-xl hover:bg-brand-accent/10 transition-colors hover:border-brand-accent border border-transparent group hover-target w-full sm:w-auto relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-lg bg-brand-bg border border-brand-accent/30 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-shadow">
                  <Network className="text-brand-accent" size={18} />
                </div>
                <span className="font-bold tracking-widest font-mono uppercase text-sm">LinkedIn</span>
              </a>
            </TiltCard>
            
            <TiltCard>
              <a 
                href={`https://instagram.com/${DATA.instagram.replace('@','')}`} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => trackEvent('social_click', { platform: 'Instagram' })}
                className="flex items-center gap-4 glass-3d px-8 py-4 rounded-xl hover:bg-brand-accent/10 transition-colors hover:border-brand-accent border border-transparent group hover-target w-full sm:w-auto relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-lg bg-brand-bg border border-brand-accent/30 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-shadow">
                  <Activity className="text-brand-accent" size={18} />
                </div>
                <span className="font-bold tracking-widest font-mono uppercase text-sm">Instagram</span>
              </a>
            </TiltCard>
          </div>
        </footer>
      </main>

      <CookieConsent />
    </div>
  );
}

// Subcomponent for 3D Project Grid Item
const ProjectCard3D: import('react').FC<{ project: any; index: number }> = ({ project, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.3 }}
      className="preserve-3d"
    >
      <TiltCard className="h-full group hover-target cursor-pointer" onClick={() => trackEvent('project_view', { project_name: project.name })}>
        <div className="glass-3d flex flex-col rounded-2xl md:rounded-3xl overflow-hidden h-full border border-brand-accent/20 preserve-3d relative">
          <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden bg-black p-4 md:p-6 preserve-3d md:translate-z-20 border-b border-brand-accent/20">
            <div className="absolute inset-0 bg-brand-accent/20 mix-blend-color z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
            <img 
              src={project.image} 
              alt={project.name} 
              className="w-full h-full object-contain filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110 md:group-hover:translate-z-20 relative z-0 pointer-events-none"
            />
            {/* Tech Corner Specs */}
            <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20 glass-3d px-2 md:px-3 py-1 md:py-1.5 rounded bg-brand-bg text-[8px] md:text-[10px] font-mono font-bold uppercase text-brand-accent border border-brand-accent/30 pointer-events-none md:translate-z-20 shadow-lg">
              [ ID: 0{index + 1} ]
            </div>
            
            {/* Floating Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent z-10 md:translate-z-10 pointer-events-none" />
          </div>
          
          <div className="p-6 md:p-10 flex-1 flex flex-col justify-between preserve-3d md:translate-z-50 relative z-20 -mt-10 md:-mt-16 bg-gradient-to-t from-brand-bg/95 to-transparent pt-10 md:pt-12 pointer-events-none">
            <div>
              <div className="text-[10px] md:text-xs font-bold font-mono tracking-widest text-brand-bg mb-3 md:mb-4 flex justify-between items-center bg-brand-accent px-3 py-1 md:py-1.5 rounded-full w-fit shadow-[0_0_15px_rgba(255,106,0,0.6)]">
                {project.category}
              </div>
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-3 md:mb-4 group-hover:text-glow transition-all">
                {project.name}
              </h3>
              <p className="font-sans opacity-80 text-sm md:text-base leading-relaxed mb-6 md:mb-8 block font-medium">
                {project.description}
              </p>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold font-mono uppercase text-brand-accent mt-auto group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform p-3 md:p-4 border border-brand-accent/20 rounded-lg md:rounded-xl bg-brand-accent/5 backdrop-blur-md w-fit">
              <span>Initialize Protocol</span>
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-accent text-brand-bg flex items-center justify-center">
                 <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
