# Skinly AI — Evidence-Based Skin Analysis & Education Platform

Skinly AI adalah platform web modern untuk analisis karakteristik tipe kulit wajah dan edukasi perawatan kulit (*skincare education*) berbasis bukti ilmiah dermatologi.

Tagline: **Understand Your Skin, Naturally.**

---

## 🌟 Fitur Utama & Struktur Halaman

1. **Landing Page (`/`)**
   - Hero visual dengan logo Skinly AI dan headline *"Your Skin, Understood by AI."*
   - Alur kerja 3 tahapan (Unggah Foto, Analisis Model Terlatih, Edukasi Bahan Aktif).
   - Tiga pilar kapabilitas cerdas: Skin Classification, Skin Region Detection, dan RAG AI Assistant.
   - Komitmen transparansi dan pernyataan tanggung jawab medis (*medical disclaimer*).

2. **Skin Analysis (`/skin-analysis`)**
   - Komponen unggah foto wajah drag-and-drop & kamera dengan pratinjau instan.
   - Analisis klasifikasi 4 kelas tipe kulit: **Normal**, **Dry**, **Oily**, dan **Combination**.
   - Visualisasi tingkat keyakinan (*confidence score*) asli dan rincian probabilitas seluruh kelas.
   - Panduan rutinitas perawatan dan bahan aktif yang disesuaikan secara ilmiah.
   - Fitur simpan langsung ke riwayat analisis (*localStorage*).
   - Penanganan status transparan jika model Google Teachable Machine belum dihubungkan, disertai mode pratinjau antarmuka pengujian (*fixture preview*).

3. **Skin Region Detection (`/skin-detection`)**
   - Pemetaan batas area spesifik wajah: `oily_region` (area berminyak) dan `dry_region` (area kering).
   - Rendering bounding box interaktif di atas HTML5 Canvas yang adaptif terhadap dimensi foto asli.
   - Arsitektur siap integrasi API Roboflow/YOLO dengan banner status transparan selama masa pelatihan model.
   - Opsi visualisasi contoh format bounding box untuk pengujian developer.

4. **AI Skin Assistant (`/assistant`)**
   - Antarmuka percakapan interaktif dengan bubble pesan pengguna dan asisten.
   - Rekomendasi pertanyaan cepat (*suggested questions*).
   - Penjelasan mekanisme biologis bahan aktif dilengkapi rujukan sitasi jurnal ilmiah (*journal citations*).
   - Arsitektur siap integrasi endpoint RAG eksternal dengan fallback basis pengetahuan ilmiah lokal.

5. **Skincare Knowledge (`/knowledge`)**
   - Direktori bahan aktif skincare yang dapat dicari secara *real-time*.
   - Filter berdasarkan kategori (Barrier Repair, Hydration, Exfoliant, Anti-Aging, Soothing) dan kecocokan tipe kulit.
   - Rincian fungsi, cara penggunaan, kombinasi bahan, perhatian khusus, dan rujukan ilmiah resmi (DOI/Journal).
   - Panduan protokol uji tempel (*patch test*).

6. **Analysis History (`/history`)**
   - Daftar riwayat pemindaian tersimpan secara privat di peramban pengguna.
   - Informasi tanggal, waktu, thumbnail foto, tipe kulit terdeteksi, dan persentase keyakinan.
   - Dialog detail interaktif dan opsi penghapusan riwayat (per item atau sekaligus).
   - Tampilan *EmptyState* yang ramah ketika belum ada data.

---

## 🎨 Desain & Identitas Merek

- **Gaya Desain**: Minimalist feminine, modern, elegant beauty-tech, soft blush aesthetic, whitespace lapang, rounded cards, subtle shadows, dan transisi halus.
- **Palet Warna Asli**:
  - Primary Rose: `#A4556B` (Tombol utama, CTA, navigasi aktif)
  - Soft Blush: `#F3E3E7` (Latar kartu dan highlight)
  - Warm Cream: `#FCF8F6` (Latar utama website)
  - Deep Mauve: `#64424D` (Heading dan teks utama)
  - Sage Green: `#A9B8A2` (Status normal dan aksen)
  - White: `#FFFFFF` (Kartu dan permukaan form)
- **Kategori Warna Kulit**:
  - Normal: `#A9B8A2` (Sage)
  - Dry: `#A9BDCC` (Soft Blue)
  - Oily: `#D58B9B` (Rose)
  - Combination: `#B7A7C9` (Lavender)
  - Warning: `#E8B77D` (Soft Orange)
- **Tipografi**:
  - Heading: **Plus Jakarta Sans**
  - Body Text: **Inter**
- **Aset Merek**: Seluruh logo dan ikon asli dari folder `assets/` digunakan tanpa distorsi (`SkinlyAI_Primary_Horizontal.png`, `SkinlyAI_Logo_Vertical.png`, `SkinlyAI_App_Icon.png`, `SkinlyAI_Icon_Face.png`).

---

## 🛠️ Panduan Menjalankan Proyek

### 1. Prasyarat
- Node.js versi 18 atau lebih baru (direkomendasikan Node.js 20+).
- npm atau pnpm.

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Variabel Lingkungan
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Isi variabel sesuai kebutuhan model Anda:
```env
# 1. URL Model Google Teachable Machine (harus diakhiri tanda /)
NEXT_PUBLIC_TEACHABLE_MACHINE_URL="https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/"

# 2. Endpoint Backend Roboflow / YOLO
NEXT_PUBLIC_YOLO_API_URL="https://api.roboflow.com/your-endpoint/predict"

# 3. Endpoint Backend RAG AI Assistant
NEXT_PUBLIC_RAG_API_URL="https://your-backend-api.com/api/rag/assistant"
```

> **Catatan**: Jika variabel lingkungan di atas dibiarkan kosong, aplikasi tetap berjalan normal dengan status transparan: menampilkan banner edukatif bahwa model sedang dalam tahap pelatihan/penghubungan (tanpa menghasilkan prediksi palsu), serta menyediakan mode pratinjau fixture untuk reviewer/developer.

### 4. Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 5. Membangun Versi Produksi (Build)
```bash
npm run build
npm run start
```

---

## 📁 Struktur Direktori

```text
Skinly AI/
├── assets/                               # Aset logo dan ikon asli proyek
├── public/
│   └── assets/                           # Salinan aset untuk serving statis Next.js
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (Navbar, Footer, Fonts)
│   │   ├── page.tsx                      # Landing Page (/)
│   │   ├── globals.css                   # Tailwind styles, font imports & tokens
│   │   ├── skin-analysis/page.tsx        # Analisis Tipe Kulit (/skin-analysis)
│   │   ├── skin-detection/page.tsx       # Deteksi Area YOLO (/skin-detection)
│   │   ├── assistant/page.tsx            # Asisten Tanya Jawab Skincare (/assistant)
│   │   ├── knowledge/page.tsx            # Kamus Bahan Aktif (/knowledge)
│   │   └── history/page.tsx              # Riwayat Analisis Pengguna (/history)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx                # Navigasi responsif desktop & mobile drawer
│   │   │   ├── Footer.tsx                # Footer informatif & medical disclaimer
│   │   │   ├── Button.tsx                # Tombol aksesibel berbagai varian
│   │   │   ├── Card.tsx                  # Rounded container halus
│   │   │   ├── LoadingState.tsx          # Status loading edukatif
│   │   │   ├── EmptyState.tsx            # Placeholder data kosong
│   │   │   └── ErrorState.tsx            # Pesan kendala ramah pengguna
│   │   ├── analysis/
│   │   │   ├── ImageUploader.tsx         # Drag-and-drop, validasi & kamera
│   │   │   ├── AnalysisResult.tsx        # Visualisasi prediksi 4 kelas & rutinitas
│   │   │   ├── SkinTypeBadge.tsx         # Badge warna tipe kulit
│   │   │   └── ConfidenceBar.tsx         # Progress bar tingkat keyakinan
│   │   ├── detection/
│   │   │   └── DetectionCanvas.tsx       # Canvas visualisasi bounding box YOLO
│   │   ├── assistant/
│   │   │   ├── ChatMessage.tsx           # Bubble chat & sitasi sumber ilmiah
│   │   │   └── ChatInput.tsx             # Input teks & suggested questions
│   │   ├── knowledge/
│   │   │   └── IngredientCard.tsx        # Kartu bahan aktif & rincian jurnal
│   │   └── history/
│   │       └── HistoryCard.tsx           # Kartu entri riwayat pemindaian
│   ├── data/
│   │   ├── knowledgeData.ts              # Basis data bahan aktif & sitasi jurnal
│   │   └── skinTypesInfo.ts              # Karakteristik dermatologis 4 tipe kulit
│   ├── services/
│   │   ├── skinClassificationService.ts  # Layer integrasi Teachable Machine TF.js
│   │   ├── skinDetectionService.ts       # Layer integrasi backend YOLO/Roboflow
│   │   ├── ragAssistantService.ts        # Layer integrasi RAG & offline QA fallback
│   │   └── historyStorageService.ts      # Manajemen penyimpanan riwayat localStorage
│   └── types/
│       └── index.ts                      # Tipe data TypeScript proyek
├── tailwind.config.ts                    # Konfigurasi token warna dan tipografi brand
├── tsconfig.json                         # Konfigurasi TypeScript strict
├── package.json
└── README.md
```

---

## ⚖️ Etika & Pernyataan Medis

Skinly AI dirancang khusus untuk tujuan **edukasi dan estimasi berbasis gambar**, bukan diagnosis medis klinis, resep obat keras, atau pengganti pemeriksaan dokter spesialis kulit dan kelamin (Sp.KK / Sp.D.V.E). Aplikasi tidak mempromosikan atau menjual merek dagang komersial tertentu.
