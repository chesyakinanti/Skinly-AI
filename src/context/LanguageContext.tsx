'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

export interface Translations {
  common: {
    evidenceBased: string;
    privacyFirst: string;
    version: string;
  };
  nav: {
    home: string;
    skinAnalysis: string;
    skinDetection: string;
    assistant: string;
    knowledge: string;
    history: string;
    startAnalysis: string;
    closeMenu: string;
    openMenu: string;
  };
  home: {
    badge: string;
    titlePart1: string;
    titlePart2: string;
    titlePart3: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    guarantee1: string;
    guarantee2: string;
    guarantee3: string;
    normal: string;
    dry: string;
    oily: string;
    combination: string;
    howItWorksBadge: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    featuresBadge: string;
    featuresTitle: string;
    featuresSubtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature1Cta: string;
    feature2Title: string;
    feature2Desc: string;
    feature2Cta: string;
    feature3Title: string;
    feature3Desc: string;
    feature3Cta: string;
    ethicsBadge: string;
    ethicsTitle: string;
    ethicsDesc: string;
    ethicsPoint1: string;
    ethicsPoint2: string;
    ethicsPoint3: string;
    ethicsPoint4: string;
    cardTagline: string;
    cardCta: string;
    ctaCardBadge?: string;
    ctaCardTitle?: string;
    ctaCardSubtitle?: string;
    ctaCardPrimary?: string;
    ctaCardSecondary?: string;
    ctaCardTrust1?: string;
    ctaCardTrust2?: string;
    ctaCardTrust3?: string;
  };
  analysis: {
    badge: string;
    title: string;
    subtitle: string;
    disconnectedTitle: string;
    disconnectedDesc: string;
    fixtureNoticeTitle: string;
    fixtureNoticeDesc: string;
    fixturePrompt: string;
    analyzeBtn: string;
    analyzingBtn: string;
    selectPhotoError: string;
    uploadAreaTitle: string;
    uploadAreaSubtitle: string;
    chooseFile: string;
    openCamera: string;
    supportedFormats: string;
    readyToAnalyze: string;
    changePhoto: string;
    dropzoneAria: string;
    fileErrorType: string;
    fileErrorSize: string;
    resultTitle: string;
    modelConfidence: string;
    confidenceLabel: string;
    characteristicsTitle: string;
    keyFeaturesTitle: string;
    specialNoticeTitle: string;
    routineTitle: string;
    keyIngredientsTitle: string;
    learnMoreInKnowledge: string;
    saveToHistory: string;
    savedToHistory: string;
    analyzeNew: string;
    analyzeYourSkin?: string;
    uploadFacePhoto?: string;
    tipsTitle?: string;
    tip1?: string;
    tip2?: string;
    tip3?: string;
    dryZoneLabel?: string;
    oilyZoneLabel?: string;
    dryZoneDesc?: string;
    oilyZoneDesc?: string;
    modelConfidenceTitle?: string;
    skinTypeClassification?: string;
    zoneDetectionObject?: string;
    skincareRecommendation?: string;
    previewMockupBtn?: string;
  };
  detection: {
    badge: string;
    title: string;
    subtitle: string;
    disconnectedTitle: string;
    trainingPhaseBadge: string;
    disconnectedDesc: string;
    previewPrompt: string;
    previewFormatBtn: string;
    canvasTitle: string;
    canvasDesc: string;
    oilyRegionLabel: string;
    dryRegionLabel: string;
    detectBtn: string;
    detectingBtn: string;
    selectPhotoFirst: string;
    apiSpecTitle: string;
    apiSpecDesc: string;
  };
  assistant: {
    badge: string;
    title: string;
    subtitle: string;
    connectedBadge: string;
    localBaseBadge: string;
    resetChat: string;
    welcomeMsg: string;
    welcomeResetMsg: string;
    popularQuestionsBadge: string;
    inputPlaceholder: string;
    sendAria: string;
    referencesTitle: string;
    justNow: string;
    errorMsg: string;
    suggestedQuestions: string[];
  };
  knowledge: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    categoryLabel: string;
    skinTypeLabel: string;
    allCategories: string;
    allTypes: string;
    noResultsTitle: string;
    noResultsDesc: string;
    resetFilterBtn: string;
    popularSearchesLabel?: string;
    activeFiltersLabel?: string;
    clearAll?: string;
    patchTestTitle: string;
    patchTestDesc: string;
    patchStep1Title: string;
    patchStep1Desc: string;
    patchStep2Title: string;
    patchStep2Desc: string;
    patchStep3Title: string;
    patchStep3Desc: string;
    card: {
      skinTypesMatch: string;
      mainFunctions: string;
      howToUse: string;
      pairsWith: string;
      caution: string;
      journalReference: string;
      viewDetails: string;
      hideDetails: string;
    };
  };
  history: {
    badge: string;
    title: string;
    subtitle: string;
    clearAllBtn: string;
    clearAllConfirm: string;
    deleteItemConfirm: string;
    showingEntries: string;
    maxEntriesNote: string;
    emptyTitle: string;
    emptyDesc: string;
    startAnalysisBtn: string;
    loadingText: string;
    viewDetailsBtn: string;
    deleteAria: string;
    modalTitle: string;
    scanDate: string;
    confidenceText: string;
    areaOnly: string;
    recommendedRoutine: string;
    keyIngredients: string;
    importantNotice: string;
    closeModal: string;
  };
  skinBadges: {
    Normal: string;
    Dry: string;
    Oily: string;
    Combination: string;
  };
  footer: {
    desc: string;
    version: string;
    evidence: string;
    privacy: string;
    featuresHeader: string;
    ethicsHeader: string;
    ethicsPoint1: string;
    ethicsPoint2: string;
    ethicsPoint3: string;
    disclaimerTitle: string;
    disclaimerBody: string;
    rights: string;
    tagline: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  id: {
    common: {
      evidenceBased: 'Evidence-Based Skincare',
      privacyFirst: 'Privacy First',
      version: 'Skinly AI v1.0',
    },
    nav: {
      home: 'Beranda',
      skinAnalysis: 'Analisis Kulit',
      skinDetection: 'Deteksi Area',
      assistant: 'Asisten AI',
      knowledge: 'Edukasi Skincare',
      history: 'Riwayat',
      startAnalysis: 'Mulai Analisis',
      closeMenu: 'Tutup menu navigasi',
      openMenu: 'Buka menu navigasi',
    },
    home: {
      badge: 'Kecerdasan Kulit Berbasis Bukti Ilmiah',
      titlePart1: 'Kulit Anda,',
      titlePart2: 'Dipahami',
      titlePart3: 'oleh AI.',
      subtitle:
        'Platform analisis tipe kulit wajah dan edukasi perawatan berbasis bukti ilmiah. Kenali karakteristik kulit Anda secara objektif tanpa estimasi fiktif atau bias promosi komersial.',
      primaryCta: 'Analisis Kulit Wajah',
      secondaryCta: 'Jelajahi Edukasi Skincare',
      guarantee1: '4 Tipe Kulit Wajah',
      guarantee2: 'Bebas Sponsor Merek',
      guarantee3: 'Privasi Foto Terjaga di Browser',
      normal: 'Normal',
      dry: 'Kering',
      oily: 'Berminyak',
      combination: 'Kombinasi',
      howItWorksBadge: 'Alur Perjalanan',
      howItWorksTitle: 'Bagaimana Skinly AI Bekerja',
      howItWorksSubtitle:
        'Tiga tahapan terarah untuk membantu Anda mengenali kebutuhan kulit wajah secara mandiri, objektif, dan aman.',
      step1Title: 'Unggah Foto Wajah',
      step1Desc:
        'Ambil atau pilih foto wajah yang bersih tanpa makeup tebal dengan pencahayaan alami yang merata untuk hasil estimasi visual yang optimal.',
      step2Title: 'Analisis Model Terlatih',
      step2Desc:
        'Model klasifikasi mengevaluasi ciri visual kulit ke dalam 4 kategori (Normal, Kering, Berminyak, Kombinasi) disertai tingkat keyakinan asli.',
      step3Title: 'Edukasi Bahan Aktif',
      step3Desc:
        'Dapatkan pemahaman mendalam tentang rutinitas perawatan dan bahan aktif yang terbukti cocok secara literatur ilmiah dermatologi.',
      featuresBadge: 'Tiga Pilar Utama',
      featuresTitle: 'Kapabilitas Lengkap Platform',
      featuresSubtitle:
        'Kombinasi teknologi klasifikasi visual, deteksi area regional, dan asisten pengetahuan berbasis bukti.',
      feature1Title: 'Klasifikasi Tipe Kulit',
      feature1Desc:
        'Mengklasifikasikan tipe kulit wajah ke dalam empat kategori utama: Normal, Kering, Berminyak, dan Kombinasi menggunakan model Google Teachable Machine.',
      feature1Cta: 'Coba Analisis Kulit',
      feature2Title: 'Deteksi Area Kulit (YOLO)',
      feature2Desc:
        'Mendeteksi area spesifik wajah yang menunjukkan karakteristik berminyak (oily_region) atau kering (dry_region) melalui model YOLO.',
      feature2Cta: 'Lihat Deteksi Area',
      feature3Title: 'Asisten Tanya Jawab AI (RAG)',
      feature3Desc:
        'Asisten percakapan cerdas yang menjawab pertanyaan seputar bahan aktif skincare dengan rujukan jurnal ilmiah resmi dan panduan penggunaan yang aman.',
      feature3Cta: 'Buka Asisten AI',
      ethicsBadge: 'Standar Etika & Integritas Produk',
      ethicsTitle: 'Komitmen Edukasi Transparan Tanpa Komersialisasi',
      ethicsDesc:
        'Skinly AI hadir sebagai instrumen edukasi mandiri. Kami tidak menjual produk skincare, tidak menerima sponsor merek untuk rekomendasi bahan aktif, dan tidak memalsukan prediksi ketika model belum terhubung.',
      ethicsPoint1: 'Jujur terhadap status model & koneksi endpoint',
      ethicsPoint2: 'Penjelasan bahan aktif berbasis jurnal dermatologi',
      ethicsPoint3: 'Tidak memalsukan skor keyakinan atau bounding box',
      ethicsPoint4: 'Mengedepankan konsultasi dokter untuk kasus klinis',
      cardTagline: 'Pahami Kulit Anda, Secara Alami',
      cardCta: 'Mulai Eksplorasi',
      ctaCardBadge: 'Teknologi Cerdas • Bebas Iklan',
      ctaCardTitle: 'Siap Memahami Karakteristik Sejati Kulit Wajah Anda?',
      ctaCardSubtitle:
        'Mulai analisis mandiri berbasis model AI dan panduan dermatologi ilmiah hari ini — cepat, gratis, dan tanpa bias promosi komersial.',
      ctaCardPrimary: 'Mulai Analisis Kulit Sekarang',
      ctaCardSecondary: 'Tanya Asisten AI',
      ctaCardTrust1: 'Proses Instan < 3 Detik',
      ctaCardTrust2: 'Privasi Terjaga di Perangkat',
      ctaCardTrust3: 'Rujukan Literatur Ilmiah',
    },
    analysis: {
      badge: 'Klasifikasi Gambar 4 Kategori',
      title: 'Analisis Tipe Kulit Wajah',
      subtitle:
        'Unggah foto wajah Anda untuk mengestimasi tipe kulit (Normal, Kering, Berminyak, atau Kombinasi) dan dapatkan wawasan perawatan berbasis dermatologi.',
      disconnectedTitle: 'Model Google Teachable Machine Belum Dihubungkan',
      disconnectedDesc:
        'Aplikasi ini dirancang untuk membaca model klasifikasi 4 kelas yang diekspor dari Google Teachable Machine (TensorFlow.js). Untuk menjaga keaslian data, kami tidak menyimulasikan hasil palsu.',
      fixtureNoticeTitle: 'Mode Pratinjau Desain / Testing Fixture',
      fixtureNoticeDesc:
        'Hasil ini ditampilkan sebagai contoh visual komponen antarmuka. Model Google Teachable Machine belum dihubungkan pada variabel NEXT_PUBLIC_TEACHABLE_MACHINE_URL.',
      fixturePrompt: 'Pratinjau Tampilan Antarmuka Hasil (Fixture Mode):',
      analyzeBtn: 'Mulai Analisis Kulit',
      analyzingBtn: 'Menganalisis Karakteristik Kulit...',
      selectPhotoError: 'Silakan pilih atau unggah foto wajah terlebih dahulu.',
      uploadAreaTitle: 'Tarik & letakkan foto wajah ke sini',
      uploadAreaSubtitle: 'atau klik untuk memilih berkas dari galeri perangkat',
      chooseFile: 'Pilih Berkas',
      openCamera: 'Buka Kamera',
      supportedFormats:
        'Format didukung: JPEG, PNG, WebP (Maks. 10MB). Gunakan foto tanpa makeup dan pencahayaan terang merata.',
      readyToAnalyze: 'Foto wajah siap dianalisis',
      changePhoto: 'Ganti Foto',
      dropzoneAria: 'Area unggah foto wajah',
      fileErrorType: 'Format berkas tidak didukung. Harap unggah berkas foto JPEG, PNG, atau WebP.',
      fileErrorSize: 'Ukuran berkas melebihi batas 10MB.',
      resultTitle: 'Hasil Estimasi Klasifikasi',
      modelConfidence: 'Tingkat Keyakinan Model',
      confidenceLabel: 'Keyakinan',
      characteristicsTitle: 'Karakteristik',
      keyFeaturesTitle: 'Ciri-ciri Utama:',
      specialNoticeTitle: 'Pemberitahuan Khusus:',
      routineTitle: 'Panduan Rutinitas yang Sesuai',
      keyIngredientsTitle: 'Bahan Aktif Pilihan:',
      learnMoreInKnowledge: 'Pelajari Bahan Aktif Lebih Dalam di Kamus Skincare',
      saveToHistory: 'Simpan Riwayat',
      savedToHistory: 'Tersimpan di Riwayat',
      analyzeNew: 'Analisis Foto Baru',
      analyzeYourSkin: 'Analisis Kulit Wajah',
      uploadFacePhoto: 'Unggah Foto Wajah',
      tipsTitle: 'Tips untuk hasil optimal:',
      tip1: 'Gunakan foto yang jelas dan pencahayaan terang merata.',
      tip2: 'Hadap lurus ke arah kamera.',
      tip3: 'Hindari filter kamera atau riasan (makeup) tebal.',
      dryZoneLabel: 'Area Kering (Dry Zone)',
      oilyZoneLabel: 'Area Berminyak (Oily Zone)',
      dryZoneDesc: 'Area dengan kelembapan rendah, cenderung terasa kasar.',
      oilyZoneDesc: 'Area dengan kelebihan minyak (sebum), tampak mengkilap.',
      modelConfidenceTitle: 'Tingkat Keyakinan Model',
      skinTypeClassification: 'Tipe Kulit (Klasifikasi)',
      zoneDetectionObject: 'Deteksi Area (Object Detection)',
      skincareRecommendation: 'Rekomendasi Perawatan',
      previewMockupBtn: 'Pratinjau Format Hasil (Mockup Preview)',
    },
    detection: {
      badge: 'Deteksi Objek (Roboflow & YOLO)',
      title: 'Deteksi Area Kulit Wajah',
      subtitle:
        'Pemetaan batas area spesifik wajah yang menunjukkan tanda minyak berlebih (oily_region) atau area kering (dry_region).',
      disconnectedTitle: 'Backend API YOLO Belum Terhubung',
      trainingPhaseBadge: 'Tahap Pelatihan Model',
      disconnectedDesc:
        'Antarmuka deteksi ini telah siap menerima response koordinat bounding box dari backend Roboflow/YOLO. Sesuai prinsip etika dan kejujuran produk Skinly AI, kami tidak menampilkan bounding box rekaan saat model belum aktif.',
      previewPrompt: 'Ingin menguji tampilan visual bounding box pada kanvas foto Anda?',
      previewFormatBtn: 'Pratinjau Format Bounding Box',
      canvasTitle: 'Visualisasi Deteksi Bounding Box',
      canvasDesc:
        'Kotak pembatas menandai area spesifik wajah yang terdeteksi memiliki karakteristik berminyak atau kering.',
      oilyRegionLabel: 'Area Berminyak',
      dryRegionLabel: 'Area Kering',
      detectBtn: 'Mulai Deteksi Area',
      detectingBtn: 'Mendeteksi Area Wajah...',
      selectPhotoFirst: 'Pilih foto wajah terlebih dahulu untuk mendeteksi area.',
      apiSpecTitle: 'Spesifikasi Integrasi Roboflow / YOLO',
      apiSpecDesc:
        'Ketika dataset selesai dianotasi dan model YOLO telah dilatih di Roboflow, sistem akan mengirimkan berkas gambar via POST multipart/form-data.',
    },
    assistant: {
      badge: 'Asisten Tanya Jawab Skincare (RAG)',
      title: 'Asisten Edukasi Kulit Wajah',
      subtitle:
        'Konsultasikan pertanyaan seputar bahan aktif skincare, interaksi formula, dan rutinitas perawatan berbasis rujukan ilmiah resmi.',
      connectedBadge: 'RAG Backend Aktif',
      localBaseBadge: 'Basis Data Ilmiah Lokal',
      resetChat: 'Reset Percakapan',
      welcomeMsg:
        'Halo! Saya **Asisten AI Skinly**, asisten edukasi perawatan kulit berbasis literatur ilmiah. Saya siap menjelaskan fungsi bahan aktif skincare, interaksi antar bahan, dan panduan perawatan sesuai tipe kulit Anda. Apa yang ingin Anda ketahui hari ini?',
      welcomeResetMsg:
        'Percakapan telah direset. Silakan ajukan pertanyaan baru mengenai bahan aktif atau tipe kulit wajah Anda.',
      popularQuestionsBadge: 'Pertanyaan Populer Berbasis Bukti:',
      inputPlaceholder: 'Tanyakan fungsi bahan aktif, cara kerja, atau panduan tipe kulit...',
      sendAria: 'Kirim pertanyaan',
      referencesTitle: 'Rujukan Ilmiah:',
      justNow: 'Baru saja',
      errorMsg: 'Maaf, terjadi kendala saat memproses jawaban. Silakan coba ulangi pertanyaan Anda.',
      suggestedQuestions: [
        'Apa fungsi Niacinamide?',
        'Apa perbedaan AHA dan BHA?',
        'Bagaimana cara merawat kulit kering?',
        'Apakah Hyaluronic Acid cocok untuk kulit berminyak?',
        'Bagaimana aturan pakai Retinol yang aman?',
        'Apa peran Ceramide untuk skin barrier?',
      ],
    },
    knowledge: {
      badge: 'Direktori Bahan Aktif Berbasis Bukti',
      title: 'Kamus Bahan Aktif Skincare',
      subtitle:
        'Ketahui fungsi nyata, mekanisme biologis, kecocokan tipe kulit, dan rujukan jurnal penelitian resmi untuk setiap bahan aktif perawatan kulit wajah.',
      searchPlaceholder: 'Cari bahan aktif (mis. Niacinamide, Hyaluronic, Ceramide, BHA)...',
      categoryLabel: 'Kategori:',
      skinTypeLabel: 'Tipe Kulit:',
      allCategories: 'Semua Kategori',
      allTypes: 'Semua Tipe',
      noResultsTitle: 'Bahan Aktif Tidak Ditemukan',
      noResultsDesc: 'Tidak ada bahan aktif yang cocok dengan kriteria pencarian atau filter yang dipilih.',
      resetFilterBtn: 'Reset Semua Filter',
      popularSearchesLabel: 'Pencarian Cepat:',
      activeFiltersLabel: 'Filter Terpasang:',
      clearAll: 'Hapus Semua',
      patchTestTitle: 'Protokol Uji Tempel Mandiri (Patch Test Protocol)',
      patchTestDesc:
        'Sebelum mengaplikasikan bahan aktif konsentrasi tinggi baru ke seluruh wajah, selalu lakukan uji tempel mandiri:',
      patchStep1Title: 'Oleskan Sedikit',
      patchStep1Desc: 'Oleskan sedikit produk pada area tersembunyi (belakang telinga atau rahang bawah).',
      patchStep2Title: 'Tunggu 24-48 Jam',
      patchStep2Desc: 'Biarkan area tersebut kering dan amati selama 24 hingga 48 jam tanpa dibasuh.',
      patchStep3Title: 'Evaluasi Reaksi',
      patchStep3Desc: 'Bila tidak timbul kemerahan, gatal, panas, atau bengkak, produk relatif aman digunakan bertahap.',
      card: {
        skinTypesMatch: 'Kecocokan Tipe Kulit:',
        mainFunctions: 'Fungsi Utama:',
        howToUse: 'Cara Penggunaan:',
        pairsWith: 'Dapat Dikombinasikan Dengan:',
        caution: 'Perhatian:',
        journalReference: 'Rujukan Jurnal:',
        viewDetails: 'Lihat Rincian & Referensi Jurnal',
        hideDetails: 'Sembunyikan Rincian',
      },
    },
    history: {
      badge: 'Riwayat Lokal Pengguna',
      title: 'Riwayat Analisis Kulit',
      subtitle: 'Data riwayat tersimpan secara privat di peramban web lokal Anda.',
      clearAllBtn: 'Hapus Semua Riwayat',
      clearAllConfirm: 'Apakah Anda yakin ingin mengosongkan seluruh riwayat analisis kulit?',
      deleteItemConfirm: 'Apakah Anda yakin ingin menghapus catatan analisis ini?',
      showingEntries: 'Menampilkan entri analisis tersimpan',
      maxEntriesNote: 'Maksimal 20 entri terakhir',
      emptyTitle: 'Belum Ada Riwayat Analisis',
      emptyDesc:
        'Anda belum melakukan pemindaian atau menyimpan hasil analisis tipe kulit. Mulai analisis pertama Anda untuk memantau karakteristik kulit.',
      startAnalysisBtn: 'Mulai Analisis Kulit Sekarang',
      loadingText: 'Memuat riwayat...',
      viewDetailsBtn: 'Lihat Detail',
      deleteAria: 'Hapus riwayat analisis ini',
      modalTitle: 'Detail Hasil Pemindaian',
      scanDate: 'Waktu Analisis',
      confidenceText: 'Tingkat Keyakinan',
      areaOnly: 'Deteksi Area Saja',
      recommendedRoutine: 'Panduan Rutinitas',
      keyIngredients: 'Bahan Aktif yang Cocok',
      importantNotice: 'Catatan Penting',
      closeModal: 'Tutup',
    },
    skinBadges: {
      Normal: 'Kulit Normal',
      Dry: 'Kulit Kering',
      Oily: 'Kulit Berminyak',
      Combination: 'Kulit Kombinasi',
    },
    footer: {
      desc: 'Platform analisis tipe kulit wajah dan edukasi perawatan berbasis kecerdasan buatan dan literatur dermatologi terpercaya. Dirancang untuk membantu Anda memahami kondisi kulit secara objektif, aman, dan tanpa bias komersial.',
      version: 'Skinly AI v1.0',
      evidence: 'Edukasi Berbasis Bukti Ilmiah',
      privacy: 'Privasi Terjamin',
      featuresHeader: 'Fitur Platform',
      ethicsHeader: 'Integritas & Etika',
      ethicsPoint1: 'Tanpa sponsor brand atau promosi produk komersial',
      ethicsPoint2: 'Rujukan jurnal dermatologi dan toksikologi resmi',
      ethicsPoint3: 'Edukasi mandiri ramah pengguna & non-invasif',
      disclaimerTitle: 'Pernyataan Tanggung Jawab Medis (Medical Disclaimer):',
      disclaimerBody:
        'Skinly AI dirancang khusus untuk tujuan edukasi dan estimasi karakteristik visual kulit. Hasil analisis bukan merupakan diagnosis medis klinis, resep obat keras, atau pengganti pemeriksaan langsung oleh dokter spesialis dermatologi. Kondisi pencahayaan foto dan riwayat penggunaan kosmetik dapat memengaruhi akurasi estimasi visual. Bila Anda mengalami peradangan, infeksi, atau keluhan klinis pada kulit, konsultasikan langsung dengan dokter ahli.',
      rights: 'Hak Cipta Dilindungi Undang-Undang.',
      tagline: 'Pahami Kulit Anda, Secara Alami.',
    },
  },
  en: {
    common: {
      evidenceBased: 'Evidence-Based Skincare',
      privacyFirst: 'Privacy First',
      version: 'Skinly AI v1.0',
    },
    nav: {
      home: 'Home',
      skinAnalysis: 'Skin Analysis',
      skinDetection: 'Skin Detection',
      assistant: 'AI Assistant',
      knowledge: 'Skincare Knowledge',
      history: 'History',
      startAnalysis: 'Analyze Skin',
      closeMenu: 'Close navigation menu',
      openMenu: 'Open navigation menu',
    },
    home: {
      badge: 'Evidence-Based Skin Intelligence',
      titlePart1: 'Your Skin,',
      titlePart2: 'Understood',
      titlePart3: 'by AI.',
      subtitle:
        'AI-powered facial skin classification and evidence-based skincare education. Understand your skin characteristics objectively without fabricated claims or commercial brand bias.',
      primaryCta: 'Analyze My Skin',
      secondaryCta: 'Explore Skin Knowledge',
      guarantee1: '4 Facial Skin Types',
      guarantee2: 'Zero Brand Bias',
      guarantee3: 'Browser Photo Privacy',
      normal: 'Normal',
      dry: 'Dry',
      oily: 'Oily',
      combination: 'Combination',
      howItWorksBadge: 'The Journey',
      howItWorksTitle: 'How Skinly AI Works',
      howItWorksSubtitle:
        'Three structured steps to help you understand your facial skin needs independently, objectively, and safely.',
      step1Title: 'Upload Facial Photo',
      step1Desc:
        'Take or choose a clear facial photo without heavy makeup under even, natural lighting for optimal visual estimation.',
      step2Title: 'Trained Model Analysis',
      step2Desc:
        'Classification model evaluates visual skin characteristics into 4 categories (Normal, Dry, Oily, Combination) with authentic confidence levels.',
      step3Title: 'Active Ingredient Education',
      step3Desc:
        'Gain evidence-based insights into skincare routines and active ingredients proven compatible by dermatological literature.',
      featuresBadge: 'Core Pillars',
      featuresTitle: 'Full Platform Capabilities',
      featuresSubtitle:
        'Combining visual classification technology, regional zone detection, and evidence-based conversational intelligence.',
      feature1Title: 'Skin Classification',
      feature1Desc:
        'Classifies facial skin type into four primary categories: Normal, Dry, Oily, and Combination using Google Teachable Machine.',
      feature1Cta: 'Try Skin Analysis',
      feature2Title: 'Skin Region Detection (YOLO)',
      feature2Desc:
        'Detects visible skin regions showing oiliness (oily_region) or dryness (dry_region) using trained YOLO object detection models.',
      feature2Cta: 'View Region Detection',
      feature3Title: 'RAG AI Assistant',
      feature3Desc:
        'Conversational intelligence answering questions about skincare ingredients with peer-reviewed medical citations and safe usage guidelines.',
      feature3Cta: 'Open AI Assistant',
      ethicsBadge: 'Ethical Standards & Integrity',
      ethicsTitle: 'Transparent Education Without Commercial Bias',
      ethicsDesc:
        'Skinly AI is strictly built as an independent educational instrument. We do not sell skincare products, accept brand sponsorships for ingredient recommendations, or fabricate model outputs.',
      ethicsPoint1: 'Transparent model connection and backend statuses',
      ethicsPoint2: 'Ingredient explanations cited from dermatological journals',
      ethicsPoint3: 'Zero fabricated confidence scores or fake bounding boxes',
      ethicsPoint4: 'Prioritizes professional medical consultation for clinical concerns',
      cardTagline: 'Understand Your Skin, Naturally',
      cardCta: 'Start Exploring',
      ctaCardBadge: 'Smart Technology • Ad-Free',
      ctaCardTitle: 'Ready to Understand Your Skin’s Authentic Needs?',
      ctaCardSubtitle:
        'Start independent self-analysis driven by AI models and dermatological literature today — fast, free, and free of commercial bias.',
      ctaCardPrimary: 'Start Skin Analysis Now',
      ctaCardSecondary: 'Ask AI Assistant',
      ctaCardTrust1: 'Instant Analysis < 3s',
      ctaCardTrust2: '100% On-Device Privacy',
      ctaCardTrust3: 'Peer-Reviewed Citations',
    },
    analysis: {
      badge: '4-Class Image Classification',
      title: 'Facial Skin Type Analysis',
      subtitle:
        'Upload your facial photo to estimate your skin type (Normal, Dry, Oily, or Combination) and receive evidence-based dermatological insights.',
      disconnectedTitle: 'Google Teachable Machine Model Disconnected',
      disconnectedDesc:
        'This application is structured to connect to a 4-class exported Teachable Machine model (TensorFlow.js). To ensure authentic data, we do not fabricate fake predictions.',
      fixtureNoticeTitle: 'Design Preview Mode / Testing Fixture',
      fixtureNoticeDesc:
        'This output is displayed as an interface design preview. The Google Teachable Machine model is not connected yet in NEXT_PUBLIC_TEACHABLE_MACHINE_URL.',
      fixturePrompt: 'Preview UI Result Breakdown (Fixture Mode):',
      analyzeBtn: 'Start Skin Analysis',
      analyzingBtn: 'Analyzing Skin Features...',
      selectPhotoError: 'Please select or upload a facial photo first.',
      uploadAreaTitle: 'Drag & drop your facial photo here',
      uploadAreaSubtitle: 'or click to browse from device gallery',
      chooseFile: 'Choose File',
      openCamera: 'Open Camera',
      supportedFormats:
        'Supported formats: JPEG, PNG, WebP (Max 10MB). Use clear, un-retouched photos with even lighting.',
      readyToAnalyze: 'Facial photo ready for analysis',
      changePhoto: 'Change Photo',
      dropzoneAria: 'Facial photo upload area',
      fileErrorType: 'Unsupported file format. Please upload JPEG, PNG, or WebP.',
      fileErrorSize: 'File size exceeds the 10MB limit.',
      resultTitle: 'Classification Result',
      modelConfidence: 'Model Confidence Level',
      confidenceLabel: 'Confidence',
      characteristicsTitle: 'Characteristics',
      keyFeaturesTitle: 'Key Traits:',
      specialNoticeTitle: 'Special Notice:',
      routineTitle: 'Recommended Daily Routine',
      keyIngredientsTitle: 'Target Active Ingredients:',
      learnMoreInKnowledge: 'Explore Ingredients Further in Knowledge Base',
      saveToHistory: 'Save to History',
      savedToHistory: 'Saved to History',
      analyzeNew: 'Analyze New Photo',
      analyzeYourSkin: 'Analyze Your Skin',
      uploadFacePhoto: 'Upload a face photo',
      tipsTitle: 'Tips for better results:',
      tip1: 'Use a clear and well-lit photo.',
      tip2: 'Face the camera directly.',
      tip3: 'Avoid filters or heavy makeup.',
      dryZoneLabel: 'Dry Zone',
      oilyZoneLabel: 'Oily Zone',
      dryZoneDesc: 'Areas with low moisture, tend to feel rough or flaky.',
      oilyZoneDesc: 'Areas with excess oil (sebum), often look shiny.',
      modelConfidenceTitle: 'Model Confidence',
      skinTypeClassification: 'Skin Type (Classification)',
      zoneDetectionObject: 'Zone Detection (Object Detection)',
      skincareRecommendation: 'Skincare Recommendation',
      previewMockupBtn: 'Preview Mockup Result',
    },
    detection: {
      badge: 'Object Detection (Roboflow & YOLO)',
      title: 'Facial Skin Region Detection',
      subtitle:
        'Boundary mapping of specific facial regions exhibiting excess oiliness (oily_region) or dry patches (dry_region).',
      disconnectedTitle: 'YOLO Backend API Disconnected',
      trainingPhaseBadge: 'Model Training Phase',
      disconnectedDesc:
        'This detection interface is fully prepared to receive bounding box coordinates from a Roboflow/YOLO backend. In accordance with Skinly AI ethics and honesty, we never fabricate fake bounding boxes.',
      previewPrompt: 'Want to preview how bounding boxes will look on your uploaded photo?',
      previewFormatBtn: 'Preview Bounding Box Format',
      canvasTitle: 'Bounding Box Detection Canvas',
      canvasDesc:
        'Bounding boxes identify specific facial zones exhibiting excessive oiliness or dryness.',
      oilyRegionLabel: 'Oily Region',
      dryRegionLabel: 'Dry Region',
      detectBtn: 'Start Region Detection',
      detectingBtn: 'Detecting Facial Regions...',
      selectPhotoFirst: 'Please select a facial photo first to detect regions.',
      apiSpecTitle: 'Roboflow / YOLO Integration Spec',
      apiSpecDesc:
        'Once your dataset is annotated and trained on Roboflow, the system sends an image file via POST multipart/form-data.',
    },
    assistant: {
      badge: 'RAG Skincare Assistant',
      title: 'Facial Skin Knowledge Assistant',
      subtitle:
        'Consult on active ingredients, molecular interactions, and daily skincare routines backed by peer-reviewed dermatological literature.',
      connectedBadge: 'RAG Backend Connected',
      localBaseBadge: 'Local Science Base',
      resetChat: 'Reset Conversation',
      welcomeMsg:
        'Hello! I am the **Skinly AI Assistant**, an evidence-based skincare educational advisor. I explain active ingredients, their mechanisms, and skin-type recommendations based on peer-reviewed dermatological literature. What would you like to know today?',
      welcomeResetMsg:
        'Conversation reset. Feel free to ask a new question about active ingredients or skin types.',
      popularQuestionsBadge: 'Popular Evidence-Based Questions:',
      inputPlaceholder: 'Ask about active ingredients, mechanisms, or skin type guides...',
      sendAria: 'Send question',
      referencesTitle: 'Scientific References:',
      justNow: 'Just now',
      errorMsg: 'Sorry, an error occurred while processing the response. Please try again.',
      suggestedQuestions: [
        'What are the benefits of Niacinamide?',
        'What is the difference between AHA and BHA?',
        'How to properly care for dry skin?',
        'Is Hyaluronic Acid suitable for oily skin?',
        'What are safe Retinol usage guidelines?',
        'What is the role of Ceramides in skin barrier?',
      ],
    },
    knowledge: {
      badge: 'Evidence-Based Ingredient Directory',
      title: 'Skincare Ingredients Directory',
      subtitle:
        'Explore proven functions, biological mechanisms, skin-type compatibility, and official peer-reviewed citations for active skincare ingredients.',
      searchPlaceholder: 'Search active ingredients (e.g. Niacinamide, Hyaluronic, Ceramide, BHA)...',
      categoryLabel: 'Category:',
      skinTypeLabel: 'Skin Type:',
      allCategories: 'All Categories',
      allTypes: 'All Types',
      noResultsTitle: 'No Ingredients Found',
      noResultsDesc: 'No active ingredients match your search query or selected filters.',
      resetFilterBtn: 'Reset All Filters',
      popularSearchesLabel: 'Quick Searches:',
      activeFiltersLabel: 'Active Filters:',
      clearAll: 'Clear All',
      patchTestTitle: 'Self Patch Test Protocol',
      patchTestDesc:
        'Before introducing a new potent active ingredient to your entire face, always perform a self patch test:',
      patchStep1Title: 'Apply Small Amount',
      patchStep1Desc: 'Apply a pea-sized amount to an inconspicuous area (behind ear or lower jawline).',
      patchStep2Title: 'Wait 24-48 Hours',
      patchStep2Desc: 'Keep the area dry and observe for 24 to 48 hours without washing it off.',
      patchStep3Title: 'Evaluate Response',
      patchStep3Desc: 'If no redness, itching, burning, or swelling occurs, the formula is generally safe for gradual use.',
      card: {
        skinTypesMatch: 'Skin Type Compatibility:',
        mainFunctions: 'Key Functions:',
        howToUse: 'How to Use:',
        pairsWith: 'Pairs Well With:',
        caution: 'Caution:',
        journalReference: 'Journal Citation:',
        viewDetails: 'View Details & Citations',
        hideDetails: 'Hide Details',
      },
    },
    history: {
      badge: 'Local User History',
      title: 'Skin Analysis History',
      subtitle: 'Your history data is saved privately in your local web browser.',
      clearAllBtn: 'Clear All History',
      clearAllConfirm: 'Are you sure you want to clear your entire skin analysis history?',
      deleteItemConfirm: 'Are you sure you want to delete this analysis entry?',
      showingEntries: 'Showing saved analysis entries',
      maxEntriesNote: 'Up to 20 most recent entries',
      emptyTitle: 'No Analysis History Yet',
      emptyDesc:
        'You have not performed or saved any skin analysis scans yet. Start your first analysis to track your skin characteristics.',
      startAnalysisBtn: 'Start Skin Analysis Now',
      loadingText: 'Loading history...',
      viewDetailsBtn: 'View Details',
      deleteAria: 'Delete this analysis entry',
      modalTitle: 'Scan Result Details',
      scanDate: 'Analysis Date',
      confidenceText: 'Confidence Level',
      areaOnly: 'Region Detection Only',
      recommendedRoutine: 'Routine Guide',
      keyIngredients: 'Recommended Active Ingredients',
      importantNotice: 'Important Notice',
      closeModal: 'Close',
    },
    skinBadges: {
      Normal: 'Normal Skin',
      Dry: 'Dry Skin',
      Oily: 'Oily Skin',
      Combination: 'Combination Skin',
    },
    footer: {
      desc: 'AI-assisted facial skin classification and evidence-based skincare education platform. Designed to help you understand your skin characteristics objectively, safely, and without commercial brand bias.',
      version: 'Skinly AI v1.0',
      evidence: 'Evidence-Based Education',
      privacy: 'Privacy First',
      featuresHeader: 'Platform Features',
      ethicsHeader: 'Integrity & Ethics',
      ethicsPoint1: 'Zero commercial brand endorsements or sponsors',
      ethicsPoint2: 'Peer-reviewed dermatological journal citations',
      ethicsPoint3: 'Accessible, non-invasive educational platform',
      disclaimerTitle: 'Medical Disclaimer:',
      disclaimerBody:
        'Skinly AI is strictly designed for educational and visual estimation purposes. Analysis results are not a clinical medical diagnosis, prescription, or a substitute for professional consultation with a board-certified dermatologist. Lighting conditions and cosmetic wear may influence visual estimation. For persistent skin irritation or clinical concerns, please consult a medical professional.',
      rights: 'All rights reserved.',
      tagline: 'Understand Your Skin, Naturally.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'id',
  setLanguage: () => {},
  t: TRANSLATIONS.id,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('skinly_ai_lang') as Language;
      if (saved === 'id' || saved === 'en') {
        setLanguageState(saved);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('skinly_ai_lang', lang);
    } catch {
      // Ignore localStorage errors
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
