import { ChatMessage } from '@/types';
import { getIngredients } from '@/data/knowledgeData';
import { getSkinTypeDetail } from '@/data/skinTypesInfo';
async function askRagBackend(
  apiUrl: string,
  question: string,
  lang: 'id' | 'en' = 'id',
  skinType?: string | null
): Promise<AssistantAnswer> {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: question,
      language: lang,
      skin_type: skinType,
    }),
  });

  if (!response.ok) {
    throw new Error(`RAG API returned ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    content: data.answer || data.content || data.response || '',
    references: data.references || data.sources || [],
  };
}

// true  = kalau backend RAG gagal, pakai jawaban lokal (hardcode).
// false = kalau backend RAG gagal, lempar error supaya page menampilkan pesan error.
// Untuk demo RAG sebaiknya false, supaya kegagalan backend terlihat.
const FALLBACK_KE_LOKAL = false;

export interface AssistantAnswer {
  content: string;
  references: {
    title: string;
    source: string;
  }[];
}

export const ragAssistantService = {
  isConfigured(): boolean {
    const url = process.env.NEXT_PUBLIC_RAG_API_URL;
    return Boolean(url && url.trim().length > 0);
  },

  /**
   * Submit a question to the skincare assistant.
   * Uses backend RAG API if configured, otherwise falls back to the local
   * evidence-based database with verified citations in the chosen language.
   *
   * skinType: label hasil CV (Normal | Dry | Oily | Combination). Opsional.
   */
  async askQuestion(
    question: string,
    lang: 'id' | 'en' = 'id',
    skinType?: string | null,
  ): Promise<AssistantAnswer> {
    const qLower = question.toLowerCase().trim();

    // Jika backend RAG dikonfigurasi, pakai itu
    const apiUrl = process.env.NEXT_PUBLIC_RAG_API_URL?.trim();
    if (apiUrl) {
      try {
        return await askRagBackend(apiUrl, question, lang, skinType);
      } catch (err) {
        console.warn('Backend RAG gagal:', err);
        if (!FALLBACK_KE_LOKAL) throw err;
      }
    }

    const ingredients = getIngredients(lang);

    // 1. Niacinamide
    if (qLower.includes('niacinamide') || qLower.includes('vitamin b3')) {
      const ing = ingredients.find((i) => i.id === 'niacinamide')!;
      if (lang === 'en') {
        return {
          content: `**Niacinamide (Vitamin B3)** is a multifunctional, water-soluble active ingredient with an outstanding clinical safety profile.\n\n**Primary Functions:**\n${ing.functions.map((f) => `• ${f}`).join('\n')}\n\n**Usage Guidelines:**\n${ing.howToUse}\n\n**Skin Compatibility:** Suitable across all skin types (Normal, Dry, Oily, and Combination). Concentrations between 2% and 5% are clinically proven to maximize benefits without causing irritation.`,
          references: [
            {
              title: ing.scientificReference.title,
              source: `${ing.scientificReference.journal} (${ing.scientificReference.year}) — ${ing.scientificReference.doiOrSource}`,
            },
          ],
        };
      }
      return {
        content: `**Niacinamide (Vitamin B3)** adalah bahan aktif multifungsi yang larut dalam air dengan profil keamanan tinggi.\n\n**Fungsi Utama:**\n${ing.functions.map((f) => `• ${f}`).join('\n')}\n\n**Cara Penggunaan:**\n${ing.howToUse}\n\n**Kesesuaian Tipe Kulit:** Cocok untuk semua tipe kulit (Normal, Kering, Berminyak, dan Kombinasi). Konsentrasi 2%–5% terbukti efektif secara klinis tanpa memicu iritasi berlebih.`,
        references: [
          {
            title: ing.scientificReference.title,
            source: `${ing.scientificReference.journal} (${ing.scientificReference.year}) — ${ing.scientificReference.doiOrSource}`,
          },
        ],
      };
    }

    // 2. Differences between AHA & BHA
    if (
      (qLower.includes('aha') && qLower.includes('bha')) ||
      qLower.includes('perbedaan aha') ||
      qLower.includes('difference between aha') ||
      qLower.includes('eksfoliasi') ||
      qLower.includes('exfoliat')
    ) {
      if (lang === 'en') {
        return {
          content: `**Key Differences between AHA (Alpha Hydroxy Acid) and BHA (Beta Hydroxy Acid):**\n\n1. **Solubility & Penetration:**\n• **AHA** (e.g. Glycolic Acid, Lactic Acid) is water-soluble (hydrophilic). It works on the skin surface by loosening cohesive intercellular bonds between dead corneocytes, ideal for dry, sun-damaged, or uneven skin.\n• **BHA** (Salicylic Acid) is oil-soluble (lipophilic). It penetrates through epidermal lipids and follicular sebum deep into pores to dissolve compacted comedones.\n\n2. **Skin Suitability:**\n• AHA: Best for dry, dull, or surface-dehydrated combination skin.\n• BHA: Recommended for oily, blemish-prone, and congested skin.\n\n3. **Application Frequency:**\nStart 1–2 times weekly in evening routines, and consistently apply daily morning broad-spectrum SPF.`,
          references: [
            {
              title: 'Salicylic acid as a peeling agent: a comprehensive review',
              source: 'Clinical, Cosmetic and Investigational Dermatology (2015)',
            },
            {
              title: 'Dual Effects of Alpha-Hydroxy Acids on the Skin',
              source: 'Molecules — MDPI (2018)',
            },
          ],
        };
      }
      return {
        content: `**Perbedaan Utama AHA (Alpha Hydroxy Acid) dan BHA (Beta Hydroxy Acid):**\n\n1. **Karakteristik Kelarutan:**\n• **AHA** (mis. Glycolic Acid, Lactic Acid) larut dalam air (hidrofilik). Bekerja mengangkat sel kulit mati di permukaan terluar epidermis, sangat ideal untuk kulit kering, kusam, atau warna tidak merata.\n• **BHA** (Salicylic Acid) larut dalam minyak (lipofilik). Mampu menembus sebum dan lapisan lipid hingga ke dalam pori-pori untuk membersihkan sumbatan komedo.\n\n2. **Kesesuaian Kulit:**\n• AHA: Lebih ramah untuk kulit kering atau kombinasi yang dehidrasi di area permukaan.\n• BHA: Sangat dianjurkan untuk kulit berminyak, rentan komedo, dan berjerawat.\n\n3. **Frekuensi Penggunaan:**\nMulailah 1–2 kali seminggu pada malam hari, dan selalu gunakan tabir surya setiap pagi karena eksfoliasi kimiawi meningkatkan sensitivitas terhadap sinar matahari.`,
        references: [
          {
            title: 'Salicylic acid as a peeling agent: a comprehensive review',
            source: 'Clinical, Cosmetic and Investigational Dermatology (2015)',
          },
          {
            title: 'Dual Effects of Alpha-Hydroxy Acids on the Skin',
            source: 'Molecules — MDPI (2018)',
          },
        ],
      };
    }

    // 3. Dry Skin Care
    if (qLower.includes('kering') || qLower.includes('dry skin')) {
      const dryInfo = getSkinTypeDetail('Dry', lang);
      if (lang === 'en') {
        return {
          content: `**Evidence-Based Care for Dry Skin (Alipic):**\n\nDry skin lacks essential intercellular protective lipids, which accelerates transepidermal water loss (TEWL).\n\n**Recommended Steps:**\n${dryInfo.recommendedRoutine.map((r) => `• **${r.step}**: ${r.description}`).join('\n')}\n\n**Beneficial Ingredients:**\n${dryInfo.keyIngredients.join(', ')}.\n\n**Special Caution:**\n${dryInfo.careNotice}`,
          references: [
            {
              title: 'The role of ceramides in skin barrier function and therapeutics',
              source: 'Journal of the American Academy of Dermatology (2014)',
            },
            {
              title: 'Hyaluronic acid: A key molecule in skin aging',
              source: 'Dermato-Endocrinology (2012)',
            },
          ],
        };
      }
      return {
        content: `**Panduan Ilmiah Merawat Kulit Kering (Dry Skin):**\n\nKulit kering kekurangan lipid alami pelindung, menyebabkan air di dalam kulit cepat menguap (*Transepidermal Water Loss*).\n\n**Langkah Perawatan yang Dianjurkan:**\n${dryInfo.recommendedRoutine.map((r) => `• **${r.step}**: ${r.description}`).join('\n')}\n\n**Bahan Aktif yang Sangat Disarankan:**\n${dryInfo.keyIngredients.join(', ')}.\n\n**Hal yang Perlu Dihindari:**\n${dryInfo.careNotice}`,
        references: [
          {
            title: 'The role of ceramides in skin barrier function and therapeutics',
            source: 'Journal of the American Academy of Dermatology (2014)',
          },
          {
            title: 'Hyaluronic acid: A key molecule in skin aging',
            source: 'Dermato-Endocrinology (2012)',
          },
        ],
      };
    }

    // 4. Hyaluronic Acid & Oily Skin
    if (
      (qLower.includes('hyaluronic') && qLower.includes('berminyak')) ||
      (qLower.includes('hyaluronic') && qLower.includes('oily'))
    ) {
      if (lang === 'en') {
        return {
          content: `**Yes, Hyaluronic Acid (HA) is highly suitable for oily skin.**\n\nA common misconception is that oily skin does not require hydration. In fact, excess sebum production is frequently a reactive compensatory response to dehydrated epidermis (lack of cellular water).\n\n**Why Hyaluronic Acid is Ideal for Oily Skin:**\n• Acts as a *pure humectant* that binds water without imparting lipid weight or pore-clogging oils.\n• Non-comedogenic and rapid-absorbing formulation.\n• Restores epidermal water-to-oil homeostasis, helping to regulate excessive compensatory shine.`,
          references: [
            {
              title: 'Hyaluronic acid: A key molecule in skin aging',
              source: 'Dermato-Endocrinology (2012)',
            },
            {
              title: 'Sebum analysis and the effect of facial moisturizers on oily skin',
              source: 'Journal of Dermatological Science (2016)',
            },
          ],
        };
      }
      return {
        content: `**Ya, Hyaluronic Acid (HA) sangat cocok untuk kulit berminyak.**\n\nBanyak orang beranggapan kulit berminyak tidak memerlukan hidrasi, padahal produksi minyak (sebum) berlebih sering kali merupakan kompensasi kelenjar sebasea terhadap kondisi kulit yang dehidrasi (kurang air).\n\n**Alasan Hyaluronic Acid Ramah untuk Kulit Berminyak:**\n• Bersifat *humektan murni* yang mengikat molekul air tanpa menambahkan minyak atau residu lipid berat.\n• Memiliki bobot molekul yang cepat meresap dan tidak menyumbat pori-pori (non-komedogenik).\n• Membantu menyeimbangkan kadar air-minyak (water-oil balance) sehingga mengurangi produksi sebum kompensatoris.`,
        references: [
          {
            title: 'Hyaluronic acid: A key molecule in skin aging',
            source: 'Dermato-Endocrinology (2012)',
          },
          {
            title: 'Sebum analysis and the effect of facial moisturizers on oily skin',
            source: 'Journal of Dermatological Science (2016)',
          },
        ],
      };
    }

    // 5. Retinol
    if (qLower.includes('retinol') || qLower.includes('retinoid') || qLower.includes('anti-aging')) {
      const ing = ingredients.find((i) => i.id === 'retinol')!;
      if (lang === 'en') {
        return {
          content: `**Retinol (Vitamin A):**\n\n${ing.description}\n\n**Key Functions:**\n${ing.functions.map((f) => `• ${f}`).join('\n')}\n\n**Usage Instructions:**\n${ing.howToUse}\n\n*Important Caution*: ${ing.caution}`,
          references: [
            {
              title: ing.scientificReference.title,
              source: `${ing.scientificReference.journal} (${ing.scientificReference.year})`,
            },
          ],
        };
      }
      return {
        content: `**Retinol (Vitamin A):**\n\n${ing.description}\n\n**Fungsi Utama:**\n${ing.functions.map((f) => `• ${f}`).join('\n')}\n\n**Aturan Pakai & Tindakan Pencegahan:**\n${ing.howToUse}\n\n*Penting*: ${ing.caution}`,
        references: [
          {
            title: ing.scientificReference.title,
            source: `${ing.scientificReference.journal} (${ing.scientificReference.year})`,
          },
        ],
      };
    }

    // 6. Ceramide & Skin Barrier
    if (qLower.includes('ceramide') || qLower.includes('skin barrier') || qLower.includes('sawar')) {
      const ing = ingredients.find((i) => i.id === 'ceramides')!;
      if (lang === 'en') {
        return {
          content: `**Ceramides Complex:**\n\n${ing.description}\n\n**Role in Cutaneous Barrier Health:**\n${ing.functions.map((f) => `• ${f}`).join('\n')}\n\n**When to Use:**\n${ing.howToUse}`,
          references: [
            {
              title: ing.scientificReference.title,
              source: `${ing.scientificReference.journal} (${ing.scientificReference.year})`,
            },
          ],
        };
      }
      return {
        content: `**Ceramides Complex:**\n\n${ing.description}\n\n**Peran dalam Kesehatan Kulit:**\n${ing.functions.map((f) => `• ${f}`).join('\n')}\n\n**Kapan Menggunakannya:**\n${ing.howToUse}`,
        references: [
          {
            title: ing.scientificReference.title,
            source: `${ing.scientificReference.journal} (${ing.scientificReference.year})`,
          },
        ],
      };
    }

    // 7. General Oily Skin Care
    if (qLower.includes('berminyak') || qLower.includes('oily')) {
      const oilyInfo = getSkinTypeDetail('Oily', lang);
      if (lang === 'en') {
        return {
          content: `**Evidence-Based Care for Oily Skin (Seborrheic):**\n\n${oilyInfo.summary}\n\n**Recommended Daily Routine:**\n${oilyInfo.recommendedRoutine.map((r) => `• **${r.step}**: ${r.description}`).join('\n')}\n\n**Proven Active Ingredients:**\n${oilyInfo.keyIngredients.join(', ')}.`,
          references: [
            {
              title: 'Salicylic acid as a peeling agent: a comprehensive review',
              source: 'Clinical, Cosmetic and Investigational Dermatology (2015)',
            },
          ],
        };
      }
      return {
        content: `**Panduan Ilmiah Merawat Kulit Berminyak (Oily Skin):**\n\n${oilyInfo.summary}\n\n**Rekomendasi Rutinitas:**\n${oilyInfo.recommendedRoutine.map((r) => `• **${r.step}**: ${r.description}`).join('\n')}\n\n**Bahan Aktif Pilihan:**\n${oilyInfo.keyIngredients.join(', ')}.`,
        references: [
          {
            title: 'Salicylic acid as a peeling agent: a comprehensive review',
            source: 'Clinical, Cosmetic and Investigational Dermatology (2015)',
          },
        ],
      };
    }

    // Generic fallback
    if (lang === 'en') {
      return {
        content: `Thank you for your question regarding **"${question}"**.\n\nThis specific query is not currently indexed in Skinly AI's local evidence-based database. To maintain scientific integrity, this assistant does not formulate speculative advice without verified clinical literature citations.\n\nYou may explore indexed topics such as:\n• *"What are the benefits of Niacinamide?"*\n• *"What is the difference between AHA and BHA?"*\n• *"How to properly care for dry skin?"*\n• *"Is Hyaluronic Acid suitable for oily skin?"*\n• *"What are safe Retinol usage guidelines?"*`,
        references: [
          {
            title: 'Skinly AI Standardized Dermatological Knowledge Base',
            source: 'Skinly AI Knowledge Repository v1.0',
          },
        ],
      };
    }

    return {
      content: `Terima kasih atas pertanyaan Anda mengenai **"${question}"**.\n\nPertanyaan spesifik ini belum terindeks dalam basis data edukasi lokal Skinly AI saat ini. Untuk menjaga integritas bukti ilmiah, asisten ini tidak menghasilkan spekulasi tanpa rujukan jurnal terverifikasi.\n\nAnda dapat menanyakan topik terverifikasi lainnya seperti:\n• *"Apa fungsi Niacinamide?"*\n• *"Apa perbedaan AHA dan BHA?"*\n• *"Bagaimana cara merawat kulit kering?"*\n• *"Apakah Hyaluronic Acid cocok untuk kulit berminyak?"*\n• *"Bagaimana cara kerja Retinol?"*`,
      references: [
        {
          title: 'Basis Pengetahuan Ilmiah Terstandarisasi Skinly AI',
          source: 'Skinly AI Knowledge Repository v1.0',
        },
      ],
    };
  },
};