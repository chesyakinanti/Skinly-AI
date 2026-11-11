'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/skin-analysis', label: t.nav.skinAnalysis },
    { href: '/assistant', label: t.nav.assistant },
    { href: '/knowledge', label: t.nav.knowledge },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#FCF8F6]/95 backdrop-blur-md border-[#F3E3E7] shadow-soft'
          : 'bg-[#FCF8F6]/90 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Balanced height: 60px mobile, 68px desktop */}
        <div className="relative flex items-center justify-between h-[60px] sm:h-[68px]">
          {/* Brand Logo - Prominent, crisp, responsive */}
          <Link
            href="/"
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4556B] rounded-xl py-1 px-1 transition-all duration-300 z-10"
            aria-label="Skinly AI - Home"
          >
            <div className="flex items-center">
              <Image
                src="/assets/SkinlyAI_Logo_Trimmed.png"
                alt="Skinly AI Logo"
                width={200}
                height={91}
                priority
                style={{
                  height: '40px',
                  maxHeight: '44px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links - Centered exactly in the navbar */}
          <nav
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center space-x-1.5 z-10"
            aria-label="Navigasi Utama"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center justify-center text-center px-4 py-2 rounded-full text-xs xl:text-sm font-semibold tracking-[-0.01em] transition-all duration-250 ease-out select-none ${
                    isActive
                      ? 'bg-[#F3E3E7] text-[#A4556B] shadow-[0_2px_8px_rgba(164,85,107,0.18)] font-bold scale-[1.02]'
                      : 'text-[#64424D]/80 hover:text-[#A4556B] hover:bg-[#F3E3E7]/70 hover:-translate-y-0.5 active:translate-y-0 active:scale-95'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="text-center">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Language Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Toggle: ID | EN with Smooth Hover */}
            <div
              className="flex items-center p-0.5 rounded-full bg-white border border-[#E2C3CB] shadow-xs"
              role="group"
              aria-label="Language Selector"
            >
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  language === 'id'
                    ? 'bg-[#A4556B] text-white shadow-xs'
                    : 'text-[#64424D]/70 hover:text-[#A4556B] hover:bg-[#F3E3E7]/40'
                }`}
                aria-pressed={language === 'id'}
                aria-label="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-[#A4556B] text-white shadow-xs'
                    : 'text-[#64424D]/70 hover:text-[#A4556B] hover:bg-[#F3E3E7]/40'
                }`}
                aria-pressed={language === 'en'}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* Modern Action CTA with Ambient Glow & Sheen */}
            <Link
              href="/skin-analysis"
              className="group relative overflow-hidden inline-flex items-center space-x-2 bg-gradient-to-r from-[#A4556B] via-[#94465C] to-[#7D3B4E] hover:from-[#8F475B] hover:to-[#6C3041] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full shadow-[0_4px_14px_rgba(164,85,107,0.35)] hover:shadow-[0_8px_25px_rgba(164,85,107,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A4556B]"
            >
              <span
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none"
                aria-hidden="true"
              />
              <Sparkles
                className="w-3.5 h-3.5 text-white/95 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
                aria-hidden="true"
              />
              <span>{t.nav.startAnalysis}</span>
            </Link>
          </div>

          {/* Mobile Right Controls: Language Switcher + Hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile Language Toggle */}
            <div
              className="flex items-center p-0.5 rounded-full bg-white border border-[#E2C3CB] shadow-xs"
              role="group"
              aria-label="Language Toggle"
            >
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                  language === 'id'
                    ? 'bg-[#A4556B] text-white'
                    : 'text-[#64424D]/70'
                }`}
                aria-pressed={language === 'id'}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                  language === 'en'
                    ? 'bg-[#A4556B] text-white'
                    : 'text-[#64424D]/70'
                }`}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl text-[#64424D] hover:bg-[#F3E3E7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4556B]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#A4556B]" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-[#64424D]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-b border-[#F3E3E7] bg-[#FCF8F6]/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 shadow-card animate-fadeIn"
          id="mobile-menu"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all duration-200 ${
                    isActive
                      ? 'bg-[#F3E3E7] text-[#A4556B] font-bold'
                      : 'text-[#64424D] hover:bg-[#F3E3E7]/60 hover:text-[#A4556B]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-[#A4556B]" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#64424D]/40" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#F3E3E7]">
            <Link
              href="/skin-analysis"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#A4556B] to-[#8F475B] text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm active:scale-[0.99] transition-all"
            >
              <Sparkles className="w-4 h-4 text-white/95" aria-hidden="true" />
              <span>{t.nav.startAnalysis}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
