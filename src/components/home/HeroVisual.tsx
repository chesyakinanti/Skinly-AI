'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { Sparkles, Scan, Droplets, Flame, CheckCircle, ShieldCheck } from 'lucide-react';
import { SkinType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export const HeroVisual: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedType, setSelectedType] = useState<SkinType | null>('Combination');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -7;
    const tiltY = ((x - centerX) / centerX) * 7;

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
      className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[430px] aspect-square mx-auto select-none transition-transform duration-200 ease-out"
      style={{ perspective: '1100px' }}
    >
      {/* Background Ambient Pulsing Glow */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-[#A4556B]/25 via-[#F3E3E7]/50 to-[#A9B8A2]/25 rounded-full blur-3xl -z-10 animate-pulse-subtle"
        aria-hidden="true"
      />

      {/* Main Glassmorphic Central Card with 3D Tilt */}
      <div
        className="relative w-full h-full rounded-[2.5rem] bg-gradient-to-tr from-white/95 via-[#FCF8F6]/90 to-[#F3E3E7]/70 p-6 sm:p-8 border border-white shadow-elevated backdrop-blur-md flex items-center justify-center overflow-hidden transition-all duration-200"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dynamic Specular Sheen reacting to cursor */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.95), transparent 75%)`,
          }}
          aria-hidden="true"
        />

        {/* Biometric Framing Brackets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#A4556B]/60 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#A4556B]/60 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#A4556B]/60 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#A4556B]/60 rounded-br-lg pointer-events-none" />

        {/* Sweeping Laser Scanner Line */}
        <div
          className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#A4556B] to-transparent shadow-[0_0_12px_#A4556B] pointer-events-none animate-scan z-10"
          aria-hidden="true"
        />

        {/* Concentric Radar Ring */}
        <div
          className="absolute w-44 h-44 rounded-full border border-[#A4556B]/20 animate-radar pointer-events-none"
          aria-hidden="true"
        />

        {/* Central Face Asset with gentle floating motion */}
        <div className="relative w-56 sm:w-64 h-56 sm:h-64 animate-float">
          <Image
            src="/assets/SkinlyAI_Icon_Face.png"
            alt="Skinly AI Face Asset"
            fill
            priority
            sizes="(max-width: 640px) 224px, 256px"
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* Dynamic Zone Highlight Pills on the face depending on selection */}
        {selectedType === 'Combination' && (
          <div className="absolute top-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-card border border-[#B7A7C9] text-[10px] font-bold text-[#553C6E] flex items-center space-x-1.5 animate-bounce z-20">
            <span className="w-2 h-2 rounded-full bg-[#9882B3] animate-ping" />
            <span>Zona T: Sebum 78%</span>
          </div>
        )}
        {selectedType === 'Oily' && (
          <div className="absolute top-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-card border border-[#D58B9B] text-[10px] font-bold text-[#8A374A] flex items-center space-x-1.5 animate-bounce z-20">
            <Flame className="w-3 h-3 text-[#D58B9B]" />
            <span>Hipersekresi Minyak</span>
          </div>
        )}
        {selectedType === 'Dry' && (
          <div className="absolute bottom-12 left-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-card border border-[#A9BDCC] text-[10px] font-bold text-[#335064] flex items-center space-x-1.5 animate-bounce z-20">
            <Droplets className="w-3 h-3 text-[#7A9BB3]" />
            <span>Zona U: Butuh Hidrasi</span>
          </div>
        )}
        {selectedType === 'Normal' && (
          <div className="absolute bottom-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-card border border-[#A9B8A2] text-[10px] font-bold text-[#3E5236] flex items-center space-x-1.5 animate-bounce z-20">
            <CheckCircle className="w-3 h-3 text-[#A9B8A2]" />
            <span>Barrier Harmonis</span>
          </div>
        )}
      </div>

      {/* 4 FLOATING SKIN CATEGORY BADGES (Clickable & Interactive) */}

      {/* 1. Normal Badge (Top Right) */}
      <button
        type="button"
        onClick={() => setSelectedType(selectedType === 'Normal' ? null : 'Normal')}
        className={`absolute -top-3.5 -right-3 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-card border transition-all duration-300 flex items-center space-x-2 text-xs font-bold tracking-tight leading-none cursor-pointer hover:scale-110 active:scale-95 animate-float ${
          selectedType === 'Normal'
            ? 'border-[#A9B8A2] ring-4 ring-[#A9B8A2]/30 text-[#3E5236] scale-105'
            : 'border-[#A9B8A2]/50 text-[#3E5236]'
        }`}
        aria-label="Normal Skin Badge"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#A9B8A2] ring-2 ring-[#A9B8A2]/40" />
        <span>{t.home.normal}</span>
      </button>

      {/* 2. Dry Badge (Middle Left) */}
      <button
        type="button"
        onClick={() => setSelectedType(selectedType === 'Dry' ? null : 'Dry')}
        className={`absolute top-1/3 -left-5 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-card border transition-all duration-300 flex items-center space-x-2 text-xs font-bold tracking-tight leading-none cursor-pointer hover:scale-110 active:scale-95 animate-float-delayed ${
          selectedType === 'Dry'
            ? 'border-[#7A9BB3] ring-4 ring-[#7A9BB3]/30 text-[#335064] scale-105'
            : 'border-[#A9BDCC]/60 text-[#335064]'
        }`}
        aria-label="Dry Skin Badge"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#7A9BB3] ring-2 ring-[#7A9BB3]/40" />
        <span>{t.home.dry}</span>
      </button>

      {/* 3. Oily Badge (Bottom Left) */}
      <button
        type="button"
        onClick={() => setSelectedType(selectedType === 'Oily' ? null : 'Oily')}
        className={`absolute -bottom-3.5 -left-3 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-card border transition-all duration-300 flex items-center space-x-2 text-xs font-bold tracking-tight leading-none cursor-pointer hover:scale-110 active:scale-95 animate-float ${
          selectedType === 'Oily'
            ? 'border-[#D58B9B] ring-4 ring-[#D58B9B]/30 text-[#8A374A] scale-105'
            : 'border-[#D58B9B]/50 text-[#8A374A]'
        }`}
        aria-label="Oily Skin Badge"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#D58B9B] ring-2 ring-[#D58B9B]/40" />
        <span>{t.home.oily}</span>
      </button>

      {/* 4. Combination Badge (Bottom Right) */}
      <button
        type="button"
        onClick={() => setSelectedType(selectedType === 'Combination' ? null : 'Combination')}
        className={`absolute bottom-6 -right-4 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-card border transition-all duration-300 flex items-center space-x-2 text-xs font-bold tracking-tight leading-none cursor-pointer hover:scale-110 active:scale-95 animate-float-delayed ${
          selectedType === 'Combination'
            ? 'border-[#9882B3] ring-4 ring-[#9882B3]/30 text-[#553C6E] scale-105'
            : 'border-[#B7A7C9]/60 text-[#553C6E]'
        }`}
        aria-label="Combination Skin Badge"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#9882B3] ring-2 ring-[#9882B3]/40" />
        <span>{t.home.combination}</span>
      </button>
    </div>
  );
};
