'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  suggestedQuestions: string[];
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  suggestedQuestions,
}) => {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSelectSuggested = (question: string) => {
    if (isLoading) return;
    onSendMessage(question);
  };

  return (
    <div className="space-y-3">
      {/* Suggested Questions Chips */}
      {suggestedQuestions.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-[#64424D]/60 uppercase tracking-wider flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-[#A4556B]" aria-hidden="true" />
            <span>{t.assistant.popularQuestionsBadge}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggested(question)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-full bg-white hover:bg-[#F3E3E7] text-[#64424D] hover:text-[#A4556B] border border-[#F3E3E7] shadow-sm transition-colors text-left disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.assistant.inputPlaceholder}
          disabled={isLoading}
          className="w-full px-4 sm:px-5 py-3.5 pr-14 rounded-2xl bg-white border border-[#E2C3CB] focus:border-[#A4556B] focus:ring-2 focus:ring-[#A4556B]/20 text-xs sm:text-sm text-[#64424D] placeholder-[#64424D]/50 shadow-soft transition-all"
          aria-label={t.assistant.inputPlaceholder}
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="absolute right-2 p-2.5 rounded-xl bg-[#A4556B] hover:bg-[#8F475B] text-white disabled:opacity-40 disabled:hover:bg-[#A4556B] shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4556B]"
          aria-label={t.assistant.sendAria}
        >
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
};
