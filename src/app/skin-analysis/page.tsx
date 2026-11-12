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
  RotateCcw,
  RefreshCw,
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

  // Reset photo & start fresh
  const handleResetPhoto = () => {
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
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn py-2 sm:py-4">
      {/* Header */}
      <div className="space-y-1.5 text-left">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#F3E3E7] border border-[#F3E3E7] text-xs font-bold text-[#A4556B] tracking-wide">
          <Cpu className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
          <span>Unified AI Backend: MobileNetV2 + YOLOv8</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#64424D] tracking-tight">
          Skin Analysis
        </h1>
        <p className="text-xs sm:text-sm text-[#64424D]/75 max-w-2xl leading-relaxed">
          {language === 'id'
            ? 'Analisis tipe kulit wajah Anda dan deteksi zona area kering & berminyak dalam satu pemindaian terpadu melalui FastAPI AI backend.'
            : 'Analyze your skin type and detect dry & oily areas from your face in one unified scan via FastAPI AI backend.'}
        </p>
      </div>

      {/* 3-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* COLUMN 1: UPLOAD & CAMERA CONTROLS (Left - 4 cols) */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          <div className="rounded-2xl bg-white border border-[#F3E3E7] p-4 sm:p-5 shadow-[0_4px_20px_-2px_rgba(100,66,77,0.05)] space-y-4">
            <h2 className="text-sm font-bold text-[#64424D]">
              {language === 'id' ? 'Input Foto Wajah' : 'Analyze Your Skin'}
            </h2>

            {/* Dashed Upload Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="rounded-2xl border border-dashed border-[#F3E3E7] hover:border-[#A4556B] bg-[#FCF8F6] hover:bg-[#F3E3E7]/40 p-5 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center space-y-2.5 group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
              }}
              aria-label="Upload face photo"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-[#F3E3E7] flex items-center justify-center text-[#A4556B] shadow-xs group-hover:scale-105 transition-all">
                <Upload className="w-4 h-4 stroke-[2]" aria-hidden="true" />
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-bold text-[#64424D]">
                  {language === 'id' ? 'Unggah Foto Wajah' : 'Upload a face photo'}
                </p>
                <p className="text-[11px] text-[#64424D]/70 font-normal">
                  JPG, PNG, or WEBP (max 10 MB)
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center space-x-1 px-4 py-1.5 rounded-full bg-[#A4556B] hover:bg-[#8F475B] text-white text-xs font-semibold shadow-soft hover:shadow-glow transition-all"
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
              className="w-full inline-flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-[#FCF8F6] hover:bg-[#F3E3E7] border border-[#F3E3E7] text-xs font-semibold text-[#64424D] hover:text-[#A4556B] transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
              <span>{language === 'id' ? 'Gunakan Kamera Perangkat' : 'Open Camera'}</span>
            </button>

            {/* Selected File Status & Analyze Button */}
            {selectedFile && (
              <div className="space-y-2.5 pt-2 border-t border-[#F3E3E7]">
                <div className="p-2.5 rounded-xl bg-[#FCF8F6] border border-[#F3E3E7] flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-2 truncate">
                    <FileCheck className="w-3.5 h-3.5 text-[#A9B8A2] shrink-0" />
                    <span className="truncate font-semibold text-[#64424D]">
                      {selectedFile.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetPhoto}
                    className="p-1 rounded-md text-[#64424D]/60 hover:text-rose-600 hover:bg-white transition-colors shrink-0"
                    aria-label="Remove photo"
                    title="Hapus foto"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#A4556B] hover:bg-[#8F475B] active:bg-[#7A3A4D] text-white text-xs sm:text-sm font-bold shadow-soft hover:shadow-glow transition-all disabled:opacity-60"
                >
                  <Sparkles
                    className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`}
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
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <p className="leading-snug">{error}</p>
              </div>
            )}

            {/* Photo Guidelines */}
            <div className="pt-3 border-t border-[#F3E3E7] space-y-1.5 text-xs text-[#64424D]">
              <div className="flex items-center space-x-1.5 font-bold text-[#64424D]">
                <Info className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
                <span>
                  {language === 'id' ? 'Tips untuk hasil optimal:' : 'Tips for better results:'}
                </span>
              </div>
              <ul className="space-y-1 text-[11px] text-[#64424D]/75 pl-4 list-disc leading-relaxed">
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
          <div className="rounded-2xl bg-white border border-[#F3E3E7] shadow-[0_4px_20px_-2px_rgba(100,66,77,0.05)] p-4 sm:p-5 overflow-hidden flex flex-col items-center justify-center relative min-h-[400px]">
            {previewUrl ? (
              <div className="w-full space-y-3.5">
                <div className="relative w-full aspect-[3/4] max-h-[460px] rounded-xl overflow-hidden bg-[#FCF8F6] border border-[#F3E3E7] shadow-inner flex items-center justify-center group">
                  {/* Unified Canvas: Base Photo + YOLOv8 Bounding Boxes */}
                  <UnifiedDetectionCanvas
                    imageUrl={previewUrl}
                    boxes={boxes}
                    isScanning={isLoading}
                    className="w-full h-full object-cover rounded-xl"
                  />

                  {/* Subtle Biometric Framing Brackets */}
                  <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#A4556B]/70 rounded-tl-sm pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#A4556B]/70 rounded-tr-sm pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#A4556B]/70 rounded-bl-sm pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#A4556B]/70 rounded-br-sm pointer-events-none" />

                  {/* Status Pill on Top */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#64424D]/85 backdrop-blur-md text-white text-[10px] font-semibold flex items-center space-x-1.5 shadow-xs z-30">
                    <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-400 animate-ping' : 'bg-[#A9B8A2] animate-pulse'}`} />
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
                        ? 'Foto Siap'
                        : 'Photo Ready'}
                    </span>
                  </div>
                </div>

                {/* ACTION CONTROLS DIRECTLY UNDER PREVIEW (Organized & Balanced) */}
                <div className="w-full space-y-2 pt-0.5">
                  {/* 1. Tombol Utama: Analisis Ulang (Full Width) */}
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#A4556B] hover:bg-[#8F475B] active:bg-[#7A3A4D] text-white text-xs sm:text-sm font-bold shadow-soft hover:shadow-glow transition-all disabled:opacity-60 active:scale-98"
                    aria-label="Analisis Ulang Foto Wajah"
                  >
                    <RotateCcw
                      className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`}
                      aria-hidden="true"
                    />
                    <span>
                      {isLoading
                        ? language === 'id'
                          ? 'Menganalisis Ulang...'
                          : 'Re-analyzing...'
                        : language === 'id'
                        ? 'Analisis Ulang'
                        : 'Re-analyze Photo'}
                    </span>
                  </button>

                  {/* 2. Tombol Sekunder: Ganti Foto & Kamera (Grid 2 Kolom Seimbang) */}
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-[#FCF8F6] hover:bg-[#F3E3E7] border border-[#F3E3E7] text-xs font-semibold text-[#64424D] hover:text-[#A4556B] transition-colors"
                      aria-label="Ganti Foto Wajah"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
                      <span>{language === 'id' ? 'Ganti Foto' : 'Change Photo'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCameraOpen(true)}
                      className="inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-[#FCF8F6] hover:bg-[#F3E3E7] border border-[#F3E3E7] text-xs font-semibold text-[#64424D] hover:text-[#A4556B] transition-colors"
                      aria-label="Buka Kamera Perangkat"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
                      <span>{language === 'id' ? 'Kamera' : 'Camera'}</span>
                    </button>
                  </div>

                  {/* 3. Tombol Foto Baru / Reset Foto (Menyatukan Fungsi Foto Baru & Hapus Foto) */}
                  <button
                    type="button"
                    onClick={handleResetPhoto}
                    className="w-full inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-white hover:bg-[#F3E3E7]/40 border border-[#F3E3E7] text-xs font-semibold text-[#64424D] hover:text-[#A4556B] transition-colors"
                    aria-label="Foto Baru / Reset Foto"
                    title="Mulai sesi baru dan bersihkan foto saat ini"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
                    <span>{language === 'id' ? 'Foto Baru / Reset' : 'New Photo / Reset'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Placeholder Guide when no image is uploaded */
              <div className="w-full aspect-[3/4] rounded-2xl border border-dashed border-[#F3E3E7] bg-[#FCF8F6] flex flex-col items-center justify-center text-center p-5 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#F3E3E7] flex items-center justify-center text-[#A4556B] shadow-soft">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/assets/SkinlyAI_Icon_Face.png"
                      alt="Face guide"
                      fill
                      sizes="40px"
                      className="object-contain opacity-75"
                    />
                  </div>
                </div>
                <div className="space-y-1 max-w-[200px]">
                  <p className="text-xs font-bold text-[#64424D]">
                    {language === 'id' ? 'Pratinjau Visual Wajah' : 'Face Visual Preview'}
                  </p>
                  <p className="text-[11px] text-[#64424D]/70 leading-relaxed">
                    {language === 'id'
                      ? 'Unggah foto atau gunakan kamera untuk analisis tipe kulit dan deteksi zona wajah.'
                      : 'Upload photo or open camera for skin type classification and facial zone detection.'}
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
              onReset={handleResetPhoto}
            />
          ) : (
            /* Empty State Waiting for Analysis */
            <div className="rounded-2xl bg-white border border-[#F3E3E7] p-5 sm:p-6 shadow-[0_4px_20px_-2px_rgba(100,66,77,0.05)] space-y-4">
              <div className="flex items-center space-x-2 text-sm font-bold text-[#64424D]">
                <BarChart3 className="w-4 h-4 text-[#A4556B]" aria-hidden="true" />
                <span>{language === 'id' ? 'Hasil Analisis' : 'Analysis Result'}</span>
              </div>

              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] flex items-center justify-center text-[#A4556B] shadow-xs">
                  <Sparkles className="w-5 h-5 text-[#A4556B]" />
                </div>
                <div className="space-y-1 max-w-xs">
                  <p className="text-xs font-bold text-[#64424D]">
                    {language === 'id' ? 'Menunggu Foto Wajah' : 'Waiting for Face Photo'}
                  </p>
                  <p className="text-[11px] text-[#64424D]/70 leading-relaxed">
                    {language === 'id'
                      ? 'Unggah foto atau potret langsung menggunakan kamera, lalu tekan tombol Mulai Analisis Kulit.'
                      : 'Upload or capture a photo, then click Analyze Skin to see results.'}
                  </p>
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
