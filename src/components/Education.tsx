import React from 'react';
import { motion } from 'motion/react';
import { EDUCATION_DATA } from '../data';
import { MapPin, Calendar } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-[#0A0A0A] text-[#F0F0F0] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block font-sans">
            Formal Foundations
          </span>
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl font-serif">
            Education <span className="italic">Timeline</span>
          </h2>
          <div className="h-px w-12 bg-white/20 mx-auto mt-4" />
          <p className="text-sm font-light text-white/50 leading-relaxed font-sans max-w-xl mx-auto">
            A history of academic foundations, engineering tracks, and computer science degrees.
          </p>
        </div>

        {/* Timeline Path Render */}
        <div className="max-w-3xl mx-auto relative border-l border-white/10 space-y-16 pl-6 sm:pl-10">
          {EDUCATION_DATA.map((edu, index) => {
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group space-y-4"
              >
                {/* Bullet indicator point */}
                <div className="absolute -left-[31px] sm:-left-[45px] top-1.5 h-3.5 w-3.5 bg-[#0a0a0a] border border-white/30 flex items-center justify-center group-hover:border-white transition-all">
                  <div className="h-1.5 w-1.5 bg-white scale-0 group-hover:scale-100 transition-transform" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/5 pb-2.5">
                  <span className="text-[9px] font-sans tracking-[0.2em] font-medium text-white/60 bg-white/5 px-3 py-1 border border-white/10 uppercase">
                    {edu.period}
                  </span>
                  
                  <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-widest uppercase font-sans">
                    <MapPin className="w-3 h-3" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-light tracking-wide text-white group-hover:text-white transition-colors leading-tight">
                    {edu.institution}
                  </h3>
                  
                  <p className="font-light text-sm text-white/85 font-sans italic">
                    {edu.degree}
                  </p>
                  
                  <p className="text-xs text-white/50 leading-relaxed font-sans font-light mt-2 max-w-2xl">
                    {edu.details}
                  </p>
                </div>

                {/* Score Indicators Grade Box */}
                <div className="bg-[#121212] p-4 border border-white/5 max-w-xs flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1 px-2 border border-white/10 bg-white/5 text-white/80 text-[10px] font-bold font-serif">
                      A
                    </div>
                    <span className="text-xs text-white/40 font-sans tracking-wide">{edu.scoreLabel} score:</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-white tracking-wider bg-[#0A0A0A] px-3 py-1 border border-white/10">
                    {edu.scoreValue}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
