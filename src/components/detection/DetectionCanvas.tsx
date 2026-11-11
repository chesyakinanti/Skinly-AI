'use client';

import React, { useRef, useEffect, useState } from 'react';
import { BoundingBox } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export interface DetectionCanvasProps {
  imageUrl: string;
  boxes: BoundingBox[];
  className?: string;
}

export const DetectionCanvas: React.FC<DetectionCanvasProps> = ({
  imageUrl,
  boxes,
  className = '',
}) => {
  const { language, t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageObjRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
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
    canvas.height = img.naturalHeight || 640;

    // Draw background image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw bounding boxes
    boxes.forEach((box) => {
      const isOily = box.label === 'oily_region';
      const strokeColor = isOily ? '#D58B9B' : '#7A9BB3';
      const fillColor = isOily ? 'rgba(213, 139, 155, 0.15)' : 'rgba(122, 155, 179, 0.15)';
      const tagBg = isOily ? '#D58B9B' : '#7A9BB3';

      const x = box.x * canvas.width;
      const y = box.y * canvas.height;
      const w = box.width * canvas.width;
      const h = box.height * canvas.height;

      // Box shape
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = Math.max(3, Math.round(canvas.width / 250));
      ctx.fillStyle = fillColor;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);

      // Label badge
      const regionText = isOily ? t.detection.oilyRegionLabel : t.detection.dryRegionLabel;
      const labelText = `${regionText} (${box.confidence}%)`;
      const fontSize = Math.max(14, Math.round(canvas.width / 35));
      ctx.font = `600 ${fontSize}px sans-serif`;

      const textMetrics = ctx.measureText(labelText);
      const padding = 8;
      const tagWidth = textMetrics.width + padding * 2;
      const tagHeight = fontSize + padding * 1.5;

      const tagY = y - tagHeight >= 0 ? y - tagHeight : y;

      ctx.fillStyle = tagBg;
      ctx.fillRect(x, tagY, tagWidth, tagHeight);

      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(labelText, x + padding, tagY + fontSize + 2);
    });
  }, [imageLoaded, boxes, t, language]);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] shadow-card group ${className}`}>
      {/* Biometric Framing Corners */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#A4556B] rounded-tl-md pointer-events-none z-10" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#A4556B] rounded-tr-md pointer-events-none z-10" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#A4556B] rounded-bl-md pointer-events-none z-10" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#A4556B] rounded-br-md pointer-events-none z-10" />

      {/* Sweeping Laser Scanner */}
      <div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A4556B] to-transparent shadow-[0_0_15px_#A4556B] pointer-events-none animate-scan z-10 opacity-70 group-hover:opacity-100"
        aria-hidden="true"
      />

      {!imageLoaded && (
        <div className="flex items-center justify-center h-80 text-xs text-[#64424D]/60">
          {language === 'id' ? 'Memuat visual foto...' : 'Loading photo visual...'}
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-auto max-h-[550px] object-contain mx-auto block"
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
    </div>
  );
};
