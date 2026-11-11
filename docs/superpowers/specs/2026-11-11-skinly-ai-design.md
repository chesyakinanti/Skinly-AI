# Design Document: Skinly AI Web Application

**Date**: 2026-11-11  
**Project**: Skinly AI  
**Author**: Antigravity & Chesy  
**Status**: Pending Review  

---

## 1. Intent & Purpose

Skinly AI adalah platform analisis kulit wajah berbasis kecerdasan buatan (AI) dan edukasi perawatan kulit (skincare) berbasis bukti ilmiah (*evidence-based skincare education*). Platform ini dirancang untuk membantu pengguna memahami karakteristik kulit mereka (Normal, Kering, Berminyak, Kombinasi) serta area kulit tertentu secara objektif, aman, dan tanpa bias komersial.

Aplikasi ini mengusung identitas visual **minimalist feminine, modern, elegant beauty-tech** dengan palet warna soft blush yang tenang, tipografi yang anggun dan mudah dibaca, serta tata letak yang lapang (*generous whitespace*).

---

## 2. Goals, Non-Goals, & Anti-Goals

### 2.1 Goals
- Membangun aplikasi web produksi yang responsif untuk 6 rute utama:
  1. **Landing Page (`/`)**: Hero visual dengan logo Skinly AI, pengenalan platform, alur kerja ("How It Works"), kartu kapabilitas utama, dan footer informatif.
  2. **Skin Analysis (`/skin-analysis`)**: Komponen upload foto wajah (drag-and-drop & file picker), preview foto, tombol analisis, status loading, dan visualisasi hasil klasifikasi 4 kelas (Normal, Kering, Berminyak, Kombinasi) dengan penjelasan edukatif.
  3. **Skin Region Detection (`/skin-detection`)**: Komponen upload foto wajah, canvas visualisasi bounding box (`oily_region`, `dry_region`), ringkasan deteksi, serta indikator status integrasi backend Roboflow/YOLO yang transparan.
  4. **AI Skin Assistant (`/assistant`)**: Antarmuka chat interaktif dengan bubble pesan, input teks, rekomendasi pertanyaan (suggested questions), indikator loading, dan sitasi sumber pengetahuan terpercaya.
  5. **Skincare Knowledge (`/knowledge`)**: Direktori bahan aktif skincare yang dapat dicari (search bar), berisi kartu bahan aktif, fungsi, kecocokan tipe kulit, cara penggunaan umum, dan referensi ilmiah.
  6. **Analysis History (`/history`)**: Tabel/kartu riwayat analisis dengan tanggal, waktu, thumbnail foto, hasil tipe kulit, status deteksi, opsi lihat detail, dan aksi hapus riwayat (disimpan aman di `localStorage`).
- Menggunakan aset merek asli yang telah tersedia di `assets/` tanpa modifikasi bentuk atau proporsi:
  - `SkinlyAI_Primary_Horizontal.png`
  - `SkinlyAI_Logo_Vertical.png`
  - `SkinlyAI_App_Icon.png`
  - `SkinlyAI_Icon_Face.png`
- Mengimplementasikan palet warna dan tipografi persis sesuai pedoman brand:
  - Background: Warm Cream (`#FCF8F6`)
  - Permukaan Konten/Kartu: White (`#FFFFFF`) & Soft Blush (`#F3E3E7`)
  - Aksen Utama/Tombol/CTA: Rose Pink (`#A4556B`)
  - Heading & Teks Utama: Deep Mauve (`#64424D`)
  - Aksen Status/Normal: Sage Green (`#A9B8A2`)
  - Warna Kategori: Normal (`#A9B8A2`), Dry (`#A9BDCC`), Oily (`#D58B9B`), Combination (`#B7A7C9`), Warning (`#E8B77D`)
  - Font: Plus Jakarta Sans (heading), Inter (body)
- Aksesibilitas WCAG AA (rasio kontras teks >= 4.5:1, target sentuh >= 44x44px, navigasi keyboard penuh, visible focus ring).
- Kesiapan integrasi AI modular melalui service independen (`skinClassificationService`, `skinDetectionService`, `ragAssistantService`).

### 2.2 Non-Goals
- Bukan alat diagnosis medis: Tidak membuat diagnosis klinis dermatologis atau resep obat keras.
- Bukan media promosi produk: Tidak mempromosikan atau merekomendasikan merek/brand skincare komersial tertentu.
- Tidak membuat backend eksternal langsung saat ini: Endpoint API dihubungkan melalui variabel lingkungan (`.env.local`) dengan penanganan status offline/unavailable yang jujur.

### 2.3 Anti-Goals (Hal yang Dilarang)
- Dilarang membuat prediksi fiktif atau bounding box rekaan (*fake simulated AI results*).
- Dilarang menggunakan teks template robotik (*AI slop* seperti "delve", "testament", "tapestry", "seamless", "supercharge", "revolutionary").
- Dilarang menggunakan ilustrasi kekanak-kanakan, gradasi berlebihan yang menusuk mata, warna pink neon terlalu pekat, atau animasi berlebihan yang mengganggu kenyamanan membaca.
- Dilarang ada tombol/link mati (*dead controls*) atau navbar yang mengarah ke halaman yang belum ada.

---

## 3. Evaluasi Pendekatan Arsitektur

### Pendekatan yang Dipertimbangkan:
1. **Pendekatan A: Next.js (App Router) + TypeScript + Tailwind CSS (DIPILIH)**
   - Standar industri modern dengan TypeScript strict mode.
   - Server & Client Component boundaries yang jelas.
   - Memiliki App Router (`app/` directory) dengan layout terpadu dan performa optimal.
   - Memiliki API Route internal (`app/api/...`) yang siap menjadi jembatan proxy aman ke backend YOLO dan RAG di masa mendatang.
2. **Pendekatan B: Vite + React SPA + TypeScript (Ditolak)**
   - Tidak memiliki backend proxy bawaan untuk menyimpan secret key model RAG/YOLO di masa mendatang.
3. **Pendekatan C: Nuxt/Vue (Ditolak)**
   - Tidak sesuai dengan spesifikasi ekosistem React/Next.js dan `lucide-react`.

---

## 4. Struktur Folder & Komponen

```text
Skinly AI/
├── assets/                               # Aset logo dan ikon asli
│   ├── SkinlyAI_App_Icon.png
│   ├── SkinlyAI_Icon_Face.png
│   ├── SkinlyAI_Logo_Vertical.png
│   └── SkinlyAI_Primary_Horizontal.png
├── public/                               # Salinan statis aset untuk Next.js
│   └── assets/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (Plus Jakarta Sans & Inter font, Navbar, Footer)
│   │   ├── page.tsx                      # Landing Page (/)
│   │   ├── skin-analysis/
│   │   │   └── page.tsx                  # Skin Analysis Page (/skin-analysis)
│   │   ├── skin-detection/
│   │   │   └── page.tsx                  # Skin Region Detection Page (/skin-detection)
│   │   ├── assistant/
│   │   │   └── page.tsx                  # AI Skin Assistant Page (/assistant)
│   │   ├── knowledge/
│   │   │   └── page.tsx                  # Skincare Knowledge Page (/knowledge)
│   │   ├── history/
│   │   │   └── page.tsx                  # Analysis History Page (/history)
│   │   └── globals.css                   # Tailwind directivess, brand tokens, typography
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx                # Desktop top navigation & mobile drawer
│   │   │   ├── Footer.tsx                # Brand footer with disclaimer & links
│   │   │   ├── Button.tsx                # Accessible styled button
│   │   │   ├── Card.tsx                  # Rounded container with subtle shadow
│   │   │   ├── LoadingState.tsx          # Educational loading spinner & progress
│   │   │   ├── EmptyState.tsx            # Clean empty placeholder
│   │   │   └── ErrorState.tsx            # Accessible error message with retry
│   │   ├── analysis/
│   │   │   ├── ImageUploader.tsx         # Drag-and-drop & file picker with preview
│   │   │   ├── AnalysisResult.tsx        # Classification breakdown (4 classes)
│   │   │   ├── SkinTypeBadge.tsx         # Badges for Normal, Dry, Oily, Combination
│   │   │   └── ConfidenceBar.tsx         # Visual percentage bar
│   │   ├── detection/
│   │   │   └── DetectionCanvas.tsx       # Canvas for image preview & bounding box
│   │   ├── assistant/
│   │   │   ├── ChatMessage.tsx           # User & AI bubbles with citations
│   │   │   └── ChatInput.tsx             # Text area + submit + suggested chips
│   │   ├── knowledge/
│   │   │   └── IngredientCard.tsx        # Ingredient summary, functions, & compatibility
│   │   └── history/
│   │       └── HistoryCard.tsx           # History item card with thumbnail & actions
│   ├── services/
│   │   ├── skinClassificationService.ts  # Teachable Machine TF.js integration layer
│   │   ├── skinDetectionService.ts       # YOLO / Roboflow backend integration layer
│   │   ├── ragAssistantService.ts        # RAG AI knowledge retrieval & local QA fallback
│   │   └── historyStorageService.ts      # LocalStorage persistence for user scan history
│   ├── data/
│   │   ├── knowledgeData.ts              # Verified evidence-based skincare ingredients database
│   │   └── skinTypesInfo.ts              # Dermatological educational characteristics per skin type
│   └── types/
│       └── index.ts                      # Shared TypeScript interfaces
├── tailwind.config.ts                    # Brand color tokens & font family setup
├── tsconfig.json
├── package.json
└── README.md
```

---

## 5. Rincian Modul AI & Service Layer

1. **`skinClassificationService.ts`**:
   - Mendukung input file gambar wajah (`File` atau `Blob`).
   - Disiapkan untuk membaca model Google Teachable Machine via URL environment variable `NEXT_PUBLIC_TEACHABLE_MACHINE_URL`.
   - Mengembalikan 4 kategori: `Normal`, `Dry`, `Oily`, `Combination` lengkap dengan skor kepercayaan (*confidence score* asli dari TF.js).
   - **Status Model**: Jika `NEXT_PUBLIC_TEACHABLE_MACHINE_URL` belum diisi, antarmuka menampilkan status transparan: *"Model Teachable Machine belum dihubungkan"*, disertai panduan konfigurasi URL model di `.env.local` dan opsi *Demo UI Fixture* yang secara eksplisit berlabel "Mode Pratinjau Desain (Bukan Hasil Diagnosis Real)" agar reviewer/developer dapat memverifikasi komponen `AnalysisResult` dan `ConfidenceBar`.
2. **`skinDetectionService.ts`**:
   - Memproses deteksi area `oily_region` dan `dry_region`.
   - Menggunakan kontrak standar Roboflow Inference API (`predictions: [{ x, y, width, height, confidence, class }]`), mendukung koordinat relatif (0–1) maupun absolut.
   - Jika endpoint kosong / belum terhubung, menampilkan banner status: *"Layanan deteksi area YOLO sedang dalam tahap pelatihan model dan belum terhubung ke backend."* (Tanpa membuat prediksi palsu).
3. **`ragAssistantService.ts`**:
   - Mendukung integrasi RAG backend via `NEXT_PUBLIC_RAG_API_URL`.
   - Ketika backend belum terhubung, memanfaatkan basis pengetahuan lokal berstandar ilmiah (`knowledgeData.ts` dan `skinTypesInfo.ts`) untuk menjawab pertanyaan umum seputar bahan aktif (Niacinamide, Hyaluronic Acid, Salicylic Acid, AHA/BHA, Retinol, Ceramide) dan panduan tipe kulit (seperti cara merawat kulit kering/berminyak) lengkap dengan sitasi ilmiah terpercaya. Untuk pertanyaan di luar cakupan, asisten secara jujur menyatakan informasi belum tersedia.
4. **`historyStorageService.ts`**:
   - Menyimpan hasil analisis pengguna ke dalam `localStorage` browser secara aman.
   - Mendukung entri klasifikasi tipe kulit, deteksi area, maupun kombinasi keduanya (field opsional dan fleksibel).
   - Ketika kosong, menampilkan `EmptyState` yang bersih dengan tombol ajakan "Mulai Analisis Pertama".

---

## 6. Keputusan Builder (Builder's Calls)

- **Teachable Machine Client Loading**: Menggunakan pemanggilan dinamis TensorFlow.js / Teachable Machine library agar tidak membebani ukuran bundle awal landing page.
- **YOLO Bounding Box Rendering**: Canvas secara otomatis menyesuaikan aspek rasio gambar asli dan merender bounding box warna Rose `#D58B9B` untuk `oily_region` dan Soft Blue `#A9BDCC` untuk `dry_region` lengkap dengan label dan confidence tag.
- **Responsivitas**: Desain mobile-first dengan breakpoint 375px, 768px, 1024px, dan 1440px tanpa horizontal scrollbar. Target sentuh semua kontrol interaktif minimal 44x44px.


---

## 6. Review Antislop & UI/UX Standards

- **Copywriting**: Menghindari kata-kata hiperbolis (*"revolusioner"*, *"mutakhir"*, *"keajaiban AI"*). Menggunakan bahasa Indonesia yang santun, profesional, dan berorientasi edukasi.
- **Transparansi**: Di setiap halaman analisis dan chat disertakan catatan kaki/disclaimer: *"Skinly AI adalah platform edukasi perawatan kulit berbasis kecerdasan buatan, bukan alat diagnosis medis. Untuk keluhan kulit klinis, konsultasikan dengan dokter spesialis dermatologi."*
- **Aksesibilitas**:
  - Semua tombol memiliki label teks atau `aria-label`.
  - Kontras teks Deep Mauve (`#64424D`) terhadap Warm Cream (`#FCF8F6`) bernilai > 10:1 (melebihi standar WCAG AA 4.5:1).
  - Kontras teks putih di atas tombol Rose Pink (`#A4556B`) bernilai > 5:1.
  - Target sentuh navigasi dan tombol minimum 44x44px.
  - Bebas dari horizontal scrollbar yang tidak diinginkan pada viewport mobile (375px hingga desktop).

---

## 7. Verifikasi dan Pengujian

- Build test: `npm run build` berhasil tanpa error TypeScript atau Tailwind.
- Navigasi test: Semua tautan navigasi berfungsi aktif dan menuju rute yang benar.
- Interaktivitas: Upload gambar, drag-and-drop, validasi tipe file (hanya image JPEG/PNG/WebP), chat dialog, pencarian bahan aktif, dan penyimpanan riwayat lokal berfungsi tanpa runtime crash.
