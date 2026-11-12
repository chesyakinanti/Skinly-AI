'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/assistant/ChatMessage';
import { ChatInput } from '@/components/assistant/ChatInput';
import { Card } from '@/components/common/Card';
import {
  Sparkles,
  RotateCcw,
  Database,
} from 'lucide-react';
import { ragAssistantService } from '@/services/ragAssistantService';
import { ChatMessage as ChatMessageType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export default function AssistantPage() {
  const { language, t } = useLanguage();

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Initialize or update welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        content: t.assistant.welcomeMsg,
        timestamp: t.assistant.justNow,
        references: [
          {
            title: 'Evidence-Based Skincare Knowledge Repository',
            source: 'Skinly AI Dermatological Science Base v1.0',
          },
        ],
      },
    ]);
  }, [language, t.assistant.welcomeMsg, t.assistant.justNow]);

  // Scroll ONLY the internal chat container, NEVER the window or page
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    // Avoid scrolling on initial page load so page doesn't shift
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToBottom('smooth');
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessageType = {
      id: `user_${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString(language === 'id' ? 'id-ID' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const answer = await ragAssistantService.askQuestion(text, language);
      const assistantMsg: ChatMessageType = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        content: answer.content,
        timestamp: new Date().toLocaleTimeString(language === 'id' ? 'id-ID' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        references: answer.references,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessageType = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        content: t.assistant.errorMsg,
        timestamp: 'Error',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'assistant',
        content: t.assistant.welcomeResetMsg,
        timestamp: t.assistant.justNow,
      },
    ]);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isConfigured = ragAssistantService.isConfigured();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeInUp">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#F3E3E7] text-xs font-semibold text-[#A4556B] mb-2">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.assistant.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#64424D] tracking-tight">
            {t.assistant.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#64424D]/75 mt-1">
            {t.assistant.subtitle}
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Backend Status Badge */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2C3CB] text-[11px] font-medium text-[#64424D] shadow-xs">
            <Database className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
            <span>
              {isConfigured ? t.assistant.connectedBadge : t.assistant.localBaseBadge}
            </span>
          </div>

          {/* Reset Conversation Button: Distinct, Prominent Button */}
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F3E3E7] text-[#64424D] hover:text-[#A4556B] border border-[#E2C3CB] hover:border-[#A4556B] text-xs font-semibold shadow-xs hover:shadow-soft active:scale-95 transition-all duration-200 cursor-pointer group"
            aria-label={t.assistant.resetChat}
            title={t.assistant.resetChat}
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#A4556B] transition-transform duration-300 group-hover:-rotate-90" aria-hidden="true" />
            <span>{t.assistant.resetChat}</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <Card className="min-h-[460px] max-h-[600px] flex flex-col justify-between p-4 sm:p-6 shadow-card border border-[#F3E3E7] bg-white">
        {/* Messages List Area - scroll happens ONLY inside this container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2 mb-4 scrollbar-thin"
          role="log"
          aria-live="polite"
        >
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* Animated AI Typing Indicator */}
          {isLoading && (
            <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl w-fit border border-[#F3E3E7] shadow-soft animate-fadeIn">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#A4556B] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#A4556B] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#A4556B] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs text-[#64424D]/70 font-medium pl-1">
                {language === 'id'
                  ? 'Mencocokkan rujukan literatur ilmiah...'
                  : 'Retrieving peer-reviewed scientific literature...'}
              </span>
            </div>
          )}
        </div>

        {/* Chat Input & Suggested Questions */}
        <div className="pt-3 border-t border-[#F3E3E7]">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            suggestedQuestions={t.assistant.suggestedQuestions}
          />
        </div>
      </Card>
    </div>
  );
}
