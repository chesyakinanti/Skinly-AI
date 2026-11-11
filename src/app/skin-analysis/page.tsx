'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Camera,
  Upload,
  Info,
  AlertCircle,
  X,
  FileCheck,
  BarChart3,
  Cpu,
} from 'lucide-react';
import { CameraModal } from '@/components/analysis/CameraModal';
import { UnifiedDetectionCanvas } from '@/components/analysis/UnifiedDetectionCanvas';
import { UnifiedAnalysisResult } from '@/components/analysis/UnifiedAnalysisResult';
import { unifiedAnalysisService } from '@/services/unifiedAnalysisService';
import { BoundingBox, ClassificationResult } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export default function SkinAnalysisPage() {
  const { language, t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload & Camera State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Analysis State (Unified FastAPI Backend)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);
  const [boxes, setBoxes] = useState<BoundingBox[]>([]);
  const [isModelConnected, setIsModelConnected] = useState(true);
  const [detectionStatusMessage, setDetectionStatusMessage] = useState<string>('');

  // Handle file selection from local device
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError(
        language === 'id'
          ? 'Format berkas tidak didukung. Harap unggah berkas foto JPEG, PNG, atau WebP.'
          : 'Unsupported format. Please upload JPEG, PNG, or WebP.'
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        language === 'id'
          ? 'Ukuran foto melebihi batas 10MB.'
          : 'File size exceeds the 10MB limit.'
      );
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(url);
    setError(null);
    setClassificationResult(null);
    setBoxes([]);
  };

  // Handle camera capture confirmation
  const handleCameraCapture = (file: File, url: string) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(url);
    setError(null);
    setClassificationResult(null);
    setBoxes([]);
  };

  // Clear current image
  const handleClear = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
    setClassificationResult(null);
    setBoxes([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Unified FastAPI Backend Inference Function
  const handleAnalyze = async () => {
    if (!selectedFile || !previewUrl) {
      setError(t.analysis.selectPhotoError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const output = await unifiedAnalysisService.analyzeSkin(selectedFile);
      setClassificationResult(output.classification);
      setBoxes(output.detection.boxes);
      setIsModelConnected(output.detection.isModelConnected);
      setDetectionStatusMessage(output.detection.statusMessage);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : language === 'id'
          ? 'Terjadi kegagalan saat menjalankan analisis melalui FastAPI Backend.'
          : 'Failed to run analysis via FastAPI Backend.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10 max-w-7xl mx-auto animate-fadeInUp">
      {/* Header */}
      <div className="space-y-2.5 text-left">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#A4556B] tracking-[0.06em] uppercase">
          <Cpu className="w-4 h-4 text-[#A4556B]" aria-hidden="true" />
          <span>
            {language === 'id'
              ? 'Unified AI Backend: MobileNetV2 + YOLOv8'
              : 'Unified AI Backend: MobileNetV2 + YOLOv8'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#64424D] tracking-[-0.035em] leading-[1.14]">
          Skin Analysis
        </h1>
        <p className="text-sm sm:text-base text-[#64424D]/80 max-w-2xl leading-relaxed tracking-[-0.01em]">
          {language === 'id'
            ? 'Analisis tipe kulit wajah Anda dan deteksi zona area kering & berminyak dalam satu pemindaian terpadu melalui FastAPI AI backend.'
            : 'Analyze your skin type and detect dry & oily areas from your face in one unified scan via FastAPI AI backend.'}
        </p>
      </div>

      {/* 3-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* COLUMN 1: UPLOAD & CAMERA CONTROLS (Left - 4 cols) */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-5">
          <div className="rounded-3xl bg-white border border-[#F3E3E7] p-5 sm:p-6 shadow-soft space-y-5">
            <h2 className="text-base font-extrabold text-[#64424D]">
              {language === 'id' ? 'Input Foto Wajah' : 'Analyze Your Skin'}
            </h2>

            {/* Dashed Upload Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="rounded-2xl border-2 border-dashed border-[#E2C3CB] hover:border-[#A4556B] bg-[#FCF8F6]/60 hover:bg-[#F3E3E7]/30 p-6 sm:p-7 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center space-y-3 group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
              }}
              aria-label="Upload face photo"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E9D2D8] flex items-center justify-center text-[#A4556B] shadow-xs group-hover:scale-110 group-hover:border-[#A4556B]/50 transition-all">
                <Upload className="w-5 h-5 stroke-[2]" aria-hidden="true" />
              </div>

              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-[#64424D]">
                  {language === 'id' ? 'Unggah Foto Wajah' : 'Upload a face photo'}
                </p>
                <p className="text-[11px] text-[#64424D]/60 font-medium">
                  JPG, PNG, or WEBP (max 10 MB)
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-full bg-[#8A374A] hover:bg-[#732C3C] text-white text-xs font-semibold shadow-xs hover:shadow-soft active:scale-95 transition-all"
              >
                <span>{language === 'id' ? 'Pilih Berkas' : 'Choose File'}</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
                aria-label="File upload input"
              />
            </div>

            {/* Open Camera Button */}
            <button
              type="button"
              onClick={() => setIsCameraOpen(true)}
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-full bg-[#FCF8F6] hover:bg-[#F3E3E7] border border-[#E2C3CB] hover:border-[#A4556B] text-xs font-bold text-[#64424D] hover:text-[#A4556B] shadow-xs active:scale-98 transition-all"
            >
              <Camera className="w-4 h-4 text-[#A4556B]" aria-hidden="true" />
              <span>{language === 'id' ? 'Gunakan Kamera Perangkat' : 'Open Camera'}</span>
            </button>

            {/* Selected File Status & Analyze Button */}
            {selectedFile && (
              <div className="space-y-3 pt-2 border-t border-[#F3E3E7]">
                <div className="p-3 rounded-xl bg-[#FCF8F6] border border-[#F3E3E7] flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-2 truncate">
                    <FileCheck className="w-4 h-4 text-[#A9B8A2] shrink-0" />
                    <span className="truncate font-semibold text-[#64424D]">
                      {selectedFile.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 rounded-full text-[#64424D]/60 hover:text-[#A4556B] hover:bg-white transition-colors shrink-0"
                    aria-label="Remove photo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-full bg-gradient-to-r from-[#A4556B] via-[#94465C] to-[#7D3B4E] hover:from-[#8F475B] hover:to-[#6C3041] text-white text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(164,85,107,0.35)] hover:shadow-[0_8px_25px_rgba(164,85,107,0.5)] active:scale-98 transition-all duration-200 disabled:opacity-60"
                >
                  <Sparkles
                    className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
                    aria-hidden="true"
                  />
                  <span>
                    {isLoading
                      ? language === 'id'
                        ? 'Menjalankan Model AI...'
                        : 'Running AI Models...'
                      : language === 'id'
                      ? 'Mulai Analisis Kulit'
                      : 'Analyze Skin'}
                  </span>
                </button>
              </div>
            )}

            {/* Error Notice */}
            {error && (
              <div className="p-3 rounded-xl bg-[#D58B9B]/15 border border-[#D58B9B]/40 text-xs text-[#8A374A] flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#8A374A]" />
                <p className="leading-snug">{error}</p>
              </div>
            )}

            {/* Photo Guidelines */}
            <div className="pt-4 border-t border-[#F3E3E7] space-y-2 text-xs text-[#64424D]">
              <div className="flex items-center space-x-1.5 font-bold text-[#64424D]/90">
                <Info className="w-4 h-4 text-[#A4556B]" aria-hidden="true" />
                <span>
                  {language === 'id' ? 'Tips untuk hasil optimal:' : 'Tips for better results:'}
                </span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[#64424D]/75 pl-5 list-disc leading-relaxed">
                <li>
                  {language === 'id'
                    ? 'Gunakan foto yang jelas dan pencahayaan terang merata.'
                    : 'Use a clear and well-lit photo.'}
                </li>
                <li>
                  {language === 'id' ? 'Hadap lurus ke arah kamera.' : 'Face the camera directly.'}
                </li>
                <li>
                  {language === 'id' ? 'Hindari filter kamera atau riasan tebal.' : 'Avoid filters or heavy makeup.'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* COLUMN 2: FACIAL IMAGE VIEW (Center - 4 cols) */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          <div className="rounded-3xl bg-[#FCF8F6] border border-[#F3E3E7] shadow-soft p-4 sm:p-5 overflow-hidden flex flex-col items-center justify-center relative min-h-[420px]">
            {previewUrl ? (
              <div className="relative w-full aspect-[3/4] max-h-[560px] rounded-2xl overflow-hidden bg-black/5 shadow-inner flex items-center justify-center group">
                {/* Unified Canvas: Base Photo + YOLOv8 Bounding Boxes */}
                <UnifiedDetectionCanvas
                  imageUrl={previewUrl}
                  boxes={boxes}
                  isScanning={isLoading}
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Biometric Framing Brackets */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#A4556B]/70 rounded-tl-md pointer-events-none" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#A4556B]/70 rounded-tr-md pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#A4556B]/70 rounded-bl-md pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#A4556B]/70 rounded-br-md pointer-events-none" />

                {/* Status Pill on Top */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold flex items-center space-x-1.5 shadow-sm z-30">
                  <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-400 animate-ping' : 'bg-[#A9B8A2] animate-pulse'}`} />
                  <span>
                    {isLoading
                      ? language === 'id'
                        ? 'Memindai Backend AI...'
                        : 'Scanning AI Backend...'
                      : boxes.length > 0
                      ? language === 'id'
                        ? `${boxes.length} Zona Terdeteksi`
                        : `${boxes.length} Zones Detected`
                      : language === 'id'
                      ? 'Foto Terverifikasi'
                      : 'Photo Ready'}
                  </span>
                </div>
              </div>
            ) : (
              /* Placeholder Guide when no image is uploaded */
              <div className="w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-[#E2C3CB] bg-white flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#F3E3E7] flex items-center justify-center text-[#A4556B] shadow-inner">
                  <div className="relative w-12 h-12">
                    <Image
                      src="/assets/SkinlyAI_Icon_Face.png"
                      alt="Face guide"
                      fill
                      sizes="48px"
                      className="object-contain opacity-75"
                    />
                  </div>
                </div>
                <div className="space-y-1 max-w-[220px]">
                  <p className="text-xs font-bold text-[#64424D]">
                    {language === 'id' ? 'Pratinjau Visual Wajah' : 'Face Visual Preview'}
                  </p>
                  <p className="text-[11px] text-[#64424D]/60 leading-relaxed">
                    {language === 'id'
                      ? 'Unggah foto atau gunakan kamera untuk analisis gabungan klasifikasi tipe kulit dan deteksi zona wajah.'
                      : 'Upload photo or open camera for integrated skin type classification and facial zone detection.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 3: UNIFIED ANALYSIS RESULT DASHBOARD (Right - 4 cols) */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          {classificationResult ? (
            <UnifiedAnalysisResult
              classification={classificationResult}
              boxes={boxes}
              isModelConnected={isModelConnected}
              statusMessage={detectionStatusMessage}
              onReset={handleClear}
            />
          ) : (
            /* Empty State Waiting for Analysis */
            <div className="rounded-3xl bg-white border border-[#F3E3E7] p-6 shadow-soft space-y-5">
              <div className="flex items-center space-x-2 text-base font-extrabold text-[#64424D]">
                <BarChart3 className="w-5 h-5 text-[#A4556B]" aria-hidden="true" />
                <span>{language === 'id' ? 'Hasil Analisis' : 'Analysis Result'}</span>
              </div>

              <p className="text-xs text-[#64424D]/75 leading-relaxed">
                {language === 'id'
                  ? 'Unggah foto wajah atau ambil foto dengan kamera untuk menjalankan model AI gabungan pada FastAPI Backend.'
                  : 'Upload a facial photo or capture with your camera to run the unified AI models on the FastAPI Backend.'}
              </p>

              {/* Model Specs Card */}
              <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] space-y-2 text-xs">
                <span className="font-bold text-[#64424D] block flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#A4556B]" />
                  <span>{language === 'id' ? 'Arsitektur Unified AI Model' : 'Unified AI Model Specs'}</span>
                </span>
                <div className="space-y-1.5 text-[11px] text-[#64424D]/80">
                  <div className="flex justify-between py-0.5 border-b border-[#F3E3E7]">
                    <span className="font-medium">Classification:</span>
                    <span className="font-mono font-bold text-[#A4556B]">skin_model.h5 (Keras)</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-[#F3E3E7]">
                    <span className="font-medium">Detection:</span>
                    <span className="font-mono font-bold text-[#38BDF8]">best.pt (YOLOv8n)</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-[#F3E3E7]">
                    <span className="font-medium">Skin Classes:</span>
                    <span className="font-mono font-semibold">Dry, Oily, Normal, Combo</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-[#F3E3E7]">
                    <span className="font-medium">Detection Classes:</span>
                    <span className="font-mono font-semibold">dry_region, oily_region</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="font-medium">Backend:</span>
                    <span className="font-mono font-bold text-[#A9B8A2]">FastAPI /api/v1/analyze</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCaptureConfirm={handleCameraCapture}
      />
    </div>
  );
}
