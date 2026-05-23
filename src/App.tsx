/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import { ArrowUp, Mail, Phone, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from './data';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#F0F0F0] selection:bg-white selection:text-black flex flex-col font-sans">
      {/* 1. Nav & Identity Bar */}
      <Header />

      {/* 2. Page Content Grid */}
      <main className="flex-grow">
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* 3. Footer */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 py-16 text-white/40 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/5">
            {/* Identity badge */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 border border-white/20 flex items-center justify-center text-white font-serif text-sm tracking-widest bg-white/5">
                AM
              </div>
              <div>
                <span className="font-serif font-light text-white text-base tracking-[0.1em] block">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#8E8E8E] block mt-0.5">
                  {PERSONAL_INFO.title}
                </span>
              </div>
            </div>

            {/* Backed Social Channels */}
            <div className="flex items-center gap-3 font-sans">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 border border-white/10 hover:border-white text-white/50 hover:text-white bg-white/5 transition-all text-[9px] uppercase tracking-widest flex items-center gap-2 rounded-none"
                title="Send Email"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="p-2.5 border border-white/10 hover:border-white text-white/50 hover:text-white bg-white/5 transition-all text-[9px] uppercase tracking-widest flex items-center gap-2 rounded-none"
                title="Call Phone"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 hover:border-white text-white/50 hover:text-white bg-white/5 transition-all text-[9px] uppercase tracking-widest flex items-center gap-2 rounded-none"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Copyright Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-10 text-[10px] tracking-[0.15em] uppercase text-[#8E8E8E]">
            <span>
              &copy; {new Date().getFullYear()} Asaikumaran M. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              <span>Built with React, Vite & Tailwind CSS</span>
              <span>&mdash;</span>
              <span>2026 UTC Candidate Portfolio</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 4. Floating Back to Top control */}
      {showScrollTop && (
        <button
          id="scroll-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#121212] border border-white/20 hover:border-white text-white/80 hover:text-white transition-all z-50 cursor-pointer rounded-none"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
