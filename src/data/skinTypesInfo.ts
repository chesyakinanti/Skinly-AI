import { SkinType, SkinTypeDetail } from '@/types';

export interface BilingualSkinTypeDetail {
  id: SkinType;
  color: string;
  badgeBg: string;
  badgeText: string;
  keyIngredients: string[];
  idContent: {
    label: string;
    summary: string;
    characteristics: string[];
    recommendedRoutine: {
      step: string;
      description: string;
    }[];
    careNotice: string;
  };
  enContent: {
    label: string;
    summary: string;
    characteristics: string[];
    recommendedRoutine: {
      step: string;
      description: string;
    }[];
    careNotice: string;
  };
}

export const SKIN_TYPES_BILINGUAL: Record<SkinType, BilingualSkinTypeDetail> = {
  Normal: {
    id: 'Normal',
    color: '#A9B8A2',
    badgeBg: 'bg-[#A9B8A2]/20',
    badgeText: 'text-[#3E5236]',
    keyIngredients: ['Hyaluronic Acid', 'Niacinamide 2-5%', 'Ceramide NP', 'Panthenol'],
    idContent: {
      label: 'Kulit Normal (Eudermic)',
      summary:
        'Kondisi kulit seimbang dengan produksi sebum dan kadar hidrasi yang harmonis. Lapisan skin barrier berfungsi optimal dengan tekstur halus dan sirkulasi yang sehat.',
      characteristics: [
        'Pori-pori tampak kecil dan tidak menonjol',
        'Tekstur permukaan kulit kenyal, halus, dan lembut saat disentuh',
        'Tidak mudah mengalami kemerahan atau sensasi tertarik',
        'Produksi kilap minyak minimal sepanjang hari',
      ],
      recommendedRoutine: [
        {
          step: 'Pembersih (Cleanser)',
          description: 'Gunakan pembersih wajah berbusa lembut dengan pH seimbang (5.5) tanpa sulfat keras.',
        },
        {
          step: 'Hidrasi (Hydrating Toner/Serum)',
          description: 'Gunakan serum ringan mengandung Hyaluronic Acid atau Glycerin untuk menjaga kelembapan.',
        },
        {
          step: 'Pelembap (Moisturizer)',
          description: 'Krim pelembap bertekstur emulsi ringan untuk mengunci hidrasi harian.',
        },
        {
          step: 'Tabir Surya (Sunscreen)',
          description: 'Sunscreen broad-spectrum minimal SPF 30 setiap pagi untuk melindungi dari kerusakan UV.',
        },
      ],
      careNotice:
        'Tujuan utama perawatan adalah memelihara keseimbangan alami dan mencegah penuaan dini akibat paparan sinar matahari.',
    },
    enContent: {
      label: 'Normal Skin (Eudermic)',
      summary:
        'Balanced skin state with harmonious sebum production and hydration levels. The cutaneous barrier functions optimally with smooth texture and healthy micro-circulation.',
      characteristics: [
        'Pores appear refined and inconspicuous',
        'Surface texture is plump, supple, and smooth to the touch',
        'Not prone to redness, reactivity, or feeling tight',
        'Minimal excess shine throughout the day',
      ],
      recommendedRoutine: [
        {
          step: 'Gentle Cleanser',
          description: 'Use a mild foaming cleanser with balanced pH (~5.5) free from harsh sulfates.',
        },
        {
          step: 'Hydrating Essence / Serum',
          description: 'Lightweight serum with Hyaluronic Acid or Glycerin to sustain cellular moisture.',
        },
        {
          step: 'Emulsion Moisturizer',
          description: 'Light cream emulsion to seal moisture without occlusive heaviness.',
        },
        {
          step: 'Broad-Spectrum Sunscreen',
          description: 'Minimum SPF 30 daily broad-spectrum photoprotection against UVA/UVB photoaging.',
        },
      ],
      careNotice:
        'The primary routine objective is preserving natural equilibrium and guarding against UV-induced oxidative stress.',
    },
  },
  Dry: {
    id: 'Dry',
    color: '#A9BDCC',
    badgeBg: 'bg-[#A9BDCC]/25',
    badgeText: 'text-[#335064]',
    keyIngredients: ['Ceramides Complex', 'Squalane', 'Hyaluronic Acid', 'Glycerin', 'Centella Asiatica'],
    idContent: {
      label: 'Kulit Kering (Alipic)',
      summary:
        'Kondisi kulit yang kekurangan lipid pelindung alami, sehingga kelembapan mudah menguap dan skin barrier lebih rentan terganggu.',
      characteristics: [
        'Kulit terasa kencang atau tertarik, terutama setelah mencuci muka',
        'Tampak garis-garis halus atau area kasar mengelupas (flaking)',
        'Warna kulit cenderung tampak kusam dan kurang bercahaya',
        'Lebih sensitif terhadap cuaca dingin atau ruangan ber-AC',
      ],
      recommendedRoutine: [
        {
          step: 'Pembersih Lembut (Gentle Cleanser)',
          description: 'Pembersih berbahan dasar susu (milky) atau krim tanpa busa berlebih agar lipid alami tidak terangkat.',
        },
        {
          step: 'Hidrasi Multi-layer',
          description: 'Toner hidrasi kental yang diaplikasikan selagi kulit masih sedikit lembap.',
        },
        {
          step: 'Pelembap Oklusif (Rich Cream)',
          description: 'Krim kaya Ceramide, Fatty Acids, dan Shea Butter untuk mengunci kelembapan di dalam stratum korneum.',
        },
        {
          step: 'Tabir Surya Melembapkan',
          description: 'Sunscreen dengan hasil akhir dewy dan formula yang menutrisi.',
        },
      ],
      careNotice:
        'Hindari penggunaan pembersih dengan busa berlimpah (SLS/SLES) dan eksfoliasi fisik yang kasar.',
    },
    enContent: {
      label: 'Dry Skin (Alipic)',
      summary:
        'Characterized by deficient intercellular lipids, facilitating elevated transepidermal water loss (TEWL) and barrier permeability.',
      characteristics: [
        'Skin feels taut, tight, or uncomfortable after cleansing',
        'Visible micro-flaking, rough texture, or fine surface creasing',
        'Complexion tends to look dull without natural luminosity',
        'Heightened sensitivity to low humidity and air conditioning',
      ],
      recommendedRoutine: [
        {
          step: 'Nourishing Cream Cleanser',
          description: 'Milky or non-foaming cream cleanser that preserves essential stratum corneum lipids.',
        },
        {
          step: 'Multi-layer Hydration',
          description: 'Essence or humectant toner applied while skin remains slightly damp.',
        },
        {
          step: 'Ceramide Rich Cream',
          description: 'Rich barrier cream formulated with bio-identical Ceramides, Cholesterol, and Fatty Acids.',
        },
        {
          step: 'Moisturizing Sunscreen',
          description: 'Dewy-finish sunscreen enriched with emollients to prevent midday dryness.',
        },
      ],
      careNotice:
        'Avoid high-foaming harsh surfactants (SLS/SLES) and aggressive physical facial scrubs.',
    },
  },
  Oily: {
    id: 'Oily',
    color: '#D58B9B',
    badgeBg: 'bg-[#D58B9B]/20',
    badgeText: 'text-[#8A374A]',
    keyIngredients: ['Salicylic Acid (BHA)', 'Niacinamide', 'Zinc PCA', 'Green Tea Extract'],
    idContent: {
      label: 'Kulit Berminyak (Seborrheic)',
      summary:
        'Kelenjar sebasea memproduksi sebum dalam jumlah berlebih (hipersekresi), menghasilkan kilau pada seluruh permukaan wajah dan rentan terhadap sumbatan pori.',
      characteristics: [
        'Kilap minyak tampak jelas di dahi, hidung, pipi, dan dagu',
        'Pori-pori tampak lebih besar dan terbuka',
        'Rentan timbul komedo hitam (blackheads) dan komedo putih (whiteheads)',
        'Makeup cenderung cepat luntur atau bergeser setelah beberapa jam',
      ],
      recommendedRoutine: [
        {
          step: 'Pembersih Gel Lembut',
          description: 'Gel cleanser yang membersihkan kelebihan minyak tanpa membuat kulit dehidrasi.',
        },
        {
          step: 'Eksfoliasi Berkala (BHA)',
          description: 'Salicylic Acid 1-2% sebanyak 2–3 kali seminggu untuk membersihkan sebum dari dalam folikel pori.',
        },
        {
          step: 'Pelembap Gel Bebas Minyak',
          description: 'Pelembap berbasis air (oil-free gel) agar kulit tetap terhidrasi tanpa menambah beban minyak.',
        },
        {
          step: 'Tabir Surya Matte / Fluid',
          description: 'Sunscreen bertekstur cair ringan dengan hasil akhir semi-matte atau natural finish.',
        },
      ],
      careNotice:
        'Jangan sengaja mengeringkan kulit dengan alkohol denaturasi tinggi; kulit yang dehidrasi justru memicu kelenjar minyak memproduksi lebih banyak sebum.',
    },
    enContent: {
      label: 'Oily Skin (Seborrheic)',
      summary:
        'Sebaceous glands produce sebum in excess (hyperseborrhea), resulting in widespread surface shine and predisposition toward follicular comedone formation.',
      characteristics: [
        'Pronounced shine across forehead, nose, cheeks, and chin',
        'Pores appear visibly enlarged and structurally visible',
        'Frequent occurrence of open and closed comedones',
        'Cosmetics degrade quickly due to sebum dissolution',
      ],
      recommendedRoutine: [
        {
          step: 'Purifying Gel Cleanser',
          description: 'Balanced gel cleanser clearing excess sebum without dehydrating the epidermis.',
        },
        {
          step: 'Targeted Exfoliation (BHA)',
          description: 'Lipophilic Salicylic Acid (1-2%) 2-3 times weekly to dissolve intra-pore sebum plugs.',
        },
        {
          step: 'Oil-Free Water Gel',
          description: 'Lightweight water-based humectant gel providing hydration without lipid weight.',
        },
        {
          step: 'Matte Fluid Sunscreen',
          description: 'Weightless chemical or hybrid fluid SPF with an invisible, non-greasy matte finish.',
        },
      ],
      careNotice:
        'Never strip the skin with high denatured alcohol; epidermal dehydration triggers reactive rebound hyperseborrhea.',
    },
  },
  Combination: {
    id: 'Combination',
    color: '#B7A7C9',
    badgeBg: 'bg-[#B7A7C9]/25',
    badgeText: 'text-[#553C6E]',
    keyIngredients: ['Niacinamide', 'Hyaluronic Acid', 'Centella Asiatica', 'Salicylic Acid (T-Zone)'],
    idContent: {
      label: 'Kulit Kombinasi',
      summary:
        'Variasi aktivitas kelenjar sebasea yang berbeda pada area wajah. Umumnya zona T (dahi, hidung, dagu) berminyak, sedangkan area pipi normal atau kering.',
      characteristics: [
        'Zona T (T-Zone) tampak mengkilap dan berpori lebih besar',
        'Area pipi terasa normal, cenderung kering, atau mudah teriritasi',
        'Kebutuhan pelembap berbeda antara area tengah dan tepi wajah',
        'Dapat mengalami komedo di hidung namun bersisik di area pipi',
      ],
      recommendedRoutine: [
        {
          step: 'Pembersih Penyeimbang',
          description: 'Pembersih berbusa ringan yang efektif membersihkan zona T tanpa membuat pipi terasa kering.',
        },
        {
          step: 'Perawatan Bersasaran (Zone Treatment)',
          description: 'Gunakan BHA pada zona T untuk mengontrol sebum, dan hidrasi lebih intensif pada area pipi.',
        },
        {
          step: 'Pelembap Tekstur Gel-Cream',
          description: 'Pelembap berbobot sedang yang cukup menghidrasi pipi tanpa menyumbat zona T.',
        },
        {
          step: 'Tabir Surya Ringan',
          description: 'Sunscreen bertekstur fluid ringan non-komedogenik.',
        },
      ],
      careNotice:
        'Pendekatan zona (zone-mapping) sangat disarankan: sesuaikan kepekatan pelembap antara zona T dan area pipi.',
    },
    enContent: {
      label: 'Combination Skin',
      summary:
        'Regional disparity in sebaceous gland distribution and activity. The central T-zone exhibits oiliness, while lateral peripheral cheeks present as normal or dry.',
      characteristics: [
        'Central T-zone (forehead, nose, chin) shows shine and enlarged pores',
        'Cheek areas feel normal, dry, or prone to seasonal tightness',
        'Hydration needs vary distinctly between center and outer facial contours',
        'Prone to comedones on nose while cheeks may exhibit dehydration lines',
      ],
      recommendedRoutine: [
        {
          step: 'Balancing Gentle Cleanser',
          description: 'Mild cleanser effectively clearing T-zone impurities while preserving lateral cheek hydration.',
        },
        {
          step: 'Zone-Targeted Treatment',
          description: 'Apply BHA locally to congested T-zone areas, and soothing humectants over cheeks.',
        },
        {
          step: 'Gel-Cream Moisturizer',
          description: 'Versatile gel-cream offering optimal barrier hydration without clogging oil-prone zones.',
        },
        {
          step: 'Weightless Fluid Sunscreen',
          description: 'Fast-absorbing non-comedogenic sunscreen comfortable across both oily and dry zones.',
        },
      ],
      careNotice:
        'Adopt a zone-mapping approach: apply richer formulations to cheeks and lighter hydrators on the central T-zone.',
    },
  },
};

export const getSkinTypeDetail = (type: SkinType, lang: 'id' | 'en'): SkinTypeDetail => {
  const item = SKIN_TYPES_BILINGUAL[type] || SKIN_TYPES_BILINGUAL.Normal;
  const content = lang === 'en' ? item.enContent : item.idContent;
  return {
    id: item.id,
    labelId: content.label,
    color: item.color,
    badgeBg: item.badgeBg,
    badgeText: item.badgeText,
    summary: content.summary,
    characteristics: content.characteristics,
    recommendedRoutine: content.recommendedRoutine,
    keyIngredients: item.keyIngredients,
    careNotice: content.careNotice,
  };
};

// Default export in Indonesian for backwards compatibility
export const SKIN_TYPES_DETAIL: Record<SkinType, SkinTypeDetail> = {
  Normal: getSkinTypeDetail('Normal', 'id'),
  Dry: getSkinTypeDetail('Dry', 'id'),
  Oily: getSkinTypeDetail('Oily', 'id'),
  Combination: getSkinTypeDetail('Combination', 'id'),
};
