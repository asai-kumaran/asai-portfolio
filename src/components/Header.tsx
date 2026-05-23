import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Linkedin, Code, User, GraduationCap, Award, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Header() {
  const [activeSection, setActiveSection] = useState('about');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Credentials', icon: Award },
    { id: 'contact', label: 'Get in Touch', icon: MessageSquare },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 85;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 gap-4">
          
          {/* Logo / Brand Info */}
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 border border-white/20 flex items-center justify-center text-white font-serif text-sm tracking-widest uppercase bg-white/5">
              AM
            </div>
            <div>
              <h1 className="text-xl font-light text-white tracking-[0.1em] font-serif uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-[10px] text-white/50 tracking-[0.25em] uppercase font-sans mt-0.5">
                {PERSONAL_INFO.title}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="flex items-center flex-wrap gap-2 md:gap-4">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white border-b border-white/60 font-semibold'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Contact Bar */}
        <div className="hidden lg:flex items-center justify-between border-t border-white/5 py-3 text-[10px] text-white/40 tracking-[0.2em] uppercase font-sans">
          <div className="flex items-center gap-8">
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-white/30" />
              <span>+91 {PERSONAL_INFO.phone}</span>
            </a>
            
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-white/30" />
              <span>{PERSONAL_INFO.email}</span>
            </a>

            <div className="flex items-center gap-2 text-white/30">
              <MapPin className="w-3 h-3" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors border border-white/10 px-3 py-1 rounded-none bg-white/5"
            >
              <Linkedin className="w-3 h-3 text-white/40" />
              <span>LinkedIn</span>
            </a>

            <span className="text-[9px] bg-white/5 px-2.5 py-0.5 text-white/40 tracking-[0.15em]">
              2026 UTC
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
