import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Linkedin, Terminal, Sparkles, BookOpen, Brain, Settings } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.15 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const focusAreas = [
    {
      title: 'Machine Learning & AI Systems',
      desc: 'Developing deepfake mitigation networks and hydrological flood estimators.',
      icon: Brain,
    },
    {
      title: 'Structural Software Development',
      desc: 'Designing robust algorithms and data representations in Python, Java, and C.',
      icon: Terminal,
    },
    {
      title: 'Hardware & IoT Integration',
      desc: 'Linking microcontrollers with automated, real-time sensing loops.',
      icon: Settings,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0A0A] text-[#F0F0F0] relative overflow-hidden">
      {/* Editorial Watermark Logo Background */}
      <div className="absolute -left-16 top-1/6 opacity-[0.015] text-[380px] leading-none font-bold font-serif select-none pointer-events-none text-white">
        AM
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          {/* Left: Introduction & Social Links */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              variants={childVariants} 
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-white/60 font-sans"
            >
              <Sparkles className="w-3 h-3 text-white/50" />
              <span>Seeking 2026 Engagement Opportunities</span>
            </motion.div>

            <motion.h2 
              variants={childVariants} 
              className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[1.1] font-serif"
            >
              Designing <span className="italic block mt-1 font-serif text-white/95">Intelligent Systems</span> for modern engineering challenges.
            </motion.h2>

            <motion.p 
              variants={childVariants} 
              className="text-base sm:text-lg text-white/70 leading-relaxed font-sans max-w-xl font-light"
            >
              {PERSONAL_INFO.summary}
            </motion.p>

            {/* Quick Contact Details on Mobile/Tablet */}
            <motion.div 
              variants={childVariants} 
              className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#121212] p-6 border border-white/5 uppercase tracking-widest text-[10px] text-white/60 font-sans"
            >
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-3 hover:text-white transition-all">
                <Phone className="w-3.5 h-3.5 text-white/40" />
                <span>+91 {PERSONAL_INFO.phone}</span>
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-3 hover:text-white transition-all">
                <Mail className="w-3.5 h-3.5 text-white/40" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-3.5 h-3.5 text-white/40" />
                <span>Kumbakonam, TN, In</span>
              </div>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-all">
                <Linkedin className="w-3.5 h-3.5 text-white/40" />
                <span>LinkedIn Workspace</span>
              </a>
            </motion.div>

            {/* Call to Actions */}
            <motion.div variants={childVariants} className="flex flex-wrap gap-4 pt-2">
              <button
                id="view-projects-btn"
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    const top = element.offsetTop - 85;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3.5 bg-white hover:bg-neutral-200 text-black font-sans uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold border border-white transition-all duration-300 rounded-none cursor-pointer"
              >
                Interactive Lab Terminals
              </button>
              
              <button
                id="contact-me-btn"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    const top = element.offsetTop - 85;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3.5 bg-transparent text-white/80 hover:text-white hover:border-white font-sans uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold border border-white/10 transition-all duration-300 rounded-none cursor-pointer"
              >
                Initiate Inquiry
              </button>
            </motion.div>
          </div>

          {/* Right: Bento Quick Stats / Profile Detail Cards */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              variants={childVariants} 
              className="p-8 bg-[#121212] border border-white/5 space-y-6 rounded-none relative"
            >
              {/* Thin corner accent lines indicating architectural style */}
              <div className="absolute top-0 left-0 w-2 h-px bg-white/20" />
              <div className="absolute top-0 left-0 h-2 w-px bg-white/20" />
              <div className="absolute bottom-0 right-0 w-2 h-px bg-white/20" />
              <div className="absolute bottom-0 right-0 h-2 w-px bg-white/20" />

              <h3 className="text-xs tracking-[0.2em] font-sans font-bold text-white uppercase flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-white/50" />
                <span>Structural Primitives</span>
              </h3>

              <div className="space-y-4">
                {focusAreas.map((area, index) => {
                  const Icon = area.icon;
                  return (
                    <div 
                      key={index} 
                      className="p-4 bg-white/[0.02] border border-white/5 flex items-start gap-4 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
                    >
                      <div className="p-2 border border-white/10 bg-white/5 text-white/80">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-serif text-white text-sm font-semibold">{area.title}</h4>
                        <p className="text-white/60 text-xs mt-1 leading-relaxed font-light">{area.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Simple Decorative Quote Card to add authentic vibe */}
            <motion.div 
              variants={childVariants}
              className="p-6 bg-[#121212] border border-white/5 text-center relative"
            >
              <p className="text-xs italic text-white/50 leading-relaxed font-serif">
                "Connecting logical data pipelines with automated sensory loops to structure safe, real-world computational integrations."
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
