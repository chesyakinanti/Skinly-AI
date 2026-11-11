'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  Scan,
  Cpu,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkle,
  Compass,
  Layers,
  Lock,
  BookMarked,
  Camera,
  Binary,
  Microscope,
} from 'lucide-react';
import { HeroVisual } from '@/components/home/HeroVisual';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-4 sm:pt-10 pb-6 sm:pb-14 overflow-hidden">
        {/* Atmospheric ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#F3E3E7]/50 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fadeInUp">
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F3E3E7]/80 backdrop-blur-sm border border-[#E9D2D8] text-xs font-bold tracking-[0.05em] uppercase text-[#A4556B] shadow-xs">
              <Sparkle
                className="w-3.5 h-3.5 text-[#A4556B] animate-spin"
                style={{ animationDuration: '8s' }}
                aria-hidden="true"
              />
              <span>{t.home.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#64424D] tracking-[-0.035em] leading-[1.12]">
              {t.home.titlePart1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A4556B] via-[#94465C] to-[#64424D]">
                {t.home.titlePart2}
              </span>{' '}
              {t.home.titlePart3}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-[#64424D]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal tracking-[-0.01em]">
              {t.home.subtitle}
            </p>

            {/* Ultra-Modern CTAs with Glowing Ambient Shadow & Specular Sheen */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/skin-analysis"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-[#A4556B] via-[#94465C] to-[#7D3B4E] hover:from-[#8F475B] hover:to-[#6C3041] text-white text-sm sm:text-base font-semibold px-8 py-3.5 rounded-full shadow-[0_10px_25px_-5px_rgba(164,85,107,0.4)] hover:shadow-[0_15px_35px_-4px_rgba(164,85,107,0.55)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-300 min-h-[50px] overflow-hidden"
              >
                {/* Specular light glide on hover */}
                <span
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none"
                  aria-hidden="true"
                />
                <Sparkles
                  className="w-4 h-4 text-white/95 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span className="tracking-wide">{t.home.primaryCta}</span>
                <ArrowRight
                  className="w-4 h-4 text-white/80 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/knowledge"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-white/90 hover:bg-white text-[#A4556B] hover:text-[#7D3B4E] border-2 border-[#E2C3CB] hover:border-[#A4556B] backdrop-blur-sm text-sm sm:text-base font-semibold px-7 py-3.5 rounded-full shadow-soft hover:shadow-card hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-300 min-h-[50px]"
              >
                <BookOpen
                  className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>{t.home.secondaryCta}</span>
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#64424D]/80">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A9B8A2]" aria-hidden="true" />
                <span className="font-medium">{t.home.guarantee1}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A9B8A2]" aria-hidden="true" />
                <span className="font-medium">{t.home.guarantee2}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A9B8A2]" aria-hidden="true" />
                <span className="font-medium">{t.home.guarantee3}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Animated Floating Badges & 3D Tilt */}
          <div className="lg:col-span-5 flex justify-center relative animate-fadeIn">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION (Modernized Architectural Step Cards) */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#F3E3E7] text-xs font-bold text-[#A4556B]">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.home.howItWorksBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#64424D] tracking-tight">
            {t.home.howItWorksTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#64424D]/75 leading-relaxed">
            {t.home.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Step 1 */}
          <div className="group relative rounded-3xl bg-white/90 backdrop-blur-md border border-[#F3E3E7] hover:border-[#A4556B]/40 p-7 sm:p-8 shadow-[0_4px_20px_rgba(100,66,77,0.05)] hover:shadow-[0_12px_35px_rgba(164,85,107,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top ambient glow bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A4556B] to-[#D58B9B] opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F3E3E7] to-white border border-[#E9D2D8] text-[#A4556B] flex items-center justify-center font-black text-lg shadow-xs group-hover:scale-105 group-hover:shadow-sm transition-all duration-300">
                  01
                </div>
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F3E3E7] text-[#A4556B]">
                  <Camera className="w-3 h-3" aria-hidden="true" />
                  <span>{language === 'id' ? 'Langkah Awal' : 'Initial Step'}</span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#64424D] group-hover:text-[#A4556B] transition-colors">
                  {t.home.step1Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64424D]/75 leading-relaxed">
                  {t.home.step1Desc}
                </p>
              </div>
            </div>

            {/* Micro Preview Capsule */}
            <div className="mt-6 pt-4 border-t border-[#F3E3E7] flex items-center justify-between text-[11px] text-[#64424D]/70 font-medium">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A9B8A2]" />
                <span>{language === 'id' ? 'Cahaya Natural' : 'Natural Light'}</span>
              </span>
              <span className="text-[#A4556B] font-semibold">
                {language === 'id' ? 'Format JPEG/PNG' : 'JPEG/PNG Format'}
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group relative rounded-3xl bg-white/90 backdrop-blur-md border border-[#F3E3E7] hover:border-[#A9B8A2]/60 p-7 sm:p-8 shadow-[0_4px_20px_rgba(100,66,77,0.05)] hover:shadow-[0_12px_35px_rgba(169,184,162,0.18)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top ambient glow bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A9B8A2] to-[#7A9BB3] opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A9B8A2]/20 to-white border border-[#A9B8A2]/30 text-[#3E5236] flex items-center justify-center font-black text-lg shadow-xs group-hover:scale-105 group-hover:shadow-sm transition-all duration-300">
                  02
                </div>
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#A9B8A2]/20 text-[#3E5236]">
                  <Binary className="w-3 h-3" aria-hidden="true" />
                  <span>{language === 'id' ? 'Machine Learning' : 'AI Computing'}</span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#64424D] group-hover:text-[#3E5236] transition-colors">
                  {t.home.step2Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64424D]/75 leading-relaxed">
                  {t.home.step2Desc}
                </p>
              </div>
            </div>

            {/* Micro Preview Capsule */}
            <div className="mt-6 pt-4 border-t border-[#F3E3E7] flex items-center justify-between text-[11px] text-[#64424D]/70 font-medium">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A4556B]" />
                <span>{language === 'id' ? '4 Kelas Kulit' : '4 Skin Classes'}</span>
              </span>
              <span className="text-[#3E5236] font-semibold">
                {language === 'id' ? 'Skor Keyakinan Asli' : 'Genuine Scores'}
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group relative rounded-3xl bg-white/90 backdrop-blur-md border border-[#F3E3E7] hover:border-[#B7A7C9]/60 p-7 sm:p-8 shadow-[0_4px_20px_rgba(100,66,77,0.05)] hover:shadow-[0_12px_35px_rgba(183,167,201,0.2)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top ambient glow bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B7A7C9] to-[#D58B9B] opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B7A7C9]/25 to-white border border-[#B7A7C9]/40 text-[#553C6E] flex items-center justify-center font-black text-lg shadow-xs group-hover:scale-105 group-hover:shadow-sm transition-all duration-300">
                  03
                </div>
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#B7A7C9]/20 text-[#553C6E]">
                  <Microscope className="w-3 h-3" aria-hidden="true" />
                  <span>{language === 'id' ? 'Bukti Dermatologi' : 'Clinical Evidence'}</span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#64424D] group-hover:text-[#553C6E] transition-colors">
                  {t.home.step3Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64424D]/75 leading-relaxed">
                  {t.home.step3Desc}
                </p>
              </div>
            </div>

            {/* Micro Preview Capsule */}
            <div className="mt-6 pt-4 border-t border-[#F3E3E7] flex items-center justify-between text-[11px] text-[#64424D]/70 font-medium">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B7A7C9]" />
                <span>{language === 'id' ? 'Jurnal PubMed' : 'PubMed Citations'}</span>
              </span>
              <span className="text-[#553C6E] font-semibold">
                {language === 'id' ? 'Panduan Rutin AM/PM' : 'AM/PM Routine'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES / FEATURES SECTION (Modernized Bento-Style Cards) */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#F3E3E7] text-xs font-bold text-[#A4556B]">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.home.featuresBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#64424D] tracking-tight">
            {t.home.featuresTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#64424D]/75 leading-relaxed">
            {t.home.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1: Image Classification */}
          <div className="group relative rounded-3xl bg-gradient-to-b from-white via-white to-[#A9B8A2]/10 border border-[#F3E3E7] hover:border-[#A9B8A2]/60 hover:shadow-[0_12px_35px_rgba(169,184,162,0.18)] hover:-translate-y-1.5 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#A9B8A2]/20 text-[#3E5236] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs">
                  <Cpu className="w-6 h-6 stroke-[1.75]" aria-hidden="true" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-white border border-[#A9B8A2]/30 text-[#3E5236] shadow-xs">
                  Teachable Machine
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#64424D]">
                  {t.home.feature1Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64424D]/80 leading-relaxed">
                  {t.home.feature1Desc}
                </p>
              </div>

              {/* Interactive Visual Mockup Inside Card */}
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#64424D]/80">
                  <span>Normal Skin Match</span>
                  <span className="text-[#3E5236] font-bold">94.2%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white border border-[#E9D2D8] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#A9B8A2] to-[#7A9BB3] rounded-full w-[94%]" />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/skin-analysis"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-full bg-white hover:bg-[#F3E3E7]/50 text-xs sm:text-sm font-bold text-[#A4556B] border border-[#E2C3CB] hover:border-[#A4556B] shadow-xs hover:shadow-soft transition-all duration-200"
              >
                <span>{t.home.feature1Cta}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Feature 2: Object Detection (YOLO) */}
          <div className="group relative rounded-3xl bg-gradient-to-b from-white via-white to-[#D58B9B]/10 border border-[#F3E3E7] hover:border-[#D58B9B]/60 hover:shadow-[0_12px_35px_rgba(213,139,155,0.18)] hover:-translate-y-1.5 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#D58B9B]/20 text-[#8A374A] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs">
                  <Scan className="w-6 h-6 stroke-[1.75]" aria-hidden="true" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-white border border-[#D58B9B]/30 text-[#8A374A] shadow-xs">
                  YOLO Multi-Zona
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#64424D]">
                  {t.home.feature2Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64424D]/80 leading-relaxed">
                  {t.home.feature2Desc}
                </p>
              </div>

              {/* Interactive Visual Mockup Inside Card */}
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#8A374A]">T-Zone Sebum Region</span>
                  <span className="font-mono text-[10px] bg-[#D58B9B]/25 text-[#8A374A] px-1.5 py-0.5 rounded">
                    conf: 0.88
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#254153]">U-Zone Hydration Region</span>
                  <span className="font-mono text-[10px] bg-[#7A9BB3]/25 text-[#254153] px-1.5 py-0.5 rounded">
                    conf: 0.76
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/skin-analysis"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-full bg-white hover:bg-[#F3E3E7]/50 text-xs sm:text-sm font-bold text-[#A4556B] border border-[#E2C3CB] hover:border-[#A4556B] shadow-xs hover:shadow-soft transition-all duration-200"
              >
                <span>{t.home.feature2Cta}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Feature 3: RAG Assistant */}
          <div className="group relative rounded-3xl bg-gradient-to-b from-white via-white to-[#B7A7C9]/15 border border-[#F3E3E7] hover:border-[#B7A7C9]/60 hover:shadow-[0_12px_35px_rgba(183,167,201,0.2)] hover:-translate-y-1.5 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#B7A7C9]/25 text-[#553C6E] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs">
                  <MessageSquare className="w-6 h-6 stroke-[1.75]" aria-hidden="true" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-white border border-[#B7A7C9]/35 text-[#553C6E] shadow-xs">
                  RAG • PubMed
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#64424D]">
                  {t.home.feature3Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64424D]/80 leading-relaxed">
                  {t.home.feature3Desc}
                </p>
              </div>

              {/* Interactive Visual Mockup Inside Card */}
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] space-y-1 text-xs">
                <p className="text-[11px] font-semibold text-[#553C6E] truncate">
                  &ldquo;Retinol + Hyaluronic Acid aman?&rdquo;
                </p>
                <p className="text-[10px] text-[#64424D]/75 leading-relaxed">
                  Sinergis: Hyaluronic memitigasi iritasi awal retinoid.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/assistant"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-full bg-white hover:bg-[#F3E3E7]/50 text-xs sm:text-sm font-bold text-[#A4556B] border border-[#E2C3CB] hover:border-[#A4556B] shadow-xs hover:shadow-soft transition-all duration-200"
              >
                <span>{t.home.feature3Cta}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRINCIPLES & TRANSPARENCY BAR */}
      <section className="rounded-3xl bg-white/90 backdrop-blur-md border border-[#F3E3E7] p-6 sm:p-10 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#A4556B] bg-[#F3E3E7] px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.home.ethicsBadge}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#64424D]">
              {t.home.ethicsTitle}
            </h3>
          </div>
          <p className="text-xs text-[#64424D]/75 max-w-md leading-relaxed">
            {t.home.ethicsDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs text-[#64424D]/85">
          <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#A9B8A2] shrink-0" aria-hidden="true" />
            <span className="font-semibold">{t.home.ethicsPoint1}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] flex items-center space-x-2.5">
            <BookMarked className="w-4 h-4 text-[#A4556B] shrink-0" aria-hidden="true" />
            <span className="font-semibold">{t.home.ethicsPoint2}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] flex items-center space-x-2.5">
            <Lock className="w-4 h-4 text-[#64424D] shrink-0" aria-hidden="true" />
            <span className="font-semibold">{t.home.ethicsPoint3}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] flex items-center space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-[#B7A7C9] shrink-0" aria-hidden="true" />
            <span className="font-semibold">{t.home.ethicsPoint4}</span>
          </div>
        </div>
      </section>

      {/* 5. CALL-TO-ACTION CARD (Balanced & Proportional) */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#64424D] via-[#7D3B4E] to-[#A4556B] text-white p-6 sm:p-8 shadow-card border border-white/20">
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/95">
            <Sparkles className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            <span>{t.home.ctaCardBadge || 'Teknologi Cerdas • Bebas Iklan'}</span>
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            {t.home.ctaCardTitle || 'Siap Memahami Karakteristik Sejati Kulit Wajah Anda?'}
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-white/85 max-w-xl mx-auto leading-relaxed">
            {t.home.ctaCardSubtitle ||
              'Mulai analisis mandiri berbasis model AI dan panduan dermatologi ilmiah hari ini — cepat, gratis, dan tanpa bias promosi komersial.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/skin-analysis"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-white hover:bg-[#FCF8F6] text-[#64424D] text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-soft hover:shadow-card hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
              <span>{t.home.ctaCardPrimary || 'Mulai Analisis Kulit Sekarang'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#64424D]/70 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            <Link
              href="/assistant"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full backdrop-blur-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
            >
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.home.ctaCardSecondary || 'Tanya Asisten AI'}</span>
            </Link>
          </div>

          {/* Trust points strip */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-white/80 font-medium border-t border-white/15">
            <span>⚡ {t.home.ctaCardTrust1 || 'Proses Instan < 3 Detik'}</span>
            <span>🔒 {t.home.ctaCardTrust2 || 'Privasi Terjaga di Perangkat'}</span>
            <span>📚 {t.home.ctaCardTrust3 || 'Rujukan Literatur Ilmiah'}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
