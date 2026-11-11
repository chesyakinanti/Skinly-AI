'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { Sparkles, Scan, Activity, Droplets, Flame, CheckCircle } from 'lucide-react';
import { SkinType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface SkinSimulationData {
  sebum: number;
  hydration: number;
  tZoneStatus: string;
  uZoneStatus: string;
  highlightZones: ('t-zone' | 'u-zone' | 'full')[];
}

const SIMULATION_DATA: Record<'id' | 'en', Record<SkinType, SkinSimulationData>> = {
  id: {
    Normal: {
      sebum: 50,
      hydration: 82,
      tZoneStatus: 'Sebum Seimbang (Normal)',
      uZoneStatus: 'Kelembapan Optimal',
      highlightZones: ['full'],
    },
    Dry: {
      sebum: 20,
      hydration: 34,
      tZoneStatus: 'Sebum Rendah',
      uZoneStatus: 'Area Pipi Kering & Bersisik',
      highlightZones: ['u-zone'],
    },
    Oily: {
      sebum: 92,
      hydration: 58,
      tZoneStatus: 'Hipersekresi Sebum (Berminyak)',
      uZoneStatus: 'Kilap Minyak Menyeluruh',
      highlightZones: ['t-zone', 'full'],
    },
    Combination: {
      sebum: 78,
      hydration: 46,
      tZoneStatus: 'Zona T Berminyak (T-Zone)',
      uZoneStatus: 'Area Pipi Kering / Normal',
      highlightZones: ['t-zone', 'u-zone'],
    },
  },
  en: {
    Normal: {
      sebum: 50,
      hydration: 82,
      tZoneStatus: 'Balanced Sebum (Normal)',
      uZoneStatus: 'Optimal Hydration',
      highlightZones: ['full'],
    },
    Dry: {
      sebum: 20,
      hydration: 34,
      tZoneStatus: 'Low Sebum Excretion',
      uZoneStatus: 'Cheek Moisture Deficit',
      highlightZones: ['u-zone'],
    },
    Oily: {
      sebum: 92,
      hydration: 58,
      tZoneStatus: 'Hyperseborrhea (Oily T-Zone)',
      uZoneStatus: 'Widespread Surface Shine',
      highlightZones: ['t-zone', 'full'],
    },
    Combination: {
      sebum: 78,
      hydration: 46,
      tZoneStatus: 'Oily Central T-Zone',
      uZoneStatus: 'Dry / Normal Lateral Cheeks',
      highlightZones: ['t-zone', 'u-zone'],
    },
  },
};

export const InteractiveFaceScanner: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeType, setActiveType] = useState<SkinType>('Combination');
  const [isScanning, setIsScanning] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSim = SIMULATION_DATA[language][activeType];

  // 3D perspective tilt calculation on mouse move
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -8; // max 8 deg
    const tiltY = ((x - centerX) / centerX) * 8;

    setTilt({ x: tiltX, y: tiltY });
    setMousePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[360px] sm:max-w-[420px] mx-auto select-none transition-transform duration-200 ease-out"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Outer ambient glow reacting to mouse */}
      <div
        className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#A4556B]/20 via-[#F3E3E7]/40 to-[#A9B8A2]/20 blur-2xl -z-10 transition-opacity duration-500 pointer-events-none"
        style={{
          transform: `translate(${tilt.y * 1.5}px, ${-tilt.x * 1.5}px)`,
        }}
        aria-hidden="true"
      />

      {/* Main 3D Glassmorphic HUD Card */}
      <div
        className="relative rounded-3xl bg-gradient-to-tr from-white/95 via-white/90 to-[#FDF8F6]/85 p-5 sm:p-6 border border-white/80 shadow-elevated backdrop-blur-md overflow-hidden transition-all duration-200"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.01, 1.01, 1.01)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dynamic Specular Glare reacting to cursor */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.9), transparent 80%)`,
          }}
          aria-hidden="true"
        />

        {/* Top HUD Status Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F3E3E7]/80 text-xs">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A4556B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A4556B]" />
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-wider text-[#64424D] uppercase">
              {isScanning
                ? language === 'id'
                  ? 'PEMINDAI AKTIF (LIVE)'
                  : 'SCANNER ACTIVE (LIVE)'
                : 'PAUSED'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsScanning(!isScanning)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#F3E3E7] hover:bg-[#A4556B] hover:text-white text-[#A4556B] font-semibold text-[11px] transition-all shadow-xs"
            aria-label="Toggle Scan Animation"
          >
            <Scan className="w-3 h-3" aria-hidden="true" />
            <span>{isScanning ? (language === 'id' ? 'Jeda' : 'Pause') : (language === 'id' ? 'Pindai' : 'Scan')}</span>
          </button>
        </div>

        {/* Central Face Scanner Viewport */}
        <div className="relative my-4 aspect-square max-h-[260px] sm:max-h-[290px] w-full rounded-2xl bg-gradient-to-b from-[#FCF8F6] to-[#F3E3E7]/40 border border-[#F3E3E7] overflow-hidden flex items-center justify-center">
          {/* Biometric Corner Target Brackets */}
          <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#A4556B] rounded-tl-md" />
          <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#A4556B] rounded-tr-md" />
          <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#A4556B] rounded-bl-md" />
          <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#A4556B] rounded-br-md" />

          {/* Central Face Asset */}
          <div className="relative w-48 sm:w-56 h-48 sm:h-56">
            <Image
              src="/assets/SkinlyAI_Icon_Face.png"
              alt="Facial Scanner Hologram"
              fill
              priority
              sizes="224px"
              className="object-contain drop-shadow-md transition-transform duration-300"
            />
          </div>

          {/* Sweeping Laser Scan Line */}
          {isScanning && (
            <div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A4556B] to-transparent shadow-[0_0_12px_#A4556B] pointer-events-none animate-scan"
              aria-hidden="true"
            >
              <div className="absolute left-1/2 -translate-x-1/2 -top-1 px-2 py-0.5 rounded-full bg-[#A4556B] text-[9px] text-white font-mono uppercase tracking-widest shadow-xs">
                YOLO: SCAN
              </div>
            </div>
          )}

          {/* Dynamic Interactive Zone Hotspot Badges on Face */}
          {/* T-Zone Indicator */}
          {currentSim.highlightZones.includes('t-zone') && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#D58B9B]/90 backdrop-blur-sm border border-white text-white font-bold text-[10px] shadow-soft animate-pulse flex items-center space-x-1">
              <Flame className="w-3 h-3" />
              <span>Zona T (Sebum {currentSim.sebum}%)</span>
            </div>
          )}

          {/* U-Zone Indicator */}
          {currentSim.highlightZones.includes('u-zone') && (
            <div className="absolute bottom-12 left-8 px-2.5 py-1 rounded-full bg-[#7A9BB3]/90 backdrop-blur-sm border border-white text-white font-bold text-[10px] shadow-soft animate-pulse flex items-center space-x-1">
              <Droplets className="w-3 h-3" />
              <span>Zona U (Pipi)</span>
            </div>
          )}

          {/* Normal Harmony Glow */}
          {activeType === 'Normal' && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#A9B8A2]/95 backdrop-blur-sm border border-white text-[#2B3A25] font-bold text-[10px] shadow-soft animate-pulse flex items-center space-x-1.5">
              <CheckCircle className="w-3 h-3 text-[#2B3A25]" />
              <span>Skin Barrier Harmonis</span>
            </div>
          )}

          {/* Radar circle concentric pulse */}
          {isScanning && (
            <div
              className="absolute w-36 h-36 rounded-full border border-[#A4556B]/30 animate-radar pointer-events-none"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Real-time Interactive HUD Telemetry Gauges */}
        <div className="space-y-3 p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] shadow-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#64424D]">
            <span className="flex items-center space-x-1 text-[#A4556B]">
              <Activity className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'Telemetri Karakteristik:' : 'Visual Telemetry:'}</span>
            </span>
            <span className="font-mono text-[10px] text-[#64424D]/60 uppercase">
              {activeType}
            </span>
          </div>

          {/* Sebum Gauge */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#64424D]/80 flex items-center space-x-1">
                <Flame className="w-3 h-3 text-[#D58B9B]" />
                <span>{language === 'id' ? 'Produksi Sebum / Minyak' : 'Sebum Excretion'}</span>
              </span>
              <span className="font-bold text-[#8A374A] tabular-nums">{currentSim.sebum}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#F3E3E7] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#E8B77D] to-[#D58B9B] transition-all duration-700 ease-out"
                style={{ width: `${currentSim.sebum}%` }}
              />
            </div>
          </div>

          {/* Hydration Gauge */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#64424D]/80 flex items-center space-x-1">
                <Droplets className="w-3 h-3 text-[#7A9BB3]" />
                <span>{language === 'id' ? 'Kadar Hidrasi Kulit' : 'Hydration Index'}</span>
              </span>
              <span className="font-bold text-[#335064] tabular-nums">{currentSim.hydration}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#F3E3E7] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#A9BDCC] to-[#7A9BB3] transition-all duration-700 ease-out"
                style={{ width: `${currentSim.hydration}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Skin Type Buttons */}
        <div className="pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64424D]/60 mb-2 text-center">
            {language === 'id'
              ? 'Pilih Tipe Kulit untuk Menguji Simulasi:'
              : 'Select Skin Type to Test Simulation:'}
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {(['Normal', 'Dry', 'Oily', 'Combination'] as SkinType[]).map((type) => {
              const isSelected = activeType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all duration-200 text-center ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#A4556B] to-[#8F475B] text-white shadow-soft scale-105 ring-2 ring-[#A4556B]/30'
                      : 'bg-white hover:bg-[#F3E3E7] text-[#64424D] border border-[#F3E3E7] hover:scale-102'
                  }`}
                  aria-pressed={isSelected}
                >
                  {t.skinBadges[type].split(' ')[1] || type}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
