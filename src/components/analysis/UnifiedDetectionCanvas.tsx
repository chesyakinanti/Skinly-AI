'use client';

import React, { useRef, useEffect, useState } from 'react';
import { BoundingBox } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export interface UnifiedDetectionCanvasProps {
  imageUrl: string;
  boxes: BoundingBox[];
  isScanning?: boolean;
  className?: string;
}

export const UnifiedDetectionCanvas: React.FC<UnifiedDetectionCanvasProps> = ({
  imageUrl,
  boxes,
  isScanning = false,
  className = '',
}) => {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageObjRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      imageObjRef.current = img;
      setImageLoaded(true);
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!imageLoaded || !imageObjRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageObjRef.current;
    canvas.width = img.naturalWidth || 640;
    canvas.height = img.naturalHeight || 800;

    // Draw base face image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw bounding boxes matching the exact UI mockup specification:
    // Yellow for Dry Zone, Cyan for Oily Zone
    boxes.forEach((box) => {
      const isOily = box.label === 'oily_region';
      const strokeColor = isOily ? '#38BDF8' : '#FACC15'; // Cyan or Yellow
      const fillColor = isOily ? 'rgba(56, 189, 248, 0.12)' : 'rgba(250, 204, 21, 0.12)';
      const badgeBg = isOily ? '#38BDF8' : '#FACC15';
      const badgeText = isOily ? '#082F49' : '#422006';

      const x = box.x * canvas.width;
      const y = box.y * canvas.height;
      const w = box.width * canvas.width;
      const h = box.height * canvas.height;

      // Rounded rectangle for bounding box
      const radius = Math.min(16, Math.max(8, canvas.width / 50));
      ctx.save();
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, radius);
      } else {
        ctx.rect(x, y, w, h);
      }
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.lineWidth = Math.max(3, Math.round(canvas.width / 220));
      ctx.strokeStyle = strokeColor;
      ctx.stroke();
      ctx.restore();

      // Floating Badge Pill (e.g. "Oily Zone 0.91", "Dry Zone 0.87")
      const confScore = (box.confidence > 1 ? box.confidence / 100 : box.confidence).toFixed(2);
      const zoneLabel = isOily
        ? language === 'id'
          ? `Oily Zone ${confScore}`
          : `Oily Zone ${confScore}`
        : language === 'id'
        ? `Dry Zone ${confScore}`
        : `Dry Zone ${confScore}`;

      const fontSize = Math.max(13, Math.round(canvas.width / 36));
      ctx.font = `700 ${fontSize}px var(--font-inter), sans-serif`;

      const textMetrics = ctx.measureText(zoneLabel);
      const padX = fontSize * 0.75;
      const padY = fontSize * 0.45;
      const pillWidth = textMetrics.width + padX * 2;
      const pillHeight = fontSize + padY * 2;
      const pillRadius = pillHeight / 2;

      // Position badge at top-center or top of bounding box
      const pillX = Math.max(x, Math.min(x + w / 2 - pillWidth / 2, canvas.width - pillWidth - 8));
      const pillY = y - pillHeight / 2 >= 8 ? y - pillHeight / 2 : y + 6;

      ctx.save();
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(pillX, pillY, pillWidth, pillHeight, pillRadius);
      } else {
        ctx.rect(pillX, pillY, pillWidth, pillHeight);
      }
      ctx.fillStyle = badgeBg;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.fill();
      ctx.restore();

      // Draw Badge Text
      ctx.fillStyle = badgeText;
      ctx.textBaseline = 'middle';
      ctx.fillText(zoneLabel, pillX + padX, pillY + pillHeight / 2);
    });
  }, [imageLoaded, boxes, language]);

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden bg-[#FCF8F6] border border-[#F3E3E7] shadow-[0_8px_30px_rgba(100,66,77,0.08)] flex items-center justify-center ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto max-h-[640px] object-cover rounded-3xl transition-opacity duration-300"
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />

      {!imageLoaded && (
        <div className="aspect-[3/4] w-full flex items-center justify-center text-xs text-[#64424D]/60 animate-pulse">
          {language === 'id' ? 'Memuat visualisasi wajah...' : 'Loading face visual...'}
        </div>
      )}

      {/* Sweeping Laser Scanner during active analysis */}
      {isScanning && (
        <div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A4556B] to-transparent shadow-[0_0_15px_#A4556B] pointer-events-none animate-scan z-20"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
