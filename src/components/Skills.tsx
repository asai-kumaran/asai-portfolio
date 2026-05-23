import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SKILLS_DATA } from '../data';
import { Skill } from '../types';
import { Cpu, Database, Star, Trophy, Sparkles } from 'lucide-react';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [mix1, setMix1] = useState<string | null>(null);
  const [mix2, setMix2] = useState<string | null>(null);

  const categories = ['All', 'Languages', 'Database', 'Tools & Platforms', 'Concepts'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Cpu className="w-3.5 h-3.5 text-white/60" />;
      case 'Database':
        return <Database className="w-3.5 h-3.5 text-white/60" />;
      case 'Tools & Platforms':
        return <Star className="w-3.5 h-3.5 text-white/60" />;
      case 'Concepts':
        return <Cpu className="w-3.5 h-3.5 text-white/60" />;
      default:
        return <Trophy className="w-3.5 h-3.5 text-white/60" />;
    }
  };

  const handleMixSelect = (skillName: string) => {
    if (mix1 === skillName) {
      setMix1(null);
    } else if (mix2 === skillName) {
      setMix2(null);
    } else if (!mix1) {
      setMix1(skillName);
    } else if (!mix2) {
      setMix2(skillName);
    } else {
      setMix1(skillName);
    }
  };

  const getMixInterpretation = () => {
    if (!mix1 || !mix2) return 'Select any two technical skills above to see how they integrate in my portfolio projects.';
    
    const pair = [mix1, mix2].sort().join(' + ');

    switch (pair) {
      case 'C + VS Code':
        return 'Leveraging VS Code configured with GCC compilers to write clean, optimized C code, implementing low-level data structures and microcontroller algorithmic modules.';
      case 'Python + VS Code':
        return 'Using Python inside VS Code with custom virtual environments to design, compile, and run Machine Learning architectures like Deepfake detectors and Flood risk algorithms.';
      case 'DBMS Concepts + MySQL':
        return 'Applying strong relational database schemas and normalization concepts (1NF, 2NF, 3NF) inside MySQL databases to securely store sensor data logging or classification inputs.';
      case 'Data Structures + Python':
        return 'Employing stack, queue, and tree paradigms in Python to optimize multi-sensor data consolidation and queue alerts for environmental telemetry models.';
      case 'C + Data Structures':
        return 'Designing strict recursive traversals, pointers, and memory allocations in C to evaluate pure algorithmic complexity and optimize low-level processor routines.';
      case 'Java + VS Code':
        return 'Designing object-oriented application services, managing thread loops and dependency configurations cleanly in VS Code workspace directories.';
      case 'Machine Learning Basics + Python':
        return 'Utilizing Python toolkits (including scikit-learn or custom matrix multipliers) to train predictive pipelines evaluating weather variables or synthetic facial distortions.';
      case 'DBMS Concepts + Machine Learning Basics':
        return 'Structuring neural training logs and environmental metrics data arrays logically to optimize the feed-rate into ML models.';
      default:
        return `Combining "${mix1}" and "${mix2}" represents cross-disciplinary software engineering - linking logical structures with real output pipelines to build systems like the Smart Fan Speed Controller or Deepfake neural scanners.`;
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#0A0A0A] text-[#F0F0F0] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block font-sans">
            Expertise Directory
          </span>
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl font-serif">
            Technical Stack & <span className="italic">Expertise</span>
          </h2>
          <div className="h-px w-12 bg-white/20 mx-auto mt-4" />
          <p className="text-sm font-light text-white/50 leading-relaxed font-sans max-w-xl mx-auto">
            A comprehensive list of core computer science primitives, programming syntaxes, databases, and tools.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`skill-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-[10px] font-sans tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer border rounded-none ${
                selectedCategory === cat
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-transparent border-white/10 text-white/50 hover:text-white hover:border-white/30'
              }`}
            >
              <span className="flex items-center gap-2">
                {cat}
              </span>
            </button>
          ))}
        </div>

        {/* Grid of Skills with Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            const isMixed1 = mix1 === skill.name;
            const isMixed2 = mix2 === skill.name;
            const isAnyMixed = isMixed1 || isMixed2;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                onClick={() => handleMixSelect(skill.name)}
                className={`p-6 bg-[#121212] border transition-all duration-300 cursor-pointer select-none group relative rounded-none overflow-hidden ${
                  isAnyMixed
                    ? 'border-white/60 bg-[#161616] shadow-sm'
                    : 'border-white/5 hover:border-white/15'
                }`}
              >
                {/* Active Indicator Pin */}
                {isAnyMixed && (
                  <div className="absolute top-3 right-3 bg-white text-black text-[8px] tracking-widest uppercase font-sans px-2 py-0.5 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Active</span>
                  </div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 border border-white/10 bg-white/5 text-white/80 group-hover:border-white/20 transition-all">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <span className="text-white text-sm tracking-wide font-sans group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">{skill.proficiency}%</span>
                </div>

                {/* Progress line */}
                <div className="w-full bg-white/5 h-1 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full ${
                      isAnyMixed ? 'bg-white' : 'bg-white/40 group-hover:bg-white'
                    }`}
                  />
                </div>
                
                <div className="mt-4 flex justify-between items-end text-[9px] text-white/40 tracking-[0.15em] uppercase font-sans">
                  <span>{skill.category}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium">
                    Link & Combine
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skill Mixer Playground Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#121212] border border-white/5 p-8 relative rounded-none flex flex-col justify-between"
        >
          {/* Subtle decoration lines */}
          <div className="absolute top-0 left-0 w-2 h-px bg-white/20" />
          <div className="absolute top-0 left-0 h-2 w-px bg-white/20" />

          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/10 text-[9px] tracking-[0.2em] uppercase text-white/50 font-sans">
                <span>Interactive Tech Lab</span>
              </div>
              <h3 className="text-lg font-normal tracking-wide text-white font-serif">Structural System Interpreter</h3>
              <p className="text-xs sm:text-sm font-light text-white/60 leading-relaxed font-sans">
                Check how any two system primitives interlock to form Asaikumaran's robust portfolio project flows. Click any card inside the stack.
              </p>
            </div>

            {/* Display selectors */}
            <div className="flex items-center gap-3 bg-white/[0.02] p-4 border border-white/5">
              <div className={`px-3 py-1.5 text-[10px] font-mono border rounded-none uppercase tracking-wider ${
                mix1 ? 'border-white bg-white/5 text-white' : 'border-white/10 text-white/30'
              }`}>
                {mix1 || 'Skill A'}
              </div>
              <span className="text-white/30 font-bold">&mdash;</span>
              <div className={`px-3 py-1.5 text-[10px] font-mono border rounded-none uppercase tracking-wider ${
                mix2 ? 'border-white bg-white/5 text-white' : 'border-white/10 text-white/30'
              }`}>
                {mix2 || 'Skill B'}
              </div>
            </div>
          </div>

          <div className="mt-8 p-5 bg-[#0A0A0A] border border-white/5 text-xs sm:text-sm font-sans leading-relaxed text-white/70 flex items-start gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-white mt-1.5 flex-shrink-0 animate-pulse" />
            <p className="font-light">{getMixInterpretation()}</p>
          </div>
          
          {(mix1 || mix2) && (
            <button
              id="clear-skill-mix-btn"
              onClick={() => { setMix1(null); setMix2(null); }}
              className="mt-4 text-[10px] text-white/40 hover:text-white tracking-[0.15em] uppercase font-sans text-left underline cursor-pointer"
            >
              Reset Combinations
            </button>
          )}

        </motion.div>

      </div>
    </section>
  );
}
