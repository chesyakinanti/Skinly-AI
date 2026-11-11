'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Info, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white/95 backdrop-blur-md border-t border-[#F3E3E7] text-[#64424D] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-14">
          {/* Brand Column with Constrained Logo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center h-14">
              <Image
                src="/assets/SkinlyAI_Logo_Trimmed.png"
                alt="Skinly AI Logo"
                width={220}
                height={100}
                style={{
                  height: '48px',
                  maxHeight: '52px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#64424D]/80 max-w-md leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-[#64424D]/75">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F3E3E7] text-[#A4556B] font-semibold">
                {t.common.version}
              </span>
              <span>•</span>
              <span className="font-medium text-[#64424D]/80">{t.common.evidenceBased}</span>
              <span>•</span>
              <span className="font-medium text-[#64424D]/80">{t.common.privacyFirst}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-[#64424D] uppercase tracking-wider mb-4 font-heading">
              {t.footer.featuresHeader}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/skin-analysis" className="hover:text-[#A4556B] transition-colors">
                  {t.nav.skinAnalysis}
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-[#A4556B] transition-colors">
                  {t.nav.assistant}
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-[#A4556B] transition-colors">
                  {t.nav.knowledge}
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Safety Principles */}
          <div>
            <h3 className="text-xs font-bold text-[#64424D] uppercase tracking-wider mb-4 font-heading">
              {t.footer.ethicsHeader}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#64424D]/80">
              <li className="flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#A9B8A2] mt-0.5 shrink-0" aria-hidden="true" />
                <span>{t.footer.ethicsPoint1}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Info className="w-4 h-4 text-[#A9B8A2] mt-0.5 shrink-0" aria-hidden="true" />
                <span>{t.footer.ethicsPoint2}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Heart className="w-4 h-4 text-[#A9B8A2] mt-0.5 shrink-0" aria-hidden="true" />
                <span>{t.footer.ethicsPoint3}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Box */}
        <div className="mt-10 pt-6 border-t border-[#F3E3E7]">
          <div className="rounded-2xl bg-[#FCF8F6] p-4 sm:p-5 border border-[#F3E3E7] text-xs leading-relaxed text-[#64424D]/80 shadow-xs">
            <p className="font-bold text-[#64424D] mb-1 flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-[#A4556B]" aria-hidden="true" />
              <span>{t.footer.disclaimerTitle}</span>
            </p>
            <p>{t.footer.disclaimerBody}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64424D]/60 space-y-2 sm:space-y-0">
          <p>© {new Date().getFullYear()} Skinly AI. {t.footer.rights}</p>
          <p className="text-center sm:text-right font-medium text-[#64424D]/75">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};
