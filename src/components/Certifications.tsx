import React from 'react';
import { motion } from 'motion/react';
import { CERTIFICATIONS_DATA, PERSONAL_INFO } from '../data';
import { Award, ShieldCheck } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-[#0A0A0A] text-[#F0F0F0] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block font-sans">
            Validation Credentials
          </span>
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl font-serif">
            Certifications & <span className="italic">Affiliations</span>
          </h2>
          <div className="h-px w-12 bg-white/20 mx-auto mt-4" />
          <p className="text-sm font-light text-white/50 leading-relaxed font-sans max-w-xl mx-auto">
            Professional credentials validating core expertise in modern software patterns and Artificial Intelligence networks.
          </p>
        </div>

        {/* List Grid */}
        <div className="max-w-xl mx-auto space-y-6">
          {CERTIFICATIONS_DATA.map((cert) => {
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 bg-[#121212] border border-white/5 relative overflow-hidden group hover:border-white/15 transition-all rounded-none"
                id={`cert-card-${cert.id}`}
              >
                {/* Status tag */}
                <div className="absolute top-4 right-4 bg-white/5 text-white/80 text-[8px] font-sans tracking-widest uppercase py-1 px-2.5 border border-white/10 flex items-center gap-1.5 rounded-none">
                  <ShieldCheck className="w-3 h-3 text-white/50" />
                  <span>VERIFIED</span>
                </div>

                <div className="flex items-start gap-5 pr-16">
                  <div className="p-3 border border-white/10 bg-white/5 text-white/70">
                    <Award className="w-5 h-5" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase font-sans tracking-[0.2em] text-white/40 block">
                      {cert.issuer}
                    </span>
                    <h3 className="text-base font-serif font-light tracking-wide text-white leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-white/50 mt-2 font-sans font-light leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  <span>Issued: {cert.date}</span>
                  <span className="text-[8px] text-white/50 bg-white/5 px-2 py-0.5 border border-white/10">ID: AZ-AI-900</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Professional Solemn Declaration - Styled like an elegant registry document */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 max-w-2xl mx-auto p-12 bg-[#121212] border border-white/5 text-center relative rounded-none overflow-hidden"
        >
          {/* Accent corners */}
          <div className="absolute top-0 left-0 w-2 h-px bg-white/20" />
          <div className="absolute top-0 left-0 h-2 w-px bg-white/20" />
          <div className="absolute bottom-0 right-0 w-2 h-px bg-white/20" />
          <div className="absolute bottom-0 right-0 h-2 w-px bg-white/20" />

          <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-white/40 block mb-4">
            Resume Declaration
          </span>

          <p className="text-sm sm:text-base text-white/70 italic font-serif leading-relaxed max-w-lg mx-auto font-light">
            "{PERSONAL_INFO.declaration}"
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-1">
            <div className="h-px w-10 bg-white/20 mb-3" />
            <span className="text-white font-serif font-light tracking-[0.15em] text-sm uppercase">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-sans">
              Computer Science & Engineering Alumni
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
