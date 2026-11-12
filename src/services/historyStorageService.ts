import { HistoryRecord, SkinType } from '@/types';

const STORAGE_KEY = 'skinly_ai_analysis_history_v1';
const MAX_RECORDS = 20;

export const historyStorageService = {
  getHistory(): HistoryRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn('Gagal memuat riwayat analisis dari localStorage:', err);
      return [];
    }
  },

  /** Tipe kulit dari analisis terbaru (riwayat disimpan terbaru di depan), atau null. */
  getLatestSkinType(): SkinType | null {
    const latest = this.getHistory().find((item) => item.predictedSkinType);
    return latest?.predictedSkinType ?? null;
  },

  addRecord(record: Omit<HistoryRecord, 'id' | 'createdAt' | 'formattedDate'>): HistoryRecord | null {
    if (typeof window === 'undefined') return null;
    try {
      const current = this.getHistory();
      const now = new Date();
      const newRecord: HistoryRecord = {
        ...record,
        id: `scan_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        createdAt: now.toISOString(),
        formattedDate: now.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      // Add to beginning and cap length
      const updated = [newRecord, ...current].slice(0, MAX_RECORDS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return newRecord;
    } catch (err) {
      console.warn('Gagal menyimpan riwayat analisis:', err);
      return null;
    }
  },

  deleteRecord(id: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const current = this.getHistory();
      const updated = current.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch (err) {
      console.warn('Gagal menghapus entri riwayat:', err);
      return false;
    }
  },

  clearAll(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (err) {
      console.warn('Gagal mengosongkan riwayat:', err);
      return false;
    }
  },
};