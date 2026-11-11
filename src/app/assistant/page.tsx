'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/assistant/ChatMessage';
import { ChatInput } from '@/components/assistant/ChatInput';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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

        <div className="flex items-center space-x-2">
          {/* Backend Status Badge */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2C3CB] text-[11px] font-medium text-[#64424D] shadow-xs">
            <Database className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
            <span>
              {isConfigured ? t.assistant.connectedBadge : t.assistant.localBaseBadge}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />}
            aria-label={t.assistant.resetChat}
          >
            {t.assistant.resetChat}
          </Button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <Card className="min-h-[460px] max-h-[600px] flex flex-col justify-between p-4 sm:p-6 shadow-card border border-[#F3E3E7] bg-white">
        {/* Messages List Area */}
        <div
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

          <div ref={messagesEndRef} />
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
