'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Camera,
  RotateCcw,
  Check,
  X,
  SwitchCamera,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaptureConfirm: (file: File, previewUrl: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onCaptureConfirm,
}) => {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [capturedDataUrl, setCapturedDataUrl] = useState<string | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  // Stop active stream
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Initialize camera
  const startCamera = useCallback(async () => {
    stopStream();
    setErrorMessage(null);
    setCapturedDataUrl(null);
    setCapturedBlob(null);
    setIsInitializing(true);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMessage(
        language === 'id'
          ? 'Peramban Anda tidak mendukung akses kamera atau berjalan di lingkungan tidak aman (butuh HTTPS/localhost).'
          : 'Your browser does not support camera access or is running in an insecure context (requires HTTPS/localhost).'
      );
      setIsInitializing(false);
      return;
    }

    try {
      // Check multiple cameras
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter((d) => d.kind === 'videoinput');
      setHasMultipleCameras(videoInputs.length > 1);

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
          setIsInitializing(false);
        };
      } else {
        setIsInitializing(false);
      }
    } catch (err: unknown) {
      setIsInitializing(false);
      const error = err as Error;
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setErrorMessage(
          language === 'id'
            ? 'Izin kamera ditolak. Silakan berikan izin akses kamera pada setelan peramban Anda.'
            : 'Camera permission denied. Please allow camera access in your browser settings.'
        );
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setErrorMessage(
          language === 'id'
            ? 'Kamera tidak ditemukan pada perangkat Anda.'
            : 'No camera device found on your device.'
        );
      } else {
        setErrorMessage(
          language === 'id'
            ? `Tidak dapat mengakses kamera: ${error.message}`
            : `Unable to access camera: ${error.message}`
        );
      }
    }
  }, [facingMode, language, stopStream]);

  // Start camera when modal opens, stop when closed
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopStream();
      setCapturedDataUrl(null);
      setCapturedBlob(null);
      setErrorMessage(null);
    }

    return () => {
      stopStream();
    };
  }, [isOpen, startCamera, stopStream]);

  // Switch between front and rear cameras
  const handleSwitchCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // Capture current frame to canvas
  const handleCapture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontally if front-facing camera
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedDataUrl(dataUrl);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          setCapturedBlob(blob);
        }
      },
      'image/jpeg',
      0.95
    );
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedDataUrl(null);
    setCapturedBlob(null);
  };

  // Confirm photo and return File object
  const handleConfirm = () => {
    if (!capturedBlob || !capturedDataUrl) return;

    const file = new File([capturedBlob], `skinly-camera-${Date.now()}.jpg`, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });

    stopStream();
    onCaptureConfirm(file, capturedDataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Camera Capture Modal"
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-[#F3E3E7] shadow-[0_20px_48px_-8px_rgba(100,66,77,0.18)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#F3E3E7] flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2 text-sm font-bold text-[#64424D]">
            <Camera className="w-4 h-4 text-[#A4556B]" aria-hidden="true" />
            <span>{language === 'id' ? 'Ambil Foto Wajah' : 'Capture Face Photo'}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-xl text-[#64424D]/60 hover:text-[#A4556B] hover:bg-[#F3E3E7]/40 transition-colors"
            aria-label="Close camera"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport / Preview Area */}
        <div className="relative aspect-[4/3] w-full bg-black overflow-hidden flex items-center justify-center">
          {errorMessage ? (
            <div className="p-6 text-center space-y-3 max-w-sm">
              <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
              <p className="text-xs text-white/90 leading-relaxed">{errorMessage}</p>
              <button
                type="button"
                onClick={startCamera}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white text-[#64424D] text-xs font-bold shadow-soft hover:bg-[#F3E3E7] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'id' ? 'Coba Lagi' : 'Try Again'}</span>
              </button>
            </div>
          ) : capturedDataUrl ? (
            /* Captured Snapshot Preview */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={capturedDataUrl}
              alt="Captured preview"
              className="w-full h-full object-cover"
            />
          ) : (
            /* Live Stream Video */
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${
                  facingMode === 'user' ? 'scale-x-[-1]' : ''
                }`}
              />

              {/* Face Guide Oval Overlay */}
              <div
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-52 sm:w-64 h-68 sm:h-80 rounded-[50%] border-2 border-dashed border-white/60 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)] flex items-center justify-center">
                  <div className="text-[11px] text-white/90 font-medium px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm -mt-40">
                    {language === 'id'
                      ? 'Posisikan wajah Anda di tengah'
                      : 'Position face in center'}
                  </div>
                </div>
              </div>

              {isInitializing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs text-white">
                  <span>{language === 'id' ? 'Memuat kamera...' : 'Loading camera...'}</span>
                </div>
              )}
            </>
          )}

          {/* Switch camera button (if multiple cameras exist and not yet captured) */}
          {hasMultipleCameras && !capturedDataUrl && !errorMessage && (
            <button
              type="button"
              onClick={handleSwitchCamera}
              className="absolute top-3 right-3 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all"
              aria-label="Switch camera"
            >
              <SwitchCamera className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#F3E3E7] flex items-center justify-between">
          <p className="text-[11px] text-[#64424D]/70 max-w-[200px] sm:max-w-xs leading-tight">
            {language === 'id'
              ? 'Pastikan pencahayaan cukup dan wajah terlihat jelas tanpa makeup.'
              : 'Ensure bright even lighting with face clearly visible.'}
          </p>

          <div className="flex items-center space-x-2">
            {capturedDataUrl ? (
              <>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#F3E3E7] text-xs font-semibold text-[#64424D] hover:bg-[#F3E3E7] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'id' ? 'Ulangi' : 'Retake'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#A4556B] hover:bg-[#8F475B] text-xs font-semibold text-white shadow-soft active:scale-98 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>{language === 'id' ? 'Gunakan Foto Ini' : 'Confirm Photo'}</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleCapture}
                disabled={isInitializing || Boolean(errorMessage)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#A4556B] hover:bg-[#8F475B] text-xs font-semibold text-white shadow-soft active:scale-98 disabled:opacity-50 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === 'id' ? 'Ambil Foto' : 'Capture Photo'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
