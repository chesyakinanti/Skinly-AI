# Preview Action Controls & Re-Analysis Button Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provide clear, dedicated action buttons (Analisis Ulang / Re-analyze, Ganti Foto / Change Photo, Kamera / Camera, Hapus Foto / Remove Photo) directly beneath the face image preview on the Skin Analysis page, with prominent button styling and responsive ergonomics.

**Architecture:** Enhance `src/app/skin-analysis/page.tsx` with a contextual action bar positioned directly under the face preview in Column 2, connecting existing upload, camera modal, clear, and analyze handlers. Refine `src/components/analysis/UnifiedAnalysisResult.tsx` header action styling, and add any missing localization keys in `src/context/LanguageContext.tsx`.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide React (`RotateCcw`, `Camera`, `Upload`, `Trash2`, `Sparkles`).

**Spec:** User request:
- Make the "Analisis Ulang" button clearly visible under the preview and styled visibly as a real button.
- Provide options to change photo (ganti foto) or remove/delete (hapus) after uploading or capturing a photo if the user decides not to use it.

## Global Constraints
- Brand Colors: Rose `#A4556B`, Hover `#8F475B`, Blush `#F3E3E7`, Cream `#FCF8F6`, Mauve `#64424D`, Sage `#A9B8A2`
- Touch targets: Minimum 44x44px for primary interactions
- Contrast: WCAG AA compliant (>= 4.5:1)
- Antislop mode: `during` (no empty decorative trends, intentional craft, semantic buttons)
- Internationalization: Support Indonesian (`id`) and English (`en`) seamlessly

## Review Focus
1. When a photo is uploaded or captured, action buttons must appear immediately below the preview in Column 2.
2. Clicking "Ganti Foto" opens the file chooser so the user can easily select a different photo.
3. Clicking "Kamera" opens the Camera Modal to retake a photo with the device camera.
4. Clicking "Hapus Foto" resets the preview image, file input, and any existing analysis results back to the clean empty state.
5. When analysis has completed, the "Analisis Ulang" button under the preview is styled as a prominent primary button with an icon and clear hover/active states.
6. The layout remains fully responsive without clipping or horizontal overflow on screen sizes from 375px up to desktop.

---

### Task 1: Add Localized Strings for Photo Action Controls

**Files:**
- Modify: `src/context/LanguageContext.tsx`

- [ ] **Step 1: Check existing keys in `LanguageContext.tsx`**
Ensure `changePhoto`, `deletePhoto`, `reanalyze`, `openCamera` exist in both `id` and `en` dictionaries.

- [ ] **Step 2: Add or normalize missing translation keys**
Add `deletePhoto: 'Hapus Foto'` / `deletePhoto: 'Remove Photo'`, `reanalyzeBtn: 'Analisis Ulang'` / `reanalyzeBtn: 'Re-analyze Photo'`, and `reanalyzingBtn: 'Menganalisis Ulang...'` / `reanalyzingBtn: 'Re-analyzing...'` if not already present.

- [ ] **Step 3: Run TypeScript check**
Verify TypeScript types compile with no missing properties.

---

### Task 2: Build Contextual Action Bar Below Preview in `SkinAnalysisPage`

**Files:**
- Modify: `src/app/skin-analysis/page.tsx`

**Interfaces:**
- Consumes: `selectedFile`, `previewUrl`, `isLoading`, `classificationResult`, `handleAnalyze`, `handleClear`, `setIsCameraOpen`, `fileInputRef`
- Produces: Action bar under `UnifiedDetectionCanvas` in Column 2

- [ ] **Step 1: Add Lucide icon imports**
Import `RotateCcw`, `Trash2`, `RefreshCw` if not already imported in `src/app/skin-analysis/page.tsx`.

- [ ] **Step 2: Add action controls container directly under the preview card**
In Column 2 (`lg:col-span-4 xl:col-span-4`), directly underneath the preview canvas when `previewUrl` is present:
- If analysis result is not yet available (`!classificationResult`):
  - Primary button: "Mulai Analisis Kulit" (with `Sparkles` icon)
  - Secondary button group: "Ganti Foto" (`Upload` icon), "Kamera" (`Camera` icon), "Hapus" (`Trash2` icon with danger tone)
- If analysis result is available (`classificationResult !== null`):
  - Primary button: "Analisis Ulang" (with `RotateCcw` icon, full-width prominent button, `isLoading` spin support)
  - Secondary button group: "Ganti Foto", "Kamera", "Hapus"

- [ ] **Step 3: Ensure touch targets & responsive styling**
Each button must have `min-h-[44px]` (or `py-2.5 px-3.5`), clear focus rings, and proper keyboard navigation.

---

### Task 3: Refine `UnifiedAnalysisResult` Header Button

**Files:**
- Modify: `src/components/analysis/UnifiedAnalysisResult.tsx`

- [ ] **Step 1: Upgrade header action in `UnifiedAnalysisResult.tsx`**
Style the top-right button into an explicit pill button with border, background, and hover states, labeled "Foto Baru" / "New Photo" or "Reset" to distinguish it clearly from the prominent "Analisis Ulang" button under the preview.

---

### Task 4: Verification and Quality Checks

**Files:**
- Test/Verification via commands: `npm run build` or Next.js compile check

- [ ] **Step 1: Run typecheck and build**
Run: `npm run build`
Expected: Compile success with no lint or type errors.

- [ ] **Step 2: Verify interactive behavior**
Confirm all 4 actions (Mulai Analisis, Analisis Ulang, Ganti Foto, Kamera, Hapus) trigger their expected callbacks without console errors.
