'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { ClassificationResult, BoundingBox } from '@/types';
import { speechService, generateSpeechScript } from '@/services/speechService';
import { useLanguage } from '@/context/LanguageContext';

export interface SkinlyVoiceAssistantProps {
  classification: ClassificationResult;
  boxes?: BoundingBox[];
  className?: string;
  autoPlay?: boolean;
}

export const SkinlyVoiceAssistant: React.FC<SkinlyVoiceAssistantProps> = ({
  classification,
  boxes = [],
  className = '',
  autoPlay = true,
}) => {
  const { language } = useLanguage();
  const [isSupported, setIsSupported] = useState(true);
  const [status, setStatus] = useState<'idle' | 'speaking' | 'paused' | 'ended' | 'error'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayTranscript, setDisplayTranscript] = useState('');
  const [spokenScript, setSpokenScript] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isMountedRef = useRef(true);

  // Generate speech script (both display transcript and phonetically formatted spoken text)
  useEffect(() => {
    const script = generateSpeechScript(classification, boxes, language as 'id' | 'en');
    setDisplayTranscript(script.displayTranscript);
    setSpokenScript(script.spokenText);
  }, [classification, boxes, language]);

  // Check Web Speech API support
  useEffect(() => {
    isMountedRef.current = true;
    setIsSupported(speechService.isSupported());
    setIsMuted(speechService.getMuted());

    return () => {
      isMountedRef.current = false;
      speechService.stop();
    };
  }, []);

  // Main speech trigger function
  const startSpeaking = useCallback(
    (textToSpeak: string) => {
      if (!isSupported || !textToSpeak) return;

      if (speechService.getMuted()) {
        setStatus('idle');
        return;
      }

      setErrorMessage(null);

      speechService.speak(textToSpeak, {
        language: language === 'id' ? 'id-ID' : 'en-US',
        rate: 0.92,
        pitch: 1.08,
        onStart: () => {
          if (isMountedRef.current) setStatus('speaking');
        },
        onEnd: () => {
          if (isMountedRef.current) setStatus('ended');
        },
        onPause: () => {
          if (isMountedRef.current) setStatus('paused');
        },
        onResume: () => {
          if (isMountedRef.current) setStatus('speaking');
        },
        onError: () => {
          if (isMountedRef.current) {
            setStatus('error');
            setErrorMessage(
              language === 'id'
                ? 'Audio tertahan izin peramban. Klik tombol Putar Ulang untuk mendengarkan.'
                : 'Audio blocked by browser permissions. Click Replay to listen.'
            );
          }
        },
      });
    },
    [isSupported, language]
  );

  // Automatically speak when new analysis results are presented
  useEffect(() => {
    if (!spokenScript || !autoPlay) return;

    const timer = setTimeout(() => {
      startSpeaking(spokenScript);
    }, 400);

    return () => {
      clearTimeout(timer);
      speechService.stop();
    };
  }, [spokenScript, autoPlay, startSpeaking]);

  // Handle Mute / Unmute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    speechService.setMuted(nextMuted);

    if (nextMuted) {
      speechService.stop();
      setStatus('idle');
    } else {
      startSpeaking(spokenScript);
    }
  };

  // Handle Pause / Resume
  const handlePauseResume = () => {
    if (status === 'speaking') {
      speechService.pause();
      setStatus('paused');
    } else if (status === 'paused') {
      speechService.resume();
      setStatus('speaking');
    } else {
      startSpeaking(spokenScript);
    }
  };

  // Handle Replay from beginning
  const handleReplay = () => {
    if (isMuted) {
      setIsMuted(false);
      speechService.setMuted(false);
    }
    startSpeaking(spokenScript);
  };

  // Handle Uji Suara (Voice Test with standard sentence)
  const handleTestVoice = () => {
    if (isMuted) {
      setIsMuted(false);
      speechService.setMuted(false);
    }
    speechService.speakSampleTest({
      language: language === 'id' ? 'id-ID' : 'en-US',
      onStart: () => {
        if (isMountedRef.current) setStatus('speaking');
      },
      onEnd: () => {
        if (isMountedRef.current) setStatus('ended');
      },
      onError: () => {
        if (isMountedRef.current) setStatus('error');
      },
    });
  };

  const isSpeaking = status === 'speaking' && !isMuted;

  // Status Badge Label
  const statusLabel = (() => {
    if (!isSupported) {
      return language === 'id' ? 'Audio tidak didukung' : 'Speech not supported';
    }
    if (isMuted) {
      return language === 'id' ? 'Suara dimatikan' : 'Audio muted';
    }
    switch (status) {
      case 'speaking':
        return language === 'id' ? 'AI sedang menjelaskan...' : 'AI is speaking...';
      case 'paused':
        return language === 'id' ? 'Audio dijeda' : 'AI paused';
      case 'ended':
        return language === 'id' ? 'Penjelasan selesai' : 'Explanation complete';
      case 'error':
        return language === 'id' ? 'Audio dijeda' : 'Audio paused';
      case 'idle':
      default:
        return language === 'id' ? 'Asisten siap mendampingi' : 'Assistant ready';
    }
  })();

  return (
    <div
      className={`rounded-2xl p-4 bg-white border border-[#F3E3E7] shadow-[0_4px_20px_-2px_rgba(100,66,77,0.05)] space-y-3 transition-all ${className}`}
      role="region"
      aria-label="Skinly AI Voice Assistant"
    >
      {/* Top Header Row: AI Avatar, Title & Status */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#F3E3E7] border border-[#F3E3E7] flex items-center justify-center text-[#A4556B] shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-[#64424D] tracking-tight">
                Skinly AI Assistant
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A4556B]" />
            </div>
            <p className="text-[11px] text-[#64424D]/70 font-normal leading-tight">
              {statusLabel}
            </p>
          </div>
        </div>

        {/* Small Audio Waveform (Animated in Rose Pink when speaking) */}
        <div
          className="flex items-center space-x-1 h-5 px-2 py-0.5 rounded-full bg-[#FCF8F6] border border-[#F3E3E7]"
          aria-hidden="true"
        >
          {[1, 2, 3, 4].map((bar) => {
            const barHeights = isSpeaking ? [12, 16, 9, 14] : [4, 4, 4, 4];
            return (
              <span
                key={bar}
                className={`w-0.5 rounded-full transition-all duration-200 ${
                  isSpeaking ? 'bg-[#A4556B]' : 'bg-[#E5C7D0]'
                }`}
                style={{
                  height: `${barHeights[bar - 1]}px`,
                  transitionDelay: `${bar * 50}ms`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Transcript Text Box */}
      <div className="rounded-xl p-3 bg-[#FCF8F6] border border-[#F3E3E7]">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-xs text-[#64424D] leading-relaxed italic ${
              isExpanded ? '' : 'line-clamp-2'
            }`}
          >
            &ldquo;{displayTranscript}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0.5 text-[#64424D]/60 hover:text-[#A4556B] transition-colors shrink-0"
            aria-label={isExpanded ? 'Tutup teks lengkap' : 'Buka semua teks'}
          >
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Action Controls: [Putar Ulang] [Jeda/Lanjutkan] [Uji Suara] [Mute/Suara] */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#F3E3E7]">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Replay */}
          <button
            type="button"
            onClick={handleReplay}
            disabled={!isSupported}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FCF8F6] hover:bg-[#F3E3E7] border border-[#F3E3E7] text-xs font-semibold text-[#64424D] transition-colors disabled:opacity-50"
            aria-label="Putar Ulang Penjelasan Suara"
            title="Putar Ulang"
          >
            <RotateCcw className="w-3 h-3 text-[#A4556B]" />
            <span>Putar Ulang</span>
          </button>

          {/* Pause / Resume */}
          <button
            type="button"
            onClick={handlePauseResume}
            disabled={isMuted || !isSupported}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FCF8F6] hover:bg-[#F3E3E7] border border-[#F3E3E7] text-xs font-semibold text-[#64424D] transition-colors disabled:opacity-50"
            aria-label={status === 'speaking' ? 'Jeda Suara' : 'Lanjutkan Suara'}
            title={status === 'speaking' ? 'Jeda' : 'Lanjutkan'}
          >
            {status === 'speaking' ? (
              <>
                <Pause className="w-3 h-3 text-[#A4556B]" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#A4556B]" />
                <span>Lanjutkan</span>
              </>
            )}
          </button>

          {/* Uji Suara */}
          <button
            type="button"
            onClick={handleTestVoice}
            disabled={!isSupported}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#F3E3E7] hover:bg-[#A4556B] border border-[#F3E3E7] text-xs font-bold text-[#A4556B] hover:text-white transition-all shadow-2xs active:scale-95 disabled:opacity-50"
            aria-label="Uji Suara Perempuan"
            title="Uji pelafalan suara perempuan"
          >
            <Sparkles className="w-3 h-3" />
            <span>Uji Suara</span>
          </button>
        </div>

        {/* Mute / Unmute */}
        <button
          type="button"
          onClick={handleToggleMute}
          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
            isMuted
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-white border-[#F3E3E7] hover:bg-[#FCF8F6] text-[#64424D] hover:text-[#A4556B]'
          }`}
          aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-600" />
              <span>Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#A4556B]" />
              <span>Suara</span>
            </>
          )}
        </button>
      </div>

      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-[11px] text-rose-700 flex items-center space-x-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
