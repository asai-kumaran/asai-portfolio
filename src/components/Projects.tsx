import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Thermometer, Wind, CloudRain, Cpu, ScanSearch, CheckCircle2, Sliders, FileText } from 'lucide-react';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<string>(PROJECTS_DATA[0].id);
  
  // 1. Smart Fan Speed Controller State
  const [temp, setTemp] = useState<number>(27);
  const [fanStatus, setFanStatus] = useState<string>('Normal - Idle');
  const [fanLog, setFanLog] = useState<string[]>([
    'Initializing Smart Fan Controller v1.0.4...',
    'Calibrated temperature sensors...',
    'Microcontroller standing by: Ready.'
  ]);

  // 2. Deepfake Analyzer State
  const [selectedScanProfile, setSelectedScanProfile] = useState<string>('news-raw');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [scanResult, setScanResult] = useState<{
    label: 'REAL' | 'DEEPFAKE';
    confidence: number;
    facemesh: string;
    textureAnomaly: number;
    temporalFlicker: number;
  } | null>(null);

  // 3. Flood Regressor State
  const [rainfall, setRainfall] = useState<number>(85); // mm
  const [moisture, setMoisture] = useState<number>(68); // %
  const [drainage, setDrainage] = useState<number>(450); // m3/s

  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Smart Fan speed controller logic mapping
  const getFanMetrics = (t: number) => {
    if (t < 20) {
      return { pwm: 0, rpm: 0, percentage: 0, mode: 'Off - Sleep', color: 'text-white/40' };
    } else if (t < 25) {
      const pwm = Math.floor(60 + ((t - 20) / 5) * 62);
      const rpm = Math.floor(600 + ((t - 20) / 5) * 600);
      return { pwm, rpm, percentage: Math.floor((pwm / 255) * 100), mode: 'Low - Quiet Speed', color: 'text-white/70' };
    } else if (t < 35) {
      const pwm = Math.floor(122 + ((t - 25) / 10) * 78);
      const rpm = Math.floor(1200 + ((t - 25) / 10) * 800);
      return { pwm, rpm, percentage: Math.floor((pwm / 255) * 100), mode: 'Adaptive Standard Speed', color: 'text-white/90' };
    } else {
      const limitT = Math.min(t, 50);
      const pwm = Math.floor(200 + ((limitT - 35) / 15) * 55);
      const rpm = Math.floor(2000 + ((limitT - 35) / 15) * 1000);
      return { pwm, rpm, percentage: Math.floor((pwm / 255) * 100), mode: 'Max Speed - Hyper Cooling', color: 'text-white font-extrabold' };
    }
  };

  const fanMetrics = getFanMetrics(temp);

  // Append logs on temperature slider adjustment
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `[${timestamp}] Temp: ${temp.toFixed(1)}°C | Speed: ${fanMetrics.percentage}% | PWM: ${fanMetrics.pwm} | Mode: ${fanMetrics.mode}`;
    setFanLog((prev) => [newLog, ...prev.slice(0, 15)]);
  }, [temp]);

  // Deepfake Scanner profile definitions
  const profiles = {
    'news-raw': {
      name: 'Channel 9 Standard Feed (Raw)',
      label: 'REAL',
      confidence: 96.5,
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      facemesh: 'Highly Stable (1.2% jitter)',
      textureAnomaly: 2.1,
      temporalFlicker: 0.8
    },
    'deep-synthetic': {
      name: 'Verified Synthesis Sample 4B',
      label: 'DEEPFAKE',
      confidence: 98.2,
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      facemesh: 'Deformed Mesh boundaries, Eye symmetry shifts',
      textureAnomaly: 84.7,
      temporalFlicker: 76.3
    },
    'social-manip': {
      name: 'Dynamic Lip-Sync Overlay clip',
      label: 'DEEPFAKE',
      confidence: 88.4,
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      facemesh: 'Inconsistent mouth contours during audio phonemes',
      textureAnomaly: 49.3,
      temporalFlicker: 52.1
    }
  };

  const startDeepfakeScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);
    
    const steps = [
      'Locating face anchors...',
      'Mapping 68 facial landmarker coordinates...',
      'Scanning eye-blink frequency distributions...',
      'Applying texture aberration Fourier pass...',
      'Analysing temporal frequency shifts...',
      'Computing neural classification risk ratio...'
    ];

    setScanLogs(['Initialized Fast Fourier Facial Scan...', 'Allocating GPU neural vector cache...']);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setScanProgress(progress);
      
      const logIdx = Math.floor((progress / 100) * steps.length);
      if (steps[logIdx] && !scanLogs.includes(steps[logIdx])) {
        setScanLogs(prev => [steps[logIdx], ...prev]);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        const currentData = profiles[selectedScanProfile as keyof typeof profiles];
        setScanResult({
          label: currentData.label as 'REAL' | 'DEEPFAKE',
          confidence: currentData.confidence,
          facemesh: currentData.facemesh,
          textureAnomaly: currentData.textureAnomaly,
          temporalFlicker: currentData.temporalFlicker
        });
        setScanLogs(prev => [`Scanning complete. ${currentData.label} detected with ${currentData.confidence}% probability.`, ...prev]);
      }
    }, 150);
  };

  const getFloodAlertLevel = () => {
    const moistureIntakeCoeff = moisture / 100;
    const potentialRunoffVol = rainfall * 4.5 * (1 + moistureIntakeCoeff);
    const floodRiskScoreIndex = potentialRunoffVol - (drainage / 2.5);
    const score = Math.max(0, Math.min(100, Math.floor(floodRiskScoreIndex)));

    if (score < 30) {
      return { score, tier: 'Normal', color: 'bg-white', text: 'text-white/60', riskMsg: 'Basin system operating well below threshold limits. Safe conditions.' };
    } else if (score < 55) {
      return { score, tier: 'Alert Watch', color: 'bg-white/40', text: 'text-white/80', riskMsg: 'Reservoirs approaching capacity. Secondary canals activated.' };
    } else if (score < 80) {
      return { score, tier: 'Flood Warning', color: 'bg-white/70', text: 'text-white/90 font-medium', riskMsg: 'Localized runoff exceeds standard discharge. Moderate low-land inundation expected.' };
    } else {
      return { score, tier: 'Extreme Risk Danger', color: 'bg-white', text: 'text-white font-bold tracking-widest uppercase italic', riskMsg: 'Severe channel capacities breached. Immediate community evacuation alarms triggered.' };
    }
  };

  const floodAlert = getFloodAlertLevel();

  return (
    <section id="projects" className="py-24 bg-[#0A0A0A] text-[#F0F0F0] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block font-sans">
            Curated Subsurface Labs
          </span>
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl font-serif">
            Key Software & <span className="italic">AI Projects</span>
          </h2>
          <div className="h-px w-12 bg-white/20 mx-auto mt-4" />
          <p className="text-sm font-light text-white/50 leading-relaxed font-sans max-w-xl mx-auto">
            Explore authentic portfolio implementations. Experience fully functioning embedded automation and machine learning estimators in simulated micro-terminals.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main List of Project details - Left Span 5 */}
          <div className="lg:col-span-5 space-y-4">
            {PROJECTS_DATA.map((project) => {
              const isActive = activeTab === project.id;
              return (
                <button
                  key={project.id}
                  id={`proj-tab-${project.id}`}
                  onClick={() => {
                    setActiveTab(project.id);
                    setIsScanning(false);
                    setScanProgress(0);
                    setScanResult(null);
                  }}
                  className={`w-full text-left p-6 border transition-all duration-300 relative rounded-none overflow-hidden group cursor-pointer ${
                    isActive
                      ? 'bg-[#121212] border-white/40'
                      : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] tracking-widest uppercase px-2 py-0.5 bg-white/5 border border-white/10 text-white/70 font-sans">
                        {project.status}
                      </span>
                      <span className="text-[9px] text-white/40 tracking-wider font-mono">
                        {project.role}
                      </span>
                    </div>

                    <h3 className={`text-base font-serif tracking-wide transition-colors ${
                      isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                    }`}>
                      {project.title}
                    </h3>

                    <p className="text-xs text-white/50 font-sans font-light leading-relaxed line-clamp-2 mt-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono bg-white/[0.02] px-2 py-0.5 text-white/40 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Interactive Sand Box - Right Span 7 */}
          <div className="lg:col-span-7 bg-[#121212] border border-white/5 overflow-hidden shadow-sm relative min-h-[580px] flex flex-col rounded-none">
            
            {/* Box Header */}
            <div className="bg-[#0A0A0A] px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[9px] font-sans text-white/40 uppercase tracking-[0.25em]">
                  Live Project Simulation Hub
                </span>
              </div>
              <div className="text-[9px] text-white/30 uppercase tracking-[0.1em] flex items-center gap-1.5 font-sans">
                <Sliders className="w-3 h-3" />
                <span>Adjust Parameters</span>
              </div>
            </div>

            {/* Simulated Content render block */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              {activeTab === 'fan-controller' && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  {/* Smart Fan Controller Setup */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/5 border border-white/10 text-white/80">
                        <Thermometer className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="font-serif text-white text-base font-semibold">Automatic Cooling Regulation</h4>
                        <p className="text-xs font-light text-white/50 leading-relaxed mt-1 font-sans">
                          The firmware registers thermistor signals and updates the PWM duty cycle instantly.
                        </p>
                      </div>
                    </div>

                    {/* Sensor Slider Trigger */}
                    <div className="bg-[#0A0A0A] p-5 border border-white/5 space-y-4">
                      <div className="flex justify-between items-center text-xs uppercase tracking-widest text-white/50">
                        <span>Ambient Temperature</span>
                        <span className={`text-sm font-mono font-bold text-white`}>
                          {temp.toFixed(1)}°C
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-white/30">15°C</span>
                        <input
                          id="fan-temp-slider"
                          type="range"
                          min="15"
                          max="50"
                          step="0.5"
                          value={temp}
                          onChange={(e) => setTemp(parseFloat(e.target.value))}
                          className="w-full h-[3px] bg-white/10 rounded-none appearance-none cursor-pointer accent-white"
                        />
                        <span className="text-[10px] font-mono text-white/30">50°C</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Interactive Fan Visualizer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    
                    {/* Spin Animation Frame */}
                    <div className="flex flex-col items-center justify-center bg-[#0A0A0A] p-6 border border-white/5 aspect-square max-h-[160px] relative overflow-hidden">
                      <motion.div
                        style={{ transformOrigin: 'center' }}
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: fanMetrics.rpm > 0 ? Math.max(0.18, 30 / (fanMetrics.rpm / 20)) : 0,
                          ease: 'linear'
                        }}
                        className="relative"
                      >
                        <Wind className={`w-14 h-14 transition-colors ${
                          fanMetrics.rpm === 0 ? 'text-white/10' : 'text-white/80'
                        }`} />
                      </motion.div>
                      
                      <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest mt-4">
                        {fanMetrics.rpm > 0 ? `SPINNING: ${fanMetrics.rpm} RPM` : 'COOLER HALTED'}
                      </span>
                    </div>

                    {/* Real-time calculated Microcontroller Registry Data */}
                    <div className="space-y-2 bg-[#0A0A0A] p-4 border border-white/5 font-mono text-[11px] text-white/70">
                      <h5 className="text-white/30 text-[8px] uppercase font-semibold tracking-[0.2em] mb-2">
                        REGISTRY MEMORY DUMP
                      </h5>
                      <div className="flex justify-between border-b border-white/[0.03] pb-1">
                        <span className="text-white/40">Register: PWM_VAL</span>
                        <span className="font-bold text-white/85">{fanMetrics.pwm} / 255</span>
                      </div>
                      <div className="flex justify-between border-b border-white/[0.03] pb-1">
                        <span className="text-white/40">Register: FAN_SPD_PCT</span>
                        <span className="font-bold text-white/85">{fanMetrics.percentage}%</span>
                      </div>
                      <div className="flex justify-between border-b border-white/[0.03] pb-1">
                        <span className="text-white/40">System Mode:</span>
                        <span className={`font-bold ${fanMetrics.color}`}>{fanMetrics.mode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Serial Interface Log Reader */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-mono text-white/30 uppercase tracking-widest">
                      <span>SERIAL SPEED: 9600 BAUD</span>
                      <span>UTF-8 LOGOUT</span>
                    </div>
                    <div id="fan-serial-console" className="bg-[#0A0A0A] text-white/70 font-mono text-[10px] p-4 border border-white/5 h-28 overflow-y-auto space-y-1 scrollbar-none">
                      {fanLog.map((log, i) => (
                        <div key={i} className="leading-relaxed hover:bg-white/[0.02] px-1 rounded transition-colors font-light">
                          <span className="text-white/40 font-bold">&gt;</span> {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'deepfake-detection' && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/5 border border-white/10 text-white/80">
                        <ScanSearch className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-white text-base font-semibold">Facial Mesh Vector Scansion</h4>
                        <p className="text-xs font-light text-white/50 leading-relaxed mt-1 font-sans">
                          Evaluates texture frequencies, landmark jitter bounds, and synthetic landing masks.
                        </p>
                      </div>
                    </div>

                    {/* Scan Profile Selection */}
                    <div className="grid grid-cols-3 gap-3">
                      {Object.keys(profiles).map((pKey) => {
                        const prof = profiles[pKey as keyof typeof profiles];
                        const isChosen = selectedScanProfile === pKey;
                        return (
                          <button
                            key={pKey}
                            id={`df-profile-${pKey}`}
                            onClick={() => {
                              setSelectedScanProfile(pKey);
                              setScanResult(null);
                            }}
                            className={`p-3 border text-center transition-all cursor-pointer rounded-none relative ${
                              isChosen
                                ? 'bg-white/5 border-white text-white'
                                : 'bg-[#0A0A0A] border-white/5 text-white/40 hover:text-white/80'
                            }`}
                          >
                            <img
                              src={prof.img}
                              alt={prof.name}
                              referrerPolicy="no-referrer"
                              className="w-7 h-7 rounded-none mx-auto object-cover border border-white/10 mb-1.5"
                            />
                            <div className="text-[9px] font-sans tracking-tight uppercase leading-tight truncate">{prof.name.split(' ')[0]}</div>
                            <span className="text-[7px] tracking-[0.15em] font-mono uppercase bg-white/5 px-1.5 py-0.5 text-white/50 mt-1.5 block">
                              Feed
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* scanning status and progress bar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    
                    {/* Simulated scanning animation space */}
                    <div className="relative bg-[#0A0A0A] border border-white/5 rounded-none aspect-video w-full overflow-hidden flex items-center justify-center">
                      <img
                        src={profiles[selectedScanProfile as keyof typeof profiles].img}
                        alt="Test Profile Input"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-60"
                      />
                      
                      <div className="absolute inset-0 border border-dashed border-white/20 m-4 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-none border border-white/20 relative">
                          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10" />
                          <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
                        </div>
                      </div>

                      {/* Moving scanner line during scans */}
                      {isScanning && (
                        <motion.div
                          initial={{ top: '0%' }}
                          animate={{ top: '100%' }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="absolute left-0 w-full h-0.5 bg-white z-20"
                        />
                      )}

                      {/* scan confirmation mask overlay */}
                      {scanResult && (
                        <div className="absolute inset-0 bg-[#0A0A0A]/90 flex flex-col items-center justify-center p-4 text-center z-10 transition-all font-sans">
                          {scanResult.label === 'DEEPFAKE' ? (
                            <AlertTriangle className="w-8 h-8 text-white mb-2 animate-pulse" />
                          ) : (
                            <ShieldCheck className="w-8 h-8 text-white/80 mb-2" />
                          )}
                          <div className="text-[8px] uppercase tracking-[0.25em] text-white/40">Verdict Metrics</div>
                          <div className="text-lg font-serif font-light text-white tracking-wider mt-1">
                            {scanResult.label} VERIFIED
                          </div>
                          <div className="text-[9px] text-white/50 font-mono mt-1">
                            Confidence Level: {scanResult.confidence}%
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Scanner triggers and indicators */}
                    <div className="space-y-3">
                      <button
                        id="df-scan-trigger-btn"
                        onClick={startDeepfakeScan}
                        disabled={isScanning}
                        className={`w-full py-3.5 bg-transparent border uppercase tracking-[0.2em] font-medium text-[10px] text-white cursor-pointer transition-all rounded-none ${
                          isScanning
                            ? 'border-white/10 text-white/30 cursor-not-allowed'
                            : 'border-white hover:bg-white hover:text-black'
                        }`}
                      >
                        <span>{isScanning ? 'Processing Core...' : 'Execute Scan Pipeline'}</span>
                      </button>

                      {isScanning && (
                        <div className="space-y-1 font-sans">
                          <div className="flex justify-between text-[8px] tracking-[0.1em] uppercase text-white/40">
                            <span>Scanning Vectors...</span>
                            <span>{scanProgress}%</span>
                          </div>
                          <div className="w-full bg-white/5 h-1">
                            <div style={{ width: `${scanProgress}%` }} className="h-full bg-white transition-all" />
                          </div>
                        </div>
                      )}

                      {/* Logs feedback block */}
                      <div className="bg-[#0A0A0A] p-3 border border-white/5 font-mono text-[9px] text-white/50 h-24 overflow-y-auto space-y-1">
                        {scanLogs.length === 0 ? (
                          <div className="text-white/30 italic">Registry logs will print here upon simulation.</div>
                        ) : (
                          scanLogs.map((log, index) => (
                            <div key={index} className="leading-relaxed">
                              <span className="text-white/40">▶</span> {log}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'flood-prediction' && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/5 border border-white/10 text-white/80">
                        <CloudRain className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-white text-base font-semibold">Basin Hydration Model</h4>
                        <p className="text-xs font-light text-white/50 leading-relaxed mt-1 font-sans">
                          Hydrological mathematical scoring incorporating soil saturation coefficients and drainage capacities.
                        </p>
                      </div>
                    </div>

                    {/* Risk Formula Controllers */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0A0A0A] p-4 border border-white/5">
                      
                      {/* Controller A: Rainfall */}
                      <div className="space-y-1.5 font-sans">
                        <label className="text-[9px] uppercase tracking-wider text-white/40 flex justify-between">
                          <span>24h Rainfall:</span>
                          <span className="text-white font-semibold">{rainfall}mm</span>
                        </label>
                        <input
                          id="flood-rainfall-slider"
                          type="range"
                          min="0"
                          max="200"
                          value={rainfall}
                          onChange={(e) => setRainfall(parseInt(e.target.value))}
                          className="w-full h-[2px] bg-white/10 rounded-none appearance-none cursor-pointer accent-white"
                        />
                        <span className="text-[8px] text-white/30 font-mono block">Limits: 0-200mm</span>
                      </div>

                      {/* Controller B: Moisture */}
                      <div className="space-y-1.5 font-sans">
                        <label className="text-[9px] uppercase tracking-wider text-white/40 flex justify-between">
                          <span>Soil Moisture:</span>
                          <span className="text-white font-semibold">{moisture}%</span>
                        </label>
                        <input
                          id="flood-moisture-slider"
                          type="range"
                          min="0"
                          max="100"
                          value={moisture}
                          onChange={(e) => setMoisture(parseInt(e.target.value))}
                          className="w-full h-[2px] bg-white/10 rounded-none appearance-none cursor-pointer accent-white"
                        />
                        <span className="text-[8px] text-white/30 font-mono block">Absorb limit</span>
                      </div>

                      {/* Controller C: Drainage */}
                      <div className="space-y-1.5 font-sans">
                        <label className="text-[9px] uppercase tracking-wider text-white/40 flex justify-between">
                          <span>Drainage:</span>
                          <span className="text-white font-semibold">{drainage}m³</span>
                        </label>
                        <input
                          id="flood-drainage-slider"
                          type="range"
                          min="50"
                          max="1000"
                          value={drainage}
                          onChange={(e) => setDrainage(parseInt(e.target.value))}
                          className="w-full h-[2px] bg-white/10 rounded-none appearance-none cursor-pointer accent-white"
                        />
                        <span className="text-[8px] text-white/30 font-mono block">Outflow capacity</span>
                      </div>

                    </div>
                  </div>

                  {/* Gauge dial prediction result indicators */}
                  <div className="bg-[#0A0A0A] p-5 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Ring score gauge simulation */}
                    <div className="relative h-24 w-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="rgba(255, 255, 255, 0.04)"
                          strokeWidth="4"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="rgba(255, 255, 255, 0.5)"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={251.2}
                          animate={{ strokeDashoffset: 251.2 - (251.2 * floodAlert.score) / 100 }}
                          transition={{ duration: 0.5 }}
                        />
                      </svg>
                      <div className="absolute text-center bg-[#0A0A0A] rounded-full h-16 w-16 flex flex-col items-center justify-center">
                        <span className="text-[8px] font-sans tracking-wider text-white/30 uppercase">Index</span>
                        <span className="text-base font-serif font-light text-white">{floodAlert.score}%</span>
                      </div>
                    </div>

                    {/* Results classification criteria */}
                    <div className="flex-1 space-y-2 text-sans font-light">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-0.5 bg-white/5 border border-white/10 text-white">
                          Status: {floodAlert.tier}
                        </span>
                      </div>
                      
                      <p className="text-xs text-white/60 leading-relaxed mt-1">
                        {floodAlert.riskMsg}
                      </p>

                      <div className="text-[9px] font-mono text-white/40 flex flex-col gap-0.5 border-t border-white/5 pt-2">
                        <span>Net Runoff Coefficient: {(rainfall * 4.5 * (1 + moisture / 100)).toFixed(0)} runoff tons</span>
                        <span>Discharge Threshold: {(drainage / 2.5).toFixed(0)} output tons</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Detailed achievements lists summary */}
              <div className="mt-8 pt-6 border-t border-white/5 font-sans space-y-3 text-xs text-white/70">
                <h5 className="font-serif tracking-wider text-white text-[11px] uppercase tracking-wide text-white/80">
                  Core Architectural Milestones
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PROJECTS_DATA.find((p) => p.id === activeTab)?.keyAchievements.map((ach, index) => (
                    <li key={index} className="flex items-start gap-2.5 leading-relaxed font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white/40 mt-0.5 flex-shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
