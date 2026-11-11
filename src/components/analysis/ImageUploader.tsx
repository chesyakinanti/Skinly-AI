'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Camera, AlertCircle } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { useLanguage } from '@/context/LanguageContext';

export interface ImageUploaderProps {
  onImageSelected: (file: File, previewUrl: string) => void;
  onClear: () => void;
  selectedPreviewUrl: string | null;
  isLoading?: boolean;
}

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  onClear,
  selectedPreviewUrl,
  isLoading = false,
}) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    setErrorMessage(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMessage(t.analysis.fileErrorType);
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrorMessage(t.analysis.fileErrorSize);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onImageSelected(file, previewUrl);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoading) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isLoading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    onClear();
  };

  return (
    <div className="w-full space-y-4">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileInputChange}
        className="hidden"
        id="image-file-input"
        aria-label={t.analysis.chooseFile}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileInputChange}
        className="hidden"
        id="camera-file-input"
        aria-label={t.analysis.openCamera}
      />

      {/* Selected Image Preview State */}
      {selectedPreviewUrl ? (
        <div className="relative rounded-2xl overflow-hidden border border-[#F3E3E7] bg-white shadow-card p-4 group">
          <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden bg-[#FCF8F6] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedPreviewUrl}
              alt="Uploaded facial preview"
              className="max-h-full max-w-full object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
            />

            {/* High-Tech Biometric Framing Corners */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#A4556B] rounded-tl-md pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#A4556B] rounded-tr-md pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#A4556B] rounded-bl-md pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#A4556B] rounded-br-md pointer-events-none" />

            {/* Laser Scan Sweep Line */}
            <div
              className={`absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A4556B] to-transparent shadow-[0_0_15px_#A4556B] pointer-events-none ${
                isLoading ? 'animate-scan' : 'opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity'
              }`}
              aria-hidden="true"
            >
              <div className="absolute left-1/2 -translate-x-1/2 -top-1 px-2 py-0.5 rounded-full bg-[#A4556B] text-[9px] text-white font-mono uppercase tracking-widest shadow-xs">
                {isLoading ? 'ANALYZING...' : 'AI SCANNER'}
              </div>
            </div>

            {/* HUD Status Overlay */}
            <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-md bg-white/80 backdrop-blur-md border border-[#F3E3E7] text-[10px] font-mono text-[#64424D] shadow-xs pointer-events-none">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A4556B] mr-1.5 animate-pulse" />
              {isLoading ? 'EXTRACTING SEBUM METRICS' : 'FACIAL ZONE READY'}
            </div>

            {!isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#64424D] hover:bg-white hover:text-[#A4556B] shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4556B]"
                aria-label="Remove photo"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-[#64424D]/75 px-1">
            <span>{t.analysis.readyToAnalyze}</span>
            {!isLoading && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[#A4556B] hover:underline font-semibold"
              >
                {t.analysis.changePhoto}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Drag-and-drop Dropzone State */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer ${
            isDragging
              ? 'border-[#A4556B] bg-[#F3E3E7]/40 scale-[1.005]'
              : 'border-[#E2C3CB] bg-white hover:border-[#A4556B] hover:bg-[#FCF8F6]'
          }`}
          onClick={() => fileInputRef.current?.click()}
          role="region"
          aria-label={t.analysis.dropzoneAria}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F3E3E7] text-[#A4556B] flex items-center justify-center">
              <UploadCloud className="w-8 h-8 stroke-[1.75]" aria-hidden="true" />
            </div>

            <div className="space-y-1">
              <p className="text-base font-semibold text-[#64424D]">
                {t.analysis.uploadAreaTitle}
              </p>
              <p className="text-xs sm:text-sm text-[#64424D]/70">
                {t.analysis.uploadAreaSubtitle}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                leftIcon={<ImageIcon className="w-4 h-4" aria-hidden="true" />}
              >
                {t.analysis.chooseFile}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  cameraInputRef.current?.click();
                }}
                leftIcon={<Camera className="w-4 h-4" aria-hidden="true" />}
              >
                {t.analysis.openCamera}
              </Button>
            </div>

            <p className="text-[11px] text-[#64424D]/60 pt-2">
              {t.analysis.supportedFormats}
            </p>
          </div>
        </div>
      )}

      {/* Validation Error Message */}
      {errorMessage && (
        <div
          className="flex items-center space-x-2 text-xs text-[#8A374A] bg-[#D58B9B]/15 border border-[#D58B9B]/30 rounded-xl p-3"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-[#8A374A]" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
