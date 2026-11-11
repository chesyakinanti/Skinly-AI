'use client';

import React from 'react';
import Image from 'next/image';
import { ChatMessage as ChatMessageType } from '@/types';
import { BookMarked, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { t } = useLanguage();
  const isAssistant = message.sender === 'assistant';

  // Formatted text renderer supporting bold, bullets, and linebreaks
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold text handling
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={`${idx}-${match.index}`} className="font-semibold text-[#64424D]">
            {match[1]}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      if (line.trim().startsWith('•')) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm leading-relaxed tracking-[-0.005em] my-1">
            {parts.length > 0 ? parts : line.replace('•', '').trim()}
          </li>
        );
      }

      return (
        <p key={idx} className="text-xs sm:text-sm leading-relaxed tracking-[-0.005em] min-h-[1.25rem]">
          {parts.length > 0 ? parts : line}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex items-start gap-3 sm:gap-4 ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      {/* Assistant Avatar */}
      {isAssistant && (
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-[#F3E3E7] border border-[#E2C3CB] shrink-0 mt-0.5 flex items-center justify-center">
          <Image
            src="/assets/SkinlyAI_App_Icon.png"
            alt="Skinly AI Avatar"
            fill
            sizes="36px"
            className="object-contain p-0.5"
          />
        </div>
      )}

      {/* Message Bubble Container */}
      <div
        className={`max-w-[85%] sm:max-w-[78%] space-y-2 rounded-2xl p-4 sm:p-5 shadow-soft ${
          isAssistant
            ? 'bg-white border border-[#F3E3E7] text-[#64424D]'
            : 'bg-[#A4556B] text-white rounded-tr-sm'
        }`}
      >
        <div className="space-y-1.5">{renderFormattedText(message.content)}</div>

        {/* Evidence Sources / Citations below AI answer */}
        {isAssistant && message.references && message.references.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#F3E3E7] space-y-1.5">
            <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-[#A4556B] uppercase tracking-wider">
              <BookMarked className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.assistant.referencesTitle}</span>
            </div>
            <div className="space-y-1">
              {message.references.map((ref, i) => (
                <div
                  key={i}
                  className="p-2 rounded-lg bg-[#FCF8F6] border border-[#F3E3E7] text-[11px] text-[#64424D]/80 leading-normal"
                >
                  <p className="font-medium text-[#64424D]">{ref.title}</p>
                  <p className="text-[#64424D]/60 text-[10px] mt-0.5">{ref.source}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div
          className={`text-[10px] pt-1 text-right ${
            isAssistant ? 'text-[#64424D]/50' : 'text-white/70'
          }`}
        >
          {message.timestamp}
        </div>
      </div>

      {/* User Icon */}
      {!isAssistant && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3E3E7] text-[#A4556B] shrink-0 mt-0.5 flex items-center justify-center border border-[#E2C3CB]">
          <User className="w-4 h-4" aria-hidden="true" />
        </div>
      )}
    </div>
  );
};
