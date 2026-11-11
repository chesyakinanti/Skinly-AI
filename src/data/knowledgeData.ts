import { Ingredient, SkinType } from '@/types';

export interface BilingualIngredient {
  id: string;
  name: string;
  inciName: string;
  category: 'Hydration' | 'Exfoliant' | 'Soothing' | 'Anti-Aging' | 'Barrier Repair' | 'Sun Protection';
  suitableSkinTypes: SkinType[];
  scientificReference: {
    title: string;
    journal: string;
    year: number;
    doiOrSource: string;
  };
  idContent: {
    categoryLabel: string;
    description: string;
    functions: string[];
    howToUse: string;
    pairWellWith: string[];
    caution: string;
  };
  enContent: {
    categoryLabel: string;
    description: string;
    functions: string[];
    howToUse: string;
    pairWellWith: string[];
    caution: string;
  };
}

export const INGREDIENTS_BILINGUAL: BilingualIngredient[] = [
  {
    id: 'niacinamide',
    name: 'Niacinamide (Vitamin B3)',
    inciName: 'Niacinamide',
    category: 'Barrier Repair',
    suitableSkinTypes: ['Normal', 'Dry', 'Oily', 'Combination'],
    scientificReference: {
      title: 'Niacinamide: A B vitamin that improves aging facial skin appearance',
      journal: 'Dermatologic Surgery',
      year: 2005,
      doiOrSource: 'DOI: 10.1111/j.1524-4725.2005.31725.x',
    },
    idContent: {
      categoryLabel: 'Penguat Sawar Kulit',
      description:
        'Bentuk aktif dari vitamin B3 yang larut dalam air. Niacinamide merupakan bahan multifungsi yang sangat stabil dan dapat ditoleransi dengan baik oleh hampir semua tipe kulit.',
      functions: [
        'Memperkuat skin barrier (merangsang sintesis ceramide alami)',
        'Mengurangi produksi sebum berlebih pada area wajah',
        'Meredakan kemerahan dan reaksi inflamasi ringan',
        'Membantu menyamarkan hiperpigmentasi dan meratakan warna kulit',
      ],
      howToUse:
        'Dapat digunakan pada pagi dan malam hari setelah pembersih dan toner. Konsentrasi 2% hingga 5% terbukti efektif secara klinis tanpa memicu iritasi berlebih.',
      pairWellWith: ['Hyaluronic Acid', 'Ceramide', 'Zinc PCA', 'Peptides'],
      caution:
        'Konsentrasi di atas 10% tidak selalu memberikan hasil lebih baik dan pada sebagian orang dapat menimbulkan kemerahan sementara (flushing).',
    },
    enContent: {
      categoryLabel: 'Barrier Repair',
      description:
        'Water-soluble active form of vitamin B3. Niacinamide is a highly versatile, stable molecule exceptionally tolerated across all skin types, including sensitive and blemish-prone skin.',
      functions: [
        'Fortifies cutaneous barrier integrity by upregulating endogenous ceramide synthesis',
        'Regulates hyperactive follicular sebum excretion',
        'Soothes micro-inflammation and transient erythema',
        'Inhibits melanosome transfer to attenuate post-inflammatory hyperpigmentation',
      ],
      howToUse:
        'Suitable for twice-daily application (morning and evening) post-cleansing and toning. Clinical efficacy is optimal at 2% to 5% concentrations.',
      pairWellWith: ['Hyaluronic Acid', 'Ceramides', 'Zinc PCA', 'Peptides'],
      caution:
        'Formulations exceeding 10% do not yield superior clinical outcomes and may trigger transient vasodilation flushing.',
    },
  },
  {
    id: 'hyaluronic-acid',
    name: 'Hyaluronic Acid',
    inciName: 'Sodium Hyaluronate',
    category: 'Hydration',
    suitableSkinTypes: ['Normal', 'Dry', 'Oily', 'Combination'],
    scientificReference: {
      title: 'Hyaluronic acid: A key molecule in skin aging',
      journal: 'Dermato-Endocrinology',
      year: 2012,
      doiOrSource: 'PMCID: PMC3583886',
    },
    idContent: {
      categoryLabel: 'Hidrasi Mendalam',
      description:
        'Senyawa glikosaminoglikan alami yang terdapat di jaringan ikat tubuh. Mampu menahan air hingga 1000 kali berat molekulnya sendiri, memberikan kelembapan tanpa menambah rasa lengket atau minyak.',
      functions: [
        'Menarik dan mengikat molekul air di lapisan epidermis',
        'Mencegah Transepidermal Water Loss (TEWL)',
        'Menjaga elastisitas dan kekenyalan tekstur kulit',
      ],
      howToUse:
        'Oleskan pada kulit yang masih sedikit lembap (damp skin) setelah mencuci muka, kemudian kunci segera dengan pelembap (moisturizer) agar air tidak menguap kembali ke udara.',
      pairWellWith: ['Ceramide', 'Glycerin', 'Panthenol', 'Niacinamide'],
      caution:
        'Jika diaplikasikan pada kulit sangat kering di lingkungan berkelembapan udara rendah tanpa ditutup pelembap oklusif, dapat menarik air dari lapisan dalam kulit ke luar.',
    },
    enContent: {
      categoryLabel: 'Deep Hydration',
      description:
        'Naturally occurring glycosaminoglycan present in dermal connective tissue. Capable of binding up to 1000 times its molecular weight in water, delivering profound moisture without greasy residue.',
      functions: [
        'Draws and sequesters ambient moisture into epidermal layers',
        'Mitigates transepidermal water loss (TEWL)',
        'Supports cellular turgor, plumpness, and surface suppleness',
      ],
      howToUse:
        'Apply onto slightly damp skin immediately after cleansing, then seal promptly with an emollient moisturizer to prevent moisture evaporation.',
      pairWellWith: ['Ceramides', 'Glycerin', 'Panthenol', 'Niacinamide'],
      caution:
        'In arid environments (<40% humidity), unsealed humectants can inadvertently draw water from deeper cutaneous layers toward the dry exterior.',
    },
  },
  {
    id: 'salicylic-acid',
    name: 'Salicylic Acid (BHA)',
    inciName: 'Salicylic Acid',
    category: 'Exfoliant',
    suitableSkinTypes: ['Oily', 'Combination'],
    scientificReference: {
      title: 'Salicylic acid as a peeling agent: a comprehensive review',
      journal: 'Clinical, Cosmetic and Investigational Dermatology',
      year: 2015,
      doiOrSource: 'DOI: 10.2147/CCID.S84064',
    },
    idContent: {
      categoryLabel: 'Eksfoliasi Pori',
      description:
        'Beta Hydroxy Acid (BHA) yang bersifat lipofilik (larut dalam minyak), sehingga mampu menembus sebum dan lapisan lipid folikel rambut untuk membersihkan sel kulit mati dari dalam pori.',
      functions: [
        'Melarutkan kotoran dan sebum di dalam pori-pori tersumbat',
        'Membantu meredakan jerawat aktif dan komedo',
        'Mengurangi kilap minyak berlebih pada zona T',
      ],
      howToUse:
        'Gunakan 2 hingga 3 kali seminggu pada malam hari. Mulai dari konsentrasi 0.5% hingga 2%. Pastikan menggunakan tabir surya di pagi hari.',
      pairWellWith: ['Niacinamide', 'Centella Asiatica', 'Hyaluronic Acid'],
      caution:
        'Hindari penggunaan bersamaan dengan retinol atau scrub fisik dalam satu sesi pemakaian untuk menghindari kerusakan skin barrier.',
    },
    enContent: {
      categoryLabel: 'Pore Exfoliation',
      description:
        'Lipophilic Beta Hydroxy Acid (BHA) uniquely capable of penetrating follicular sebum to solubilize desquamated corneocytes and sebaceous impactions from within pore walls.',
      functions: [
        'Dissolves intra-pore debris and compacted sebum plugs',
        'Alleviates active comedonal blemishes and microcomedones',
        'Decreases follicular sebaceous buildup in the central T-zone',
      ],
      howToUse:
        'Incorporate 2 to 3 evenings per week post-cleansing at 0.5% to 2% concentration. Maintain rigorous daily morning SPF photoprotection.',
      pairWellWith: ['Niacinamide', 'Centella Asiatica', 'Hyaluronic Acid'],
      caution:
        'Avoid co-applying in the same routine alongside prescription retinoids or harsh abrasive physical scrubs.',
    },
  },
  {
    id: 'retinol',
    name: 'Retinol (Vitamin A)',
    inciName: 'Retinol',
    category: 'Anti-Aging',
    suitableSkinTypes: ['Normal', 'Oily', 'Combination'],
    scientificReference: {
      title: 'Improvement of naturally aged skin with vitamin A (retinol)',
      journal: 'Archives of Dermatology',
      year: 2007,
      doiOrSource: 'DOI: 10.1001/archderm.143.5.606',
    },
    idContent: {
      categoryLabel: 'Regenerasi Sel',
      description:
        'Turunan vitamin A golongan retinoid yang bekerja pada tingkat seluler untuk meningkatkan diferensiasi keratinosit dan sintesis matriks ekstraseluler.',
      functions: [
        'Mempercepat laju pergantian sel kulit (cell turnover)',
        'Merangsang produksi kolagen alami di lapisan dermis',
        'Menghaluskan tekstur kulit kasar dan garis halus',
      ],
      howToUse:
        'Hanya digunakan pada malam hari pada kulit yang benar-benar kering. Mulai dengan frekuensi 1–2 kali seminggu dengan konsentrasi rendah (0.1%–0.3%) sebelum ditingkatkan bertahap.',
      pairWellWith: ['Ceramide', 'Peptides', 'Hyaluronic Acid'],
      caution:
        'Dapat menimbulkan masa adaptasi (retinization) seperti kulit kering mengelupas atau sedikit perih. Wajib menggunakan tabir surya setiap pagi. Tidak direkomendasikan untuk ibu hamil.',
    },
    enContent: {
      categoryLabel: 'Cellular Renewal',
      description:
        'Gold-standard vitamin A derivative modulating keratinocyte proliferation and upregulating extracellular collagen matrix synthesis at the genomic transcription level.',
      functions: [
        'Accelerates physiological epidermopoiesis and epidermal cell turnover',
        'Stimulates dermal procollagen and glycosaminoglycan synthesis',
        'Refines surface textural irregularities and fine photoaged lines',
      ],
      howToUse:
        'Evening application only onto thoroughly dry skin. Initiate 1-2 times weekly with lower potency (0.1%-0.3%) before titrating frequency upward.',
      pairWellWith: ['Ceramides', 'Peptides', 'Hyaluronic Acid'],
      caution:
        'May cause transient retinization symptoms (erythema, flaking, stinging). Mandatory broad-spectrum daily SPF required. Contraindicated during pregnancy.',
    },
  },
  {
    id: 'ceramides',
    name: 'Ceramides Complex (NP, AP, EOP)',
    inciName: 'Ceramide NP, Ceramide AP, Ceramide EOP',
    category: 'Barrier Repair',
    suitableSkinTypes: ['Dry', 'Normal', 'Combination'],
    scientificReference: {
      title: 'The role of ceramides in skin barrier function and therapeutics',
      journal: 'Journal of the American Academy of Dermatology',
      year: 2014,
      doiOrSource: 'DOI: 10.1016/j.jaad.2014.01.891',
    },
    idContent: {
      categoryLabel: 'Penguat Sawar Kulit',
      description:
        'Molekul lipid alami yang menyusun sekitar 50% dari matriks pelindung lapisan terluar kulit. Mengisi celah di antara sel-sel kulit ibarat semen di antara susunan batu bata.',
      functions: [
        'Memperbaiki struktur lipid antar sel pada stratum korneum',
        'Meredakan iritasi, gatal, dan kulit mengelupas',
        'Mengembalikan kelembapan alami kulit yang dehidrasi',
      ],
      howToUse:
        'Sangat baik digunakan setiap hari, baik pada pagi maupun malam hari, sebagai pelembap langkah akhir sebelum tabir surya atau sebagai krim malam.',
      pairWellWith: ['Cholesterol', 'Fatty Acids', 'Hyaluronic Acid', 'Panthenol'],
      caution:
        'Bahan ini sangat aman dan hampir tidak memiliki risiko iritasi, sangat cocok untuk kulit yang sedang teriritasi atau dehidrasi.',
    },
    enContent: {
      categoryLabel: 'Barrier Repair',
      description:
        'Bio-identical sphingolipids constituting over 50% of the stratum corneum intercellular lamellar lipid architecture, functioning as cutaneous mortar between corneocyte bricks.',
      functions: [
        'Reconstructs damaged intercellular lipid bilayer matrix',
        'Attenuates barrier disruption, pruritus, and micro-fissuring',
        'Restores physiologic water retention capacity in vulnerable epidermis',
      ],
      howToUse:
        'Suitable for daily morning and evening regimens as a foundational barrier moisturizer or restorative night emulsion.',
      pairWellWith: ['Cholesterol', 'Free Fatty Acids', 'Hyaluronic Acid', 'Panthenol'],
      caution:
        'Exceptionally biocompatible with negligible irritation potential; ideal for compromised or sensitized skin.',
    },
  },
  {
    id: 'centella-asiatica',
    name: 'Centella Asiatica (Cica / Madecassoside)',
    inciName: 'Centella Asiatica Extract',
    category: 'Soothing',
    suitableSkinTypes: ['Normal', 'Dry', 'Oily', 'Combination'],
    scientificReference: {
      title: 'Centella asiatica in cosmetology',
      journal: 'Postepy Dermatologii i Alergologii',
      year: 2013,
      doiOrSource: 'PMCID: PMC3834700',
    },
    idContent: {
      categoryLabel: 'Menenangkan Iritasi',
      description:
        'Tumbuhan herbal kaya akan senyawa triterpenoid bioaktif seperti madecassoside dan asiaticoside yang terbukti secara luas membantu menenangkan kulit stres dan sensitif.',
      functions: [
        'Menenangkan kemerahan dan reaksi peradangan kulit',
        'Mempercepat proses pemulihan luka mikro pada kulit',
        'Memberikan perlindungan antioksidan ringan',
      ],
      howToUse:
        'Dapat diaplikasikan kapan saja dalam bentuk toner, serum, atau pelembap untuk memberikan efek menenangkan instan.',
      pairWellWith: ['Niacinamide', 'Panthenol', 'Green Tea', 'Ceramide'],
      caution:
        'Ekstrak alami umumnya sangat aman, namun disarankan melakukan uji tempel (patch test) jika memiliki riwayat alergi tanaman famili Apiaceae.',
    },
    enContent: {
      categoryLabel: 'Soothing & Calming',
      description:
        'Botanical extract rich in pentacyclic triterpenoid saponins (madecassoside, asiaticoside) documented to soothe cutaneous hyper-reactivity and microvascular flare-ups.',
      functions: [
        'Suppresses pro-inflammatory cytokine expression to ease erythema',
        'Facilitates cutaneous micro-wound closure and re-epithelialization',
        'Delivers protective scavenger activity against oxidative free radicals',
      ],
      howToUse:
        'Can be deployed morning and night across toners, essences, or creams for immediate soothing relief.',
      pairWellWith: ['Niacinamide', 'Panthenol', 'Green Tea', 'Ceramides'],
      caution:
        'Generally benign; conduct a localized patch test if known to have botanical sensitivities within the Apiaceae plant family.',
    },
  },
  {
    id: 'azelaic-acid',
    name: 'Azelaic Acid',
    inciName: 'Azelaic Acid',
    category: 'Soothing',
    suitableSkinTypes: ['Oily', 'Combination', 'Normal'],
    scientificReference: {
      title: 'Azelaic acid: evidence-based review of its therapeutic applications',
      journal: 'Journal of Cosmetic Dermatology',
      year: 2020,
      doiOrSource: 'DOI: 10.1111/jocd.13628',
    },
    idContent: {
      categoryLabel: 'Meredakan Kemerahan',
      description:
        'Asam dikarboksilat alami yang memiliki sifat antibakteri, anti-inflamasi, dan penghambat enzim tirosinase secara selektif.',
      functions: [
        'Menghambat proliferasi bakteri Cutibacterium acnes',
        'Mengurangi kemerahan terkait kondisi rosacea dan jerawat',
        'Membantu memudarkan noda bekas jerawat (PIH & PIE)',
      ],
      howToUse:
        'Gunakan pada area yang membutuhkan 1–2 kali sehari setelah toner/serum cair dan sebelum pelembap.',
      pairWellWith: ['Niacinamide', 'Hyaluronic Acid', 'Ceramide'],
      caution:
        'Dapat menimbulkan sensasi gatal atau kesemutan ringan pada 5–10 menit pertama pemakaian awal, yang umumnya mereda setelah beberapa hari pemakaian rutin.',
    },
    enContent: {
      categoryLabel: 'Redness Relief',
      description:
        'Naturally derived dicarboxylic acid providing anti-inflammatory, antimicrobial, and selective tyrosinase-inhibiting properties without causing bacterial resistance.',
      functions: [
        'Inhibits Cutibacterium acnes proliferation and follicular colonization',
        'Subdues facial erythema associated with acne and rosacea-prone skin',
        'Fades post-inflammatory hyperpigmentation (PIH) and erythema (PIE)',
      ],
      howToUse:
        'Apply 1-2 times daily after lightweight watery serums and prior to heavier barrier creams.',
      pairWellWith: ['Niacinamide', 'Hyaluronic Acid', 'Ceramides'],
      caution:
        'May produce a mild tingling or prickling sensation during initial adaptation (first 5-10 minutes), typically resolving with consistent use.',
    },
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C (L-Ascorbic Acid)',
    inciName: 'Ascorbic Acid',
    category: 'Anti-Aging',
    suitableSkinTypes: ['Normal', 'Oily', 'Combination'],
    scientificReference: {
      title: 'Topical vitamin C and the skin: mechanisms of action and clinical applications',
      journal: 'The Journal of Clinical and Aesthetic Dermatology',
      year: 2017,
      doiOrSource: 'PMCID: PMC5605218',
    },
    idContent: {
      categoryLabel: 'Antioksidan & Pencerah',
      description:
        'Antioksidan paling melimpah secara alami di kulit manusia. Bentuk murni L-Ascorbic Acid memerlukan pH asam (< 3.5) untuk penetrasi optimal.',
      functions: [
        'Menetralkan radikal bebas akibat paparan sinar UV dan polusi',
        'Membantu mencerahkan warna kulit kusam',
        'Kofaktor esensial dalam biosintesis kolagen',
      ],
      howToUse:
        'Ideal digunakan pada pagi hari sebelum tabir surya untuk memberikan perlindungan sinergis ganda terhadap kerusakan fotooksidatif.',
      pairWellWith: ['Vitamin E (Tocopherol)', 'Ferulic Acid', 'Hyaluronic Acid'],
      caution:
        'Mudah teroksidasi jika terkena udara dan sinar matahari (berubah warna menjadi cokelat keruh). Kulit sangat sensitif disarankan menggunakan turunan yang lebih stabil.',
    },
    enContent: {
      categoryLabel: 'Antioxidant & Brightening',
      description:
        'Most abundant cutaneous antioxidant in human physiology. Pure L-Ascorbic Acid requires an acidic pH environment (<3.5) for optimal transepidermal bioavailability.',
      functions: [
        'Neutralizes reactive oxygen species (ROS) induced by solar UV and pollution',
        'Brightens dull tone and inhibits melanogenesis',
        'Acts as an indispensable enzymatic cofactor in dermal collagen biosynthesis',
      ],
      howToUse:
        'Optimal when applied each morning underneath broad-spectrum sunscreen for synergistic photoprotection against oxidative free radicals.',
      pairWellWith: ['Vitamin E (Tocopherol)', 'Ferulic Acid', 'Hyaluronic Acid'],
      caution:
        'Susceptible to rapid photo-oxidation if exposed to heat/air (turning amber/brown). Highly reactive skin may benefit from stabilized lipid-soluble derivatives.',
    },
  },
];

export const getIngredients = (lang: 'id' | 'en'): Ingredient[] => {
  return INGREDIENTS_BILINGUAL.map((item) => {
    const content = lang === 'en' ? item.enContent : item.idContent;
    return {
      id: item.id,
      name: item.name,
      inciName: item.inciName,
      category: item.category,
      categoryLabelId: content.categoryLabel,
      functions: content.functions,
      suitableSkinTypes: item.suitableSkinTypes,
      description: content.description,
      howToUse: content.howToUse,
      pairWellWith: content.pairWellWith,
      caution: content.caution,
      scientificReference: item.scientificReference,
    };
  });
};

export const INGREDIENTS_DATA: Ingredient[] = getIngredients('id');
